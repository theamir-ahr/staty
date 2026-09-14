import * as pdfjsLib from 'pdfjs-dist';
import { ColumnDefinition, ColumnFormat, ParsedTransaction, ParseResult } from '../types';

// Set up pdfjs worker using CDN matching library version
try {
  if (typeof window !== 'undefined' && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
  }
} catch (e) {
  console.warn('Could not set pdfjs workerSrc:', e);
}

interface TextItemWithCoords {
  str: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

// Common Date Regex Patterns
const DATE_PATTERNS = [
  // DD/MM/YYYY, DD-MM-YYYY, DD.MM.YYYY
  /^(\b\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}\b)/i,
  // YYYY-MM-DD, YYYY/MM/DD
  /^(\b\d{4}[\/\-\.]\d{1,2}[\/\-\.]\d{1,2}\b)/i,
  // 12 Jan 2024, 12-Jan-2024, 12 January 2024, 1st Jan 2024
  /^(\b\d{1,2}(?:st|nd|rd|th)?[\s\-\.](?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)[a-z]*[\s\-\.]\d{2,4}\b)/i,
  // Jan 12, 2024, January 12 2024
  /^(\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)[a-z]*[\s\-\.]\d{1,2}(?:st|nd|rd|th)?(?:,)?[\s\-\.]\d{2,4}\b)/i,
  // 12-Jan-24 or Jan-12-24
  /^(\b\d{1,2}-(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)[a-z]*-\d{2,4}\b)/i,
  // DD MMM (e.g. 15 MAR or 04 APR without year in some monthly statements)
  /^(\b\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b)/i,
];

// Amount pattern: captures currency symbols, parentheses for negatives, commas/dots, DR/CR suffixes
// e.g. $1,234.56, 1,234.56, (1,234.56), -1,234.56, ৳1,234.50, 1,234.56 CR
const AMOUNT_REGEX = /(?:[\$£€¥৳₹]\s*)?(?:\([0-9,]+\.[0-9]{2}\)|-?[0-9]{1,3}(?:,[0-9]{3})*\.[0-9]{2}|-?[0-9]+\.[0-9]{2}|(?:\([0-9,]+\)|-?[0-9]{1,3}(?:,[0-9]{3})+|\b[0-9]{2,}\b))(?:\s*(?:CR|DR|Cr|Dr))?/g;

