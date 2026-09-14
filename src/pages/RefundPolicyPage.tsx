import React from 'react';
import { RotateCcw, CheckCircle2, ShieldCheck, Mail, MapPin, User, FileText, HelpCircle } from 'lucide-react';
import { PageRoute } from '../types';

interface RefundPolicyPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const RefundPolicyPage: React.FC<RefundPolicyPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      
      {/* Header */}
      <div className="space-y-3 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-800 text-xs font-semibold tracking-wide uppercase">
          <RotateCcw className="w-3.5 h-3.5 text-green-600" />
          <span>Customer Guarantees</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Refund & Cancellation Policy
        </h1>
        <p className="text-sm text-slate-500">
          Last revised: September 2026 • Transparent customer commitment
        </p>
      </div>

      {/* 7-Day Money Back Guarantee Banner */}
      <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-6 sm:p-7 space-y-2">
        <h3 className="text-base font-bold text-emerald-950 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          100% Risk-Free 7-Day Money-Back Guarantee
        </h3>
        <p className="text-sm text-emerald-900 leading-relaxed">
          We want you to be completely confident in Staty. If you purchase any paid subscription and find that our PDF to Excel converter does not meet your expectations, simply reach out to us within <strong>7 days of your purchase</strong>, and we will issue a full refund — no hassle and no hard feelings.
        </p>
      </div>

      {/* Policy Details */}
      <div className="space-y-8 text-slate-700 text-sm leading-relaxed">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-green-600 font-mono text-sm">01.</span>
            Free Plan Policy
          </h2>
          <p>
            Staty offers a complimentary tier that requires no payment, credit card, or recurring obligation. You will never be charged or automatically converted to a paid tier while using the free version.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-green-600 font-mono text-sm">02.</span>
            Subscription Cancellation
          </h2>
          <p>
            You may cancel your monthly ($12/month) or annual ($99/year) subscription at any time:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600">
            <li>
              <strong>Immediate Self-Service or Email Request:</strong> You can cancel directly via the customer management link inside your Paddle purchase receipt, or by sending a short email to <a href="mailto:ahredoy420@gmail.com" className="text-green-700 font-medium underline">ahredoy420@gmail.com</a> with your purchase email address.
            </li>
            <li>
              <strong>Continued Access:</strong> When you cancel, your account will not renew at the next billing date. You will continue to have full access to premium converter capabilities until the end of your currently paid billing term.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-green-600 font-mono text-sm">03.</span>
            Refund Eligibility
          </h2>
          <p>
            Refunds are evaluated according to clear, fair principles:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600">
            <li>
              <strong>First-Time Subscriptions:</strong> You are eligible for a 100% full refund on any initial subscription within seven (7) calendar days of initial payment.
            </li>
            <li>
              <strong>Technical Discrepancies:</strong> If an unsupported bank PDF cannot be extracted by our parser and you reached out for assistance, we will prioritize refunding your transaction promptly.
            </li>
            <li>
              <strong>Annual Renewals:</strong> For annual plans, if you forgot to cancel prior to renewal, please contact us within 48 hours of the renewal charge for a prompt courtesy refund.
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-green-600 font-mono text-sm">04.</span>
            How to Request a Refund
          </h2>
          <p>
            To request a refund or cancellation assistance:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-slate-600">
            <li>Send an email to <a href="mailto:ahredoy420@gmail.com" className="text-green-700 font-medium underline">ahredoy420@gmail.com</a>.</li>
            <li>Include your order number (e.g., from your Paddle receipt) and the email address used during purchase.</li>
            <li>(Optional) Briefly share your reason or bank institution name so our engineering team can improve format compatibility.</li>
          </ol>
          <p>
            Our support team reviews and processes refund requests within <strong>24 to 48 hours</strong>.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-green-600 font-mono text-sm">05.</span>
            Payment Processor & Merchant of Record (Paddle.com)
          </h2>
          <p>
            All billing, invoicing, chargebacks, and refund settlements are processed through our authorized reseller and Merchant of Record, <strong>Paddle.com Market Ltd</strong>. Once approved, refunds are credited back to your original payment method (Credit Card, PayPal, Apple Pay, etc.) within 3–7 business days, depending on your bank's posting timeframe.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-4 pt-4 border-t border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-green-600 font-mono text-sm">06.</span>
            Contact & Support
          </h2>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2.5 max-w-lg text-slate-800">
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-green-600" />
              <span><strong>Business Owner:</strong> MD AMIR HAMZA REDOY</span>
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
                <strong>Support Email:</strong>{' '}
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
