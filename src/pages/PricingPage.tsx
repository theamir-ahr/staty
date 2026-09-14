import React from 'react';
import { Check, ShieldCheck, Zap, Sparkles, CreditCard, HelpCircle } from 'lucide-react';
import { PageRoute } from '../types';

interface PricingPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-14">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-800 text-xs font-semibold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5 text-green-600" />
          <span>Flexible Plans for Everyone</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Simple, Transparent Pricing
        </h1>
        <p className="text-base sm:text-lg text-slate-600">
          No hidden fees. Cancel anytime. Choose the plan that fits your bookkeeping workflow.
        </p>
      </div>

      {/* 3-Column Pricing Card Layout (Mandatory requirement #2) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4">
        
        {/* Tier 1: Free */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col justify-between shadow-xs hover:border-slate-300 transition-all">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900">Free</h3>
              <p className="text-sm text-slate-500">
                Ideal for individuals and quick one-off statement conversions.
              </p>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-slate-900">$0</span>
              <span className="text-sm text-slate-500">/ forever</span>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Included Features
              </p>
              <ul className="space-y-2.5 text-sm text-slate-700">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>1 statement conversion/day</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Up to 2 pages per file</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Excel & CSV export</span>
                </li>
                <li className="flex items-center gap-2.5 text-slate-400">
                  <Check className="w-4 h-4 text-slate-300 flex-shrink-0" />
                  <span>100% Client-side privacy</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8">
            <button
              id="plan-free-btn"
              disabled
              className="w-full py-3 px-4 rounded-xl bg-slate-100 text-slate-500 text-sm font-semibold cursor-default border border-slate-200 text-center"
            >
              Currently Active
            </button>
          </div>
        </div>

        {/* Tier 2: Monthly (Highlighted Card with Best Value badge, green border, elevated) */}
        <div className="relative bg-white rounded-2xl border-2 border-green-600 p-8 flex flex-col justify-between shadow-xl shadow-green-600/10 md:-translate-y-2 transition-all">
          
          {/* Best Value Badge */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
            Best Value
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900">Monthly</h3>
              <p className="text-sm text-slate-500">
                Perfect for accountants, bookkeepers, and active businesses.
              </p>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-slate-900">$12</span>
              <span className="text-sm text-slate-500">/ month</span>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Everything in Free, plus
              </p>
              <ul className="space-y-2.5 text-sm text-slate-700">
                <li className="flex items-center gap-2.5 font-medium text-slate-900">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Unlimited conversions</span>
                </li>
                <li className="flex items-center gap-2.5 font-medium text-slate-900">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Unlimited pages</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Excel, CSV & QuickBooks export</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Early access to upcoming OCR parser</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8">
            <button
              id="plan-monthly-btn"
              disabled
              className="w-full py-3 px-4 rounded-xl bg-slate-200 text-slate-600 text-sm font-semibold cursor-not-allowed text-center transition-colors"
            >
              Coming Soon
            </button>
          </div>
        </div>

        {/* Tier 3: Annual */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col justify-between shadow-xs hover:border-slate-300 transition-all">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">Annual</h3>
                <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                  Save 31%
                </span>
              </div>
              <p className="text-sm text-slate-500">
                Maximum savings for established accounting practices.
              </p>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-slate-900">$99</span>
              <span className="text-sm text-slate-500">/ year</span>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Everything in Monthly
              </p>
              <ul className="space-y-2.5 text-sm text-slate-700">
                <li className="flex items-center gap-2.5 font-medium text-slate-900">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Everything in Monthly</span>
                </li>
                <li className="flex items-center gap-2.5 font-medium text-emerald-700">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Save 31% vs monthly</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Unlimited conversions</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Multi-year price lock</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8">
            <button
              id="plan-annual-btn"
              disabled
              className="w-full py-3 px-4 rounded-xl bg-slate-200 text-slate-600 text-sm font-semibold cursor-not-allowed text-center transition-colors"
            >
              Coming Soon
            </button>
          </div>
        </div>

      </div>

      {/* Paddle Note (Mandatory requirement #2) */}
      <div className="text-center pt-2">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs sm:text-sm">
          <CreditCard className="w-4 h-4 text-slate-500" />
          <span>
            Paid plans will be available soon via secure checkout (powered by Paddle).
          </span>
        </div>
      </div>

      {/* Pricing FAQ */}
      <div className="pt-10 border-t border-slate-200 space-y-6 max-w-4xl mx-auto">
        <h3 className="text-xl font-bold text-slate-900 text-center">
          Pricing & Billing Questions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
            <h4 className="font-semibold text-slate-800 text-sm">
              Can I use Staty for free right now?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Yes! The core PDF-to-Excel and CSV converter is fully operational and free to use directly in your browser without entering any credit card.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
            <h4 className="font-semibold text-slate-800 text-sm">
              How will billing work when paid plans launch?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              All subscription payments will be securely handled by Paddle.com, our authorized Merchant of Record. Paddle complies with global tax requirements, VAT/GST collection, and PCI-DSS Level 1 compliance.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
            <h4 className="font-semibold text-slate-800 text-sm">
              What is your refund policy?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              All paid subscriptions will include an unconditional 7-day money-back guarantee. You can cancel your subscription anytime with no questions asked.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
            <h4 className="font-semibold text-slate-800 text-sm">
              Do you offer volume licensing for accounting firms?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Yes, we are actively developing team workspaces and custom batch parsers for certified public accountants. Feel free to contact us for early enterprise access.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