export async function parsePdfStatement(file: File): Promise<ParseResult> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    
    // Fallback worker configuration if needed
    if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '4.10.38'}/pdf.worker.min.mjs`;
    }

    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(arrayBuffer),
      useSystemFonts: true,
    });

    const pdf = await loadingTask.promise;
    const numPages = pdf.numPages;

    let allRows: { y: number; text: string; page: number }[] = [];
    let totalTextItemsCount = 0;

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      const items: TextItemWithCoords[] = [];

      for (const item of textContent.items) {
        if ('str' in item && item.str.trim().length > 0) {
          totalTextItemsCount++;
          // transform matrix: [scaleX, skewY, skewX, scaleY, transX, transY]
          const tx = item.transform[4];
          const ty = item.transform[5];
          items.push({
            str: item.str,
            x: tx,
            y: ty,
            width: item.width || 0,
            height: item.height || 0,
          });
        }
      }

      // Group items into rows based on Y-coordinate tolerance (~3.5 pixels)
      const yTolerance = 3.5;
      const rowsMap: { y: number; items: TextItemWithCoords[] }[] = [];

      // Sort items primarily by Y descending (PDF coordinates origin is bottom-left), then X ascending
      items.sort((a, b) => b.y - a.y || a.x - b.x);

      for (const item of items) {
        let matchedRow = rowsMap.find(row => Math.abs(row.y - item.y) <= yTolerance);
        if (matchedRow) {
          matchedRow.items.push(item);
        } else {
          rowsMap.push({ y: item.y, items: [item] });
        }
      }

      // Sort rows by vertical position (top to bottom)
      rowsMap.sort((a, b) => b.y - a.y);

      for (const row of rowsMap) {
        // Sort items left-to-right within each row
        row.items.sort((a, b) => a.x - b.x);
        const lineText = row.items.map(it => it.str).join(' ').replace(/\s+/g, ' ').trim();
        if (lineText.length > 0) {
          allRows.push({ y: row.y, text: lineText, page: pageNum });
        }
      }
    }

    // Check if the PDF was scanned (no text items)
    if (totalTextItemsCount < 5) {
      return {
        success: false,
        transactions: [],
        totalRows: 0,
        columnFormat: 'two-amounts',
        columns: [],
        fileName: file.name,
        pageCount: numPages,
        isScanned: true,
        warning: "This looks like a scanned PDF. OCR support is coming soon — please try a text-based PDF for now.",
      };
    }

    // Now identify transaction rows
    const detectedTransactions: {
      date: string;
      description: string;
      amounts: string[];
      rawLine: string;
    }[] = [];

    for (let i = 0; i < allRows.length; i++) {
      const row = allRows[i];
      const trimmed = row.text.trim();

      // Check if line starts with a date pattern
      let matchedDate: string | null = null;
      let lineAfterDate = trimmed;

      for (const pattern of DATE_PATTERNS) {
        const match = trimmed.match(pattern);
        if (match && match[1]) {
          matchedDate = match[1].trim();
          lineAfterDate = trimmed.substring(match.index! + match[0].length).trim();
          break;
        }
      }

      if (matchedDate) {
        // Find all amounts in the remainder of the line
        const amountMatches: string[] = [];
        let match: RegExpExecArray | null;
        
        // Reset regex state
        const regex = new RegExp(AMOUNT_REGEX);
        while ((match = regex.exec(lineAfterDate)) !== null) {
          const matchedStr = match[0].trim();
          // Avoid matching pure small integers that could be part of descriptions (e.g. "Order 12")
          // Unless it has decimal, comma, currency symbol, or parentheses
          const hasDecimalOrCurrency = /[,\.\$£€¥৳₹\(\)]/.test(matchedStr);
          if (hasDecimalOrCurrency || parseFloat(matchedStr) > 99) {
            amountMatches.push(matchedStr);
          }
        }

        // Only count as transaction if at least 1 amount was found
        if (amountMatches.length >= 1) {
          // Extract description by removing amounts from lineAfterDate
          let desc = lineAfterDate;
          for (const amt of amountMatches) {
            // Replace first occurrence of amount in description
            desc = desc.replace(amt, ' ');
          }
          // Clean description
          desc = desc
            .replace(/[\|\t]+/g, ' ')
            .replace(/\s+/g, ' ')
            .replace(/^[\s\-\:\,\.]+|[\s\-\:\,\.]+$/g, '')
            .trim();

          // If description ended up empty, fallback to generic memo or raw text
          if (!desc) {
            desc = "Transaction";
          }

          detectedTransactions.push({
            date: matchedDate,
            description: desc,
            amounts: amountMatches,
            rawLine: trimmed,
          });
        }
      }
    }

    if (detectedTransactions.length === 0) {
      return {
        success: false,
        transactions: [],
        totalRows: 0,
        columnFormat: 'two-amounts',
        columns: [],
        fileName: file.name,
        pageCount: numPages,
        error: "No transactions could be detected. This bank's PDF layout may not be supported yet.",
      };
    }

    // Auto-detect column structure based on typical amount count
    const amountCounts = detectedTransactions.map(t => t.amounts.length);
    const avgAmounts = amountCounts.reduce((a, b) => a + b, 0) / amountCounts.length;
    
    // Most frequent count
    const frequencyMap: Record<number, number> = {};
    for (const count of amountCounts) {
      frequencyMap[count] = (frequencyMap[count] || 0) + 1;
    }
    let typicalCount = 2;
    let maxFreq = 0;
    for (const [cntStr, freq] of Object.entries(frequencyMap)) {
      const cnt = parseInt(cntStr, 10);
      if (freq > maxFreq) {
        maxFreq = freq;
        typicalCount = cnt;
      }
    }

    let columnFormat: ColumnFormat = 'two-amounts';
    let columns: ColumnDefinition[] = [];

    if (typicalCount >= 3 || (frequencyMap[3] || 0) > detectedTransactions.length * 0.4) {
      columnFormat = 'three-amounts';
      columns = [
        { key: 'date', label: 'Date', align: 'left' },
        { key: 'description', label: 'Description', align: 'left' },
        { key: 'debit', label: 'Debit / Withdrawal', align: 'right' },
        { key: 'credit', label: 'Credit / Deposit', align: 'right' },
        { key: 'balance', label: 'Balance', align: 'right' },
      ];
    } else if (typicalCount === 1) {
      columnFormat = 'one-amount';
      columns = [
        { key: 'date', label: 'Date', align: 'left' },
        { key: 'description', label: 'Description', align: 'left' },
        { key: 'amount', label: 'Amount', align: 'right' },
      ];
    } else {
      // Default to 2 amounts: Amount & Balance
      columnFormat = 'two-amounts';
      columns = [
        { key: 'date', label: 'Date', align: 'left' },
        { key: 'description', label: 'Description', align: 'left' },
        { key: 'amount', label: 'Amount', align: 'right' },
        { key: 'balance', label: 'Balance', align: 'right' },
      ];
    }

    // Map detected rows to structured transactions
    const transactions: ParsedTransaction[] = detectedTransactions.map((tx, idx) => {
      const rowId = `tx-${idx + 1}`;
      if (columnFormat === 'three-amounts') {
        // Typically: Debit, Credit, Balance OR Amount1, Amount2, Balance
        // If 3 amounts: [0] = Debit, [1] = Credit, [2] = Balance
        // If 2 amounts in a 3-amount format: check negative or assign to debit/credit and balance
        const amt0 = tx.amounts[0] || '';
        const amt1 = tx.amounts[1] || '';
        const amt2 = tx.amounts[2] || '';

        let debit = '';
        let credit = '';
        let balance = '';

        if (tx.amounts.length >= 3) {
          debit = amt0;
          credit = amt1;
          balance = amt2;
        } else if (tx.amounts.length === 2) {
          // Check if amt0 is negative or debit
          if (amt0.includes('-') || amt0.includes('(') || amt0.toLowerCase().includes('dr')) {
            debit = amt0;
          } else {
            credit = amt0;
          }
          balance = amt1;
        } else {
          credit = amt0;
        }

        return {
          id: rowId,
          date: tx.date,
          description: tx.description,
          debit,
          credit,
          balance,
          rawLine: tx.rawLine,
        };
      } else if (columnFormat === 'two-amounts') {
        return {
          id: rowId,
          date: tx.date,
          description: tx.description,
          amount: tx.amounts[0] || '',
          balance: tx.amounts[1] || '',
          rawLine: tx.rawLine,
        };
      } else {
        return {
          id: rowId,
          date: tx.date,
          description: tx.description,
          amount: tx.amounts[0] || '',
          rawLine: tx.rawLine,
        };
      }
    });

    return {
      success: true,
      transactions,
      totalRows: transactions.length,
      columnFormat,
      columns,
      fileName: file.name,
      pageCount: numPages,
    };
  } catch (error: any) {
    console.error('PDF parsing error:', error);
    return {
      success: false,
      transactions: [],
      totalRows: 0,
      columnFormat: 'two-amounts',
      columns: [],
      fileName: file.name,
      pageCount: 0,
      error: error?.message || "Failed to parse PDF. Please verify this is an unencrypted PDF statement.",
    };
  }
}
