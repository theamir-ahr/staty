import React from 'react';
import { ShieldCheck, Lock, EyeOff, ServerOff, Mail, MapPin, User, FileText } from 'lucide-react';
import { PageRoute } from '../types';

interface PrivacyPolicyPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      
      {/* Page Header */}
      <div className="space-y-3 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-800 text-xs font-semibold tracking-wide uppercase">
          <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
          <span>Legal Documentation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-500">
          Last updated: September 2026 • Effective immediately
        </p>
      </div>

      {/* Highlights Banner */}
      <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-6 sm:p-7 space-y-3">
        <h2 className="text-base font-bold text-emerald-950 flex items-center gap-2">
          <ServerOff className="w-5 h-5 text-emerald-600" />
          The Privacy-First Principle of Staty
        </h2>
        <p className="text-sm text-emerald-900 leading-relaxed">
          Staty was specifically created to solve the critical security dilemma of converting sensitive financial documents online. Unlike traditional web converters, <strong>Staty runs entirely within your client browser</strong>. Your bank statements, transaction amounts, account numbers, and personal details <strong>never leave your device and are never uploaded to our servers</strong>.
        </p>
      </div>

      {/* Policy Content Sections */}
      <div className="space-y-8 text-slate-700 text-sm leading-relaxed">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-green-600 font-mono text-sm">01.</span>
            How Your Files Are Processed
          </h2>
          <p>
            When you select or drop a bank statement PDF onto Staty, the file is read using the HTML5 File API and parsed directly inside your browser via local JavaScript/WebAssembly routines. At no point during the parsing, coordinate extraction, or spreadsheet generation does your document transmit over the network to any remote server or third-party cloud API.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li><strong>Zero Server Uploads:</strong> Files remain exclusively in your local machine's memory (RAM).</li>
            <li><strong>Zero Storage:</strong> We do not operate remote document vaults, caches, or file databases.</li>
            <li><strong>Immediate Clearing:</strong> Once you close or reload the browser tab, all extracted in-memory data is instantly released.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-green-600 font-mono text-sm">02.</span>
            Information We Collect
          </h2>
          <p>
            Because Staty is designed with radical privacy principles, our data collection practices are minimal:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
            <li>
              <strong>Financial & Document Data:</strong> We <strong>NEVER</strong> collect, inspect, log, or store your bank statement contents, transaction history, balance amounts, payee names, or account numbers.
            </li>
            <li>
              <strong>Analytics & Usage Telemetry:</strong> We may collect non-identifiable, aggregated operational statistics (such as browser vendor, screen resolution, and conversion completion status) purely to detect bugs and ensure cross-browser compatibility.
            </li>
            <li>
              <strong>Support Communications:</strong> If you contact us via email, we retain your email address and message contents solely for the purpose of answering your inquiry.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-green-600 font-mono text-sm">03.</span>
            Cookies and Local Storage
          </h2>
          <p>
            Staty does not use tracking cookies or advertising pixels. We may utilize standard browser <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">localStorage</code> strictly to remember local user interface preferences (such as light/dark mode choices or table display settings). You can clear your browser storage at any time without affecting the tool's core utility.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-green-600 font-mono text-sm">04.</span>
            Third-Party Services & Payment Processing
          </h2>
          <p>
            For commercial subscription management and paid tiers, our order process is conducted by our authorized online reseller and Merchant of Record, <strong>Paddle.com</strong>.
          </p>
          <p>
            Paddle.com manages all customer service inquiries and handles returns for paid licenses. When you purchase a plan, your billing information (including billing address, credit card numbers, or PayPal tokens) is collected directly by Paddle in accordance with their strict PCI-DSS Level 1 compliance and Privacy Policy. Staty does not receive or store your raw payment card credentials.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-green-600 font-mono text-sm">05.</span>
            Data Security
          </h2>
          <p>
            Our web application is served exclusively over encrypted Transport Layer Security (TLS/HTTPS). Because all file analysis is isolated inside the browser sandbox, your sensitive data is immune to conventional server-side breaches, intercepted cloud storage buckets, or unauthorized backend operator access.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-green-600 font-mono text-sm">06.</span>
            Your Rights (GDPR & CCPA Compliance)
          </h2>
          <p>
            Depending on your jurisdiction, you have statutory rights regarding personal data under regulations like the EU General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA). Because we do not store your financial files or associate accounts with your identity, we hold no personal financial data to modify, export, or delete. For any general communications or billing inquiries, you can exercise your rights by contacting our team.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-4 pt-4 border-t border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-green-600 font-mono text-sm">07.</span>
            Contact & Business Information
          </h2>
          <p>
            If you have questions, feedback, or concerns regarding this Privacy Policy or our client-side processing practices, please contact our designated privacy representative:
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2.5 max-w-lg text-slate-800">
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-green-600" />
              <span><strong>Business Owner:</strong> MD AMIR HAMZA REDOY</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <FileText className="w-4 h-4 text-green-600" />
              <span><strong>Platform:</strong> Staty</span>
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
