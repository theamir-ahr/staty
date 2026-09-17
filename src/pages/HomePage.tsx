import React, { useEffect, useState } from 'react';
import { ConverterTool } from '../components/ConverterTool';
import {
  ShieldCheck,
  Zap,
  FileSpreadsheet,
  CheckCircle,
  Lock,
  Cpu,
  ArrowRight,
  HelpCircle,
  Building2,
  FileCheck,
  Sparkles
} from 'lucide-react';
import { PageRoute } from '../types';

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [showProSuccess, setShowProSuccess] = useState(false);

  // ADDED: Pro success message
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('paid') === 'success') {
      localStorage.setItem('staty_pro', 'true');
      setShowProSuccess(true);
      window.history.replaceState({}, '', window.location.pathname);
      setTimeout(() => setShowProSuccess(false), 6000);
    }
  }, []);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">

      {/* ADDED: Pro Success Message */}
      {showProSuccess && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] bg-black text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-green-500/30 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <p className="font-bold text-sm flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-yellow-400" /> Pro Activated!
            </p>
            <p className="text-xs text-slate-300">Welcome to Staty Pro - Unlimited conversions unlocked 🚀</p>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-8 sm:pt-14 text-center px-4 sm:px-6 max-w-4xl mx-auto space-y-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-50 border border-green-200/80 text-green-800 text-xs font-semibold tracking-wide uppercase shadow-xs">
          <ShieldCheck className="w-4 h-4 text-green-600" />
          <span>Privacy-First • 100% Client-Side Conversion</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
          Convert Bank Statement PDFs to Excel — <span className="text-green-600">Instantly</span>
        </h1>

        <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          Drag, drop, and download. No sign-up. No uploads to any server. Everything happens right inside your browser.
        </p>
      </section>

      {/* PDF Converter Tool Component */}
      <section className="px-4 sm:px-6">
        <ConverterTool />
      </section>

      {/* 3-Column Feature Grid (Mandatory requirement #1) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Feature 1: 100% Secure & Private */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              100% Secure & Private
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Files are processed locally in your browser and never touch a server. Your confidential bank balance and transactions remain strictly on your own device.
            </p>
          </div>

          {/* Feature 2: Instant Conversion */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-5">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Instant Conversion
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              No waiting, no queue. Your Excel file is ready in seconds. Utilizing web assembly coordinates extraction for near-instant rendering.
            </p>
          </div>

          {/* Feature 3: Excel & CSV Export */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-5">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Excel & CSV Export
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Download clean, ready-to-use spreadsheets for bookkeeping. Seamlessly import into Microsoft Excel, Google Sheets, QuickBooks, or Xero.
            </p>
          </div>

        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              How Staty Works in 3 Simple Steps
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Engineered specifically for accountants, freelancers, and small business owners who value data confidentiality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 flex items-center justify-center font-bold text-lg mx-auto md:mx-0">
                1
              </div>
              <h4 className="text-base font-semibold text-white">Upload Statement PDF</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Drop your original digital bank statement PDF into the browser upload box.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 flex items-center justify-center font-bold text-lg mx-auto md:mx-0">
                2
              </div>
              <h4 className="text-base font-semibold text-white">Browser Auto-Parse</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Client-side algorithms calculate text coordinates, classify dates, and structure debits, credits, and balances.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 flex items-center justify-center font-bold text-lg mx-auto md:mx-0">
                3
              </div>
              <h4 className="text-base font-semibold text-white">Download Spreadsheet</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Export cleanly formatted.XLSX or.CSV files ready for tax preparation and financial analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Banks & Financial Institutions */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">
          Works with statements from leading global banks
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-slate-500 text-sm font-semibold">
          <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4 text-slate-400" /> Chase</span>
          <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4 text-slate-400" /> Bank of America</span>
          <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4 text-slate-400" /> Wells Fargo</span>
          <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4 text-slate-400" /> CitiBank</span>
          <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4 text-slate-400" /> Barclays</span>
          <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4 text-slate-400" /> HSBC</span>
          <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4 text-slate-400" /> Revolut</span>
          <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4 text-slate-400" /> Wise</span>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-500">
            Everything you need to know about our privacy architecture and parsing engine.
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200">
            <h4 className="text-base font-semibold text-slate-800 mb-2 flex items-center gap-2">
              <Lock className="w-4 h-4 text-green-600 flex-shrink-0" />
              Do my financial statements get uploaded to any server?
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              No, never. Unlike other cloud converters that transmit your sensitive bank statements to third-party servers, Staty performs 100% of the extraction and spreadsheet compilation locally inside your web browser. Even if you disconnect from the internet, the parser continues to run.
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200">
            <h4 className="text-base font-semibold text-slate-800 mb-2 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-green-600 flex-shrink-0" />
              What types of bank statement PDFs are supported?
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Staty supports standard digital bank statements that contain selectable text. Most online banking portals generate native digital PDFs. Scanned image PDFs will prompt an OCR notice as optical character recognition is planned for an upcoming release.
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200">
            <h4 className="text-base font-semibold text-slate-800 mb-2 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
              Can I use the generated Excel file for accounting and tax filing?
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Yes. The exported.xlsx and.csv files follow standard accounting columns (Date, Description, Debit, Credit, Balance) that can be imported immediately into QuickBooks, Xero, Wave, or reviewed manually in Excel or Google Sheets.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Ready to convert your statement?
          </h3>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            Free to use without registration. Try converting your latest statement today.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                window.scrollTo({ top: 120, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold text-sm shadow-md transition-all"
            >
              <span>Scroll to Converter</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
