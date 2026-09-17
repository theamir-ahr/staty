import React, { useState, useRef, useEffect } from 'react';
import {
  UploadCloud,
  FileSpreadsheet,
  FileText,
  ShieldCheck,
  Download,
  RefreshCw,
  AlertTriangle,
  AlertCircle,
  Sparkles,
  CheckCircle2,
  Table as TableIcon,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { ParseResult } from '../types';
import { parsePdfStatement } from '../utils/pdfParser';
import { exportToCsv, exportToExcel } from '../utils/excelExport';
import { SAMPLE_STATEMENT_RESULT } from '../utils/sampleData';

// --- PRO LOGIC - ADDED ---
const isProUser = () => {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  if (params.get('paid') === 'success') {
    localStorage.setItem('staty_pro', 'true');
    // clean url
    window.history.replaceState({}, '', window.location.pathname);
    return true;
  }
  return localStorage.getItem('staty_pro') === 'true';
};

const getTodayStr = () => new Date().toISOString().split('T')[0];

const getDailyCount = () => {
  const data = localStorage.getItem('staty_daily');
  if (!data) return 0;
  try {
    const parsed = JSON.parse(data);
    if (parsed.date === getTodayStr()) return parsed.count || 0;
    return 0;
  } catch { return 0; }
};

const incrementDailyCount = () => {
  const count = getDailyCount() + 1;
  localStorage.setItem('staty_daily', JSON.stringify({ date: getTodayStr(), count }));
  return count;
};
// --- END PRO LOGIC ---

export const ConverterTool: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [parseResult, setParseResult] = useState<ParseResult | null>(null);
  const [showRawView, setShowRawView] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showProToast, setShowProToast] = useState(false);

  // Check for?paid=success on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('paid') === 'success') {
      localStorage.setItem('staty_pro', 'true');
      setShowProToast(true);
      window.history.replaceState({}, '', window.location.pathname);
      setTimeout(() => setShowProToast(false), 5000);
    }
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      await processFile(file);
    }
  };

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      await processFile(file);
    }
  };

  const processFile = async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.pdf') && file.type!== 'application/pdf') {
      setParseResult({
        success: false,
        transactions: [],
        totalRows: 0,
        columnFormat: 'two-amounts',
        columns: [],
        fileName: file.name,
        pageCount: 0,
        error: 'Please upload a valid PDF bank statement file (.pdf).',
      });
      return;
    }

    // --- PRO CHECK - DAILY LIMIT ---
    if (!isProUser()) {
      const dailyCount = getDailyCount();
      if (dailyCount >= 1) {
        setParseResult({
          success: false,
          transactions: [],
          totalRows: 0,
          columnFormat: 'two-amounts',
          columns: [],
          fileName: file.name,
          pageCount: 0,
          error: 'FREE LIMIT REACHED: You have used your 1 free conversion for today. Please upgrade to Pro for unlimited conversions. 🚀',
        });
        // Optional redirect to pricing
        setTimeout(() => {
          window.location.hash = '#pricing';
          window.scrollTo(0,0);
        }, 1500);
        return;
      }
    }

    setIsProcessing(true);
    try {
      const result = await parsePdfStatement(file);

      // --- PRO CHECK - PAGE LIMIT ---
      if (!isProUser() && result.pageCount > 2) {
        setParseResult({
          success: false,
          transactions: [],
          totalRows: 0,
          columnFormat: 'two-amounts',
          columns: [],
          fileName: file.name,
          pageCount: result.pageCount,
          error: `FREE LIMIT: This file has ${result.pageCount} pages. Free plan allows up to 2 pages only. Upgrade to Pro for unlimited pages. Your file has ${result.pageCount} pages.`,
        });
        setIsProcessing(false);
        return;
      }

      setParseResult(result);

      // Increment daily count only on success for free users
      if (result.success &&!isProUser()) {
        incrementDailyCount();
      }

    } catch (err: any) {
      setParseResult({
        success: false,
        transactions: [],
        totalRows: 0,
        columnFormat: 'two-amounts',
        columns: [],
        fileName: file.name,
        pageCount: 0,
        error: err?.message || 'Error processing PDF document.',
      });
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const loadSampleStatement = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setParseResult(SAMPLE_STATEMENT_RESULT);
      setIsProcessing(false);
    }, 600);
  };

  const handleDownloadExcel = () => {
    if (!parseResult || parseResult.transactions.length === 0) return;
    exportToExcel(parseResult.transactions, parseResult.columns, parseResult.fileName);
  };

  const handleDownloadCsv = () => {
    if (!parseResult || parseResult.transactions.length === 0) return;
    exportToCsv(parseResult.transactions, parseResult.columns, parseResult.fileName);
  };

  const resetConverter = () => {
    setParseResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div id="converter-tool-container" className="w-full max-w-5xl mx-auto">
      {/* Pro Toast */}
      {showProToast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span className="font-bold text-sm">🎉 Pro Activated! Unlimited conversions unlocked</span>
        </div>
      )}

      {/* Pro Badge - shows only for pro */}
      {isProUser() && (
        <div className="flex justify-center mb-3">
          <div className="inline-flex items-center gap-1.5 bg-black text-white px-3 py-1 rounded-full text-xs font-bold tracking-widest">
            <Sparkles className="w-3 h-3 text-yellow-400" /> PRO ACTIVE - UNLIMITED
          </div>
        </div>
      )}

      {/* Upload Box Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xl shadow-slate-200/40 p-6 sm:p-10 transition-all">

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileInputChange}
          className="hidden"
          id="pdf-file-input"
        />

        <div
          id="dropzone"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 group ${
            isDragging
             ? 'border-green-500 bg-green-50/60 scale-[0.99]'
              : 'border-slate-300 hover:border-green-500 bg-slate-50/50 hover:bg-green-50/20'
          }`}
        >
          {isProcessing? (
            <div className="py-8 flex flex-col items-center justify-center space-y-4">
              <div className="relative">
                <div className="w-14 h-14 border-4 border-slate-200 border-t-green-600 rounded-full animate-spin" />
                <FileText className="w-6 h-6 text-green-600 absolute inset-0 m-auto" />
              </div>
              <div className="space-y-1">
                <p className="text-lg font-semibold text-slate-800">
                  Parsing your statement...
                </p>
                <p className="text-sm text-slate-500">
                  Extracting coordinates, transactions, and amounts directly in your browser
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 group-hover:scale-110 group-hover:bg-green-600 group-hover:text-white transition-all shadow-sm">
                <UploadCloud className="w-8 h-8" />
              </div>

              <div className="space-y-1.5 max-w-md">
                <p className="text-base sm:text-lg font-semibold text-slate-800">
                  <span className="text-green-600 underline underline-offset-4 group-hover:text-green-700">
                    Click to browse
                  </span>{' '}
                  or drag & drop your PDF statement
                </p>
                <p className="text-xs sm:text-sm text-slate-500">
                  Supports Chase, Bank of America, Wells Fargo, HSBC, Barclays, and all standard bank statement PDFs.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 px-3 py-1 rounded-md">
                  <FileText className="w-3.5 h-3.5 text-red-500" />
                  PDF only
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 px-3 py-1 rounded-md">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-green-600" />
                  Converts to.XLSX &.CSV
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div
            id="trust-badge"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs sm:text-sm font-medium shadow-xs"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>
              <strong>100% Secure & Private</strong> — Files are processed locally in your browser and never touch a server.
            </span>
          </div>

          {!parseResult &&!isProcessing && (
            <button
              id="try-sample-btn"
              type="button"
              onClick={loadSampleStatement}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-600 hover:text-green-700 hover:bg-green-50 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-green-300 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Try with Sample Statement</span>
            </button>
          )}
        </div>

        {parseResult && parseResult.isScanned && (
          <div
            id="scanned-pdf-warning"
            className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex items-start gap-3 text-sm"
          >
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-amber-900">Scanned Document Detected</p>
              <p>
                {parseResult.warning ||
                  "This looks like a scanned PDF. OCR support is coming soon — please try a text-based PDF for now."}
              </p>
              <p className="text-xs text-amber-700 pt-1">
                Tip: Most banks allow downloading native digital statements directly from your online banking portal.
              </p>
            </div>
          </div>
        )}

        {parseResult &&!parseResult.success &&!parseResult.isScanned && (
          <div
            id="parse-error-message"
            className="mt-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3 text-sm"
          >
            <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-rose-900">Detection Notice</p>
              <p>
                {parseResult.error ||
                  "No transactions could be detected. This bank's PDF layout may not be supported yet."}
              </p>
              <button
                onClick={loadSampleStatement}
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 underline hover:text-rose-900"
              >
                <span>Click here to test converter with a sample bank statement instead</span>
              </button>
            </div>
          </div>
        )}

        {parseResult && parseResult.success && parseResult.transactions.length > 0 && (
          <div id="statement-preview-container" className="mt-8 pt-8 border-t border-slate-200 space-y-6">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <h3 className="text-base font-bold text-slate-800">
                    Extracted {parseResult.totalRows} Transactions
                  </h3>
                  <span className="text-xs font-medium px-2 py-0.5 rounded bg-green-100 text-green-800">
                    {parseResult.columnFormat === 'three-amounts'? '3-Amount Format' : parseResult.columnFormat === 'two-amounts'? '2-Amount Format' : '1-Amount Format'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 truncate max-w-md">
                  File: <span className="font-medium text-slate-700">{parseResult.fileName}</span> ({parseResult.pageCount} {parseResult.pageCount === 1? 'page' : 'pages'})
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <button
                  id="download-excel-btn"
                  onClick={handleDownloadExcel}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 active:bg-green-800 text-white text-sm font-semibold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Download Excel (.xlsx)</span>
                </button>

                <button
                  id="download-csv-btn"
                  onClick={handleDownloadCsv}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-900 active:bg-slate-950 text-white text-sm font-semibold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-slate-700 focus:ring-offset-1"
                >
                  <Download className="w-4 h-4" />
                  <span>Download CSV</span>
                </button>

                <button
                  id="reset-statement-btn"
                  onClick={resetConverter}
                  title="Upload another statement"
                  className="p-2.5 rounded-lg border border-slate-200 hover:bg-white text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 px-1 gap-2">
              <div className="flex items-center gap-1.5">
                <TableIcon className="w-4 h-4 text-slate-400" />
                <span>
                  {parseResult.totalRows > 50
                   ? `Showing first 50 rows. Download the file to see all ${parseResult.totalRows} transactions.`
                    : `Showing all ${parseResult.totalRows} transactions in preview.`}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setShowRawView(!showRawView)}
                className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-700"
              >
                <span>{showRawView? 'Hide raw line view' : 'Show raw parsed line'}</span>
                {showRawView? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-inner bg-white">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-semibold">
                    <th className="py-3 px-3 sm:px-4 w-12 text-slate-400 text-center">#</th>
                    {parseResult.columns.map((col) => (
                      <th
                        key={col.key}
                        className={`py-3 px-3 sm:px-4 ${
                          col.align === 'right'? 'text-right' : 'text-left'
                        }`}
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {parseResult.transactions.slice(0, 50).map((tx, idx) => (
                    <tr
                      key={tx.id || idx}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      <td className="py-2.5 px-3 sm:px-4 text-slate-400 text-center font-mono text-xs">
                        {idx + 1}
                      </td>
                      {parseResult.columns.map((col) => {
                        const val = tx[col.key] || '—';
                        const isAmountCol = col.key === 'amount' || col.key === 'debit' || col.key === 'credit' || col.key === 'balance';
                        const isDebit = col.key === 'debit' || (col.key === 'amount' && String(val).includes('-'));

                        return (
                          <td
                            key={col.key}
                            className={`py-2.5 px-3 sm:px-4 ${
                              col.align === 'right'? 'text-right font-mono' : 'text-left'
                            } ${
                              isDebit && val!== '—'
                               ? 'text-rose-600 font-medium'
                                : col.key === 'credit' && val!== '—'
                               ? 'text-emerald-600 font-medium'
                                : isAmountCol
                               ? 'text-slate-800'
                                : 'text-slate-700'
                            }`}
                          >
                            <div>
                              <span>{String(val)}</span>
                              {showRawView && col.key === 'description' && tx.rawLine && (
                                <p className="text- text-slate-400 font-mono mt-0.5 truncate max-w-sm">
                                  Raw: {tx.rawLine}
                                </p>
                              )}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-amber-50/80 border border-amber-200/70 rounded-lg p-3 text-xs text-amber-800 flex items-center gap-2">
              <span className="text-sm">⚠</span>
              <p>
                <strong>Beta parser</strong> — please review the extracted data before relying on it for accounting purposes. Bank statement formatting can vary across institutions.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
