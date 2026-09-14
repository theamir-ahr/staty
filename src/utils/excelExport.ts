import * as XLSX from 'xlsx';
import { ColumnDefinition, ParsedTransaction } from '../types';

export function exportToExcel(
  transactions: ParsedTransaction[],
  columns: ColumnDefinition[],
  baseFileName: string = 'bank_statement'
) {
  // Format data for sheet
  const headers = columns.map(col => col.label);
  const rows = transactions.map(tx => {
    return columns.map(col => {
      const val = tx[col.key];
      return val !== undefined ? val : '';
    });
  });

  const worksheetData = [headers, ...rows];
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

  // Set column widths based on max content length
  const colWidths = columns.map((col, colIdx) => {
    let maxLen = col.label.length;
    for (const row of rows) {
      const cellVal = String(row[colIdx] || '');
      if (cellVal.length > maxLen) {
        maxLen = cellVal.length;
      }
    }
    return { wch: Math.min(Math.max(maxLen + 4, 12), 45) };
  });

  worksheet['!cols'] = colWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');

  const cleanName = baseFileName.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_');
  const fileName = `${cleanName}_converted_by_Staty.xlsx`;

  XLSX.writeFile(workbook, fileName);
}

export function exportToCsv(
  transactions: ParsedTransaction[],
  columns: ColumnDefinition[],
  baseFileName: string = 'bank_statement'
) {
  // Format data for CSV
  const headers = columns.map(col => col.label);
  const rows = transactions.map(tx => {
    return columns.map(col => {
      const val = tx[col.key];
      return val !== undefined ? val : '';
    });
  });

  const worksheetData = [headers, ...rows];
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  const csvContent = XLSX.utils.sheet_to_csv(worksheet);

  // Trigger browser download with UTF-8 BOM so Excel opens CSVs without character glitching
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const cleanName = baseFileName.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_');
  const fileName = `${cleanName}_converted_by_Staty.csv`;

  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
