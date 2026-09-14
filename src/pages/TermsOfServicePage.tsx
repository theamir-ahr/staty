import React from 'react';
import { FileText, AlertTriangle, Scale, ShieldCheck, Mail, MapPin, User } from 'lucide-react';
import { PageRoute } from '../types';

interface TermsOfServicePageProps {
  onNavigate: (route: PageRoute) => void;
}

export const TermsOfServicePage: React.FC<TermsOfServicePageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      
      {/* Header */}
      <div className="space-y-3 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-800 text-xs font-semibold tracking-wide uppercase">
          <Scale className="w-3.5 h-3.5 text-green-600" />
          <span>User Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-sm text-slate-500">
          Last revised: September 2026 • Please read carefully before using Staty
        </p>
      </div>

      {/* Critical Accuracy Callout (Mandatory requirement #4) */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 space-y-2">
        <h3 className="text-base font-bold text-amber-900 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
          Important Financial Accuracy Disclaimer
        </h3>
        <p className="text-sm text-amber-950 leading-relaxed">
          Staty provides automated algorithmic parsing of bank statement PDFs into spreadsheet data. Because bank document layouts, character encodings, and table styling vary significantly across financial institutions, <strong>automated conversion outputs may contain inaccuracies, omissions, or misalignments</strong>. You must thoroughly review and verify all extracted data against your official source statements before relying on it for accounting, tax filings, payroll, audits, or legal decisions.
        </p>
      </div>

      {/* Terms Body */}
      <div className="space-y-8 text-slate-700 text-sm leading-relaxed">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-green-600 font-mono text-sm">01.</span>
            Service Description
          </h2>
          <p>
            Staty ("we", "us", "our") provides a web-based client-side utility located at this website that assists users in extracting structured transaction information from portable document format (.pdf) bank statements and converting that data into spreadsheet formats, including Microsoft Excel (.xlsx) and Comma-Separated Values (.csv).
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-green-600 font-mono text-sm">02.</span>
            Free & Paid Subscription Plans
          </h2>
          <p>
            Staty offers both complimentary and premium paid plan structures:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600">
            <li>
              <strong>Free Plan:</strong> Provided at $0 without registration, allowing single statement conversions per day (up to 2 pages per document) with standard Excel and CSV exports.
            </li>
            <li>
              <strong>Monthly Subscription:</strong> $12 per month, granting unlimited conversions, multi-page batch support, and priority customer service.
            </li>
            <li>
              <strong>Annual Subscription:</strong> $99 per year (a 31% discount compared to monthly recurring billing), granting all monthly tier benefits with annual renewal.
            </li>
          </ul>
          <p className="text-xs text-slate-500 italic">
            Note: All commercial billing, tax collection, and checkout flows for paid plans are processed via Paddle.com as our Merchant of Record.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-green-600 font-mono text-sm">03.</span>
            Acceptable Use
          </h2>
          <p>
            You agree to use Staty only for lawful business, bookkeeping, and personal financial organizational purposes. You agree NOT to:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>Reverse engineer, decompile, or attempt to extract source code for unauthorized cloning.</li>
            <li>Attempt to bypass client-side limits through automated bots or scrapers.</li>
            <li>Use the service to process documents obtained through unlawful means or unauthorized access.</li>
            <li>Interfere with or disrupt the website's integrity or network security.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-green-600 font-mono text-sm">04.</span>
            Accuracy Disclaimer & Professional Advice
          </h2>
          <p>
            Staty is a software conversion tool, not a certified public accounting firm, financial advisor, or legal counselor. No content or software output on this website constitutes certified accounting, tax, or legal advice. The user bears sole responsibility for verifying all numbers, currency signs, debits, credits, and account balances before submitting records to tax authorities, lenders, or business partners.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-green-600 font-mono text-sm">05.</span>
            Subscription, Billing & Cancellation
          </h2>
          <p>
            Subscriptions renew automatically at the end of each billing cycle (monthly or annually) unless cancelled by the user prior to the renewal date. You can cancel your subscription at any time by contacting our support team or utilizing the customer portal link provided in your Paddle purchase confirmation receipt. Upon cancellation, your access remains active until the end of your prepaid period.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-green-600 font-mono text-sm">06.</span>
            Limitation of Liability
          </h2>
          <p>
            To the fullest extent permitted by applicable law, Staty, its owner, affiliates, and licensors shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data loss, accounting penalties, tax fines, or business interruption arising out of your use of or inability to use this service. In no event shall our total aggregate liability exceed the amount paid by you to Staty in the twelve (12) months preceding the claim.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-green-600 font-mono text-sm">07.</span>
            Changes to Terms
          </h2>
          <p>
            We reserve the right to revise or update these Terms of Service at any time. Any revisions will be published on this page with an updated modification date. Your continued use of the platform after updates indicates acceptance of the revised terms.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-4 pt-4 border-t border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-green-600 font-mono text-sm">08.</span>
            Contact Information
          </h2>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2.5 max-w-lg text-slate-800">
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-green-600" />
              <span><strong>Owner & Operator:</strong> MD AMIR HAMZA REDOY</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <FileText className="w-4 h-4 text-green-600" />
              <span><strong>Product:</strong> Staty</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-green-600" />
              <span><strong>Address:</strong> Joypurhat, Rajshahi, Bangladesh</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-green-600" />
              <span>
                <strong>Email:</strong>{' '}
                <a href="mailto:ahredoy420@gmail.com" className="text-green-700 underline font-medium">
                  ahredoy420@gmail.com
                </a>
              </span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
