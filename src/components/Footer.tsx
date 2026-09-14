import React from 'react';
import { Logo } from './Logo';
import { PageRoute } from '../types';
import { ShieldCheck, Mail, MapPin, User, FileText, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const handleNav = (route: PageRoute) => {
    onNavigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          {/* Col 1: Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center">
              <button
                id="footer-logo-btn"
                onClick={() => handleNav('home')}
                className="focus:outline-none focus:ring-2 focus:ring-green-500 rounded p-0.5 group inline-flex items-center gap-2.5"
              >
                {/* Custom SVG logo with white text for dark footer */}
                <div className="inline-flex items-center gap-2.5 select-none">
                  <svg
                    className="w-8 h-9 flex-shrink-0"
                    viewBox="0 0 104 124"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M 12 0 C 5.373 0 0 5.373 0 12 L 0 112 C 0 118.627 5.373 124 12 124 L 92 124 C 98.627 124 104 118.627 104 112 L 104 36 L 68 0 Z"
                      fill="#16a34a"
                    />
                    <path
                      d="M 68 0 L 104 36 L 80 36 C 73.373 36 68 30.627 68 24 Z"
                      fill="#15803d"
                    />
                    <rect
                      x="16"
                      y="44"
                      width="72"
                      height="64"
                      rx="8"
                      fill="#ffffff"
                      fillOpacity="0.95"
                    />
                    <rect x="22" y="50" width="28" height="14" rx="3" fill="#16a34a" />
                    <rect x="54" y="50" width="28" height="14" rx="3" fill="#16a34a" />
                    <rect x="22" y="69" width="28" height="14" rx="3" fill="#16a34a" />
                    <rect x="54" y="69" width="28" height="14" rx="3" fill="#16a34a" />
                    <rect x="22" y="88" width="28" height="14" rx="3" fill="#16a34a" />
                    <rect x="54" y="88" width="28" height="14" rx="3" fill="#16a34a" />
                  </svg>
                  <span className="font-black tracking-tight text-white text-2xl">
                    Staty
                  </span>
                </div>
              </button>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Bank Statement PDF to Excel Converter — 100% private, browser-based. Convert bank statements into clean, structured Excel & CSV spreadsheets without uploading sensitive financial files to remote servers.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-slate-800/80 border border-slate-700/60 rounded-lg p-2.5 max-w-sm">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>Zero-Storage Guarantee: Client-side processing only.</span>
            </div>

            <div className="text-xs text-slate-500 pt-2 space-y-1">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Owner: <strong className="text-slate-300 font-medium">MD AMIR HAMZA REDOY</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Joypurhat, Rajshahi, Bangladesh</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <a href="mailto:ahredoy420@gmail.com" className="text-slate-300 hover:text-green-400 underline decoration-slate-600">
                  ahredoy420@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Legal Column */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Legal & Compliance
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  id="footer-link-privacy"
                  onClick={() => handleNav('privacy-policy')}
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-slate-500" />
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-link-terms"
                  onClick={() => handleNav('terms-of-service')}
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-slate-500" />
                  <span>Terms of Service</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-link-refund"
                  onClick={() => handleNav('refund-policy')}
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-slate-500" />
                  <span>Refund & Cancellation Policy</span>
                </button>
              </li>
            </ul>
            <div className="pt-2 text-xs text-slate-500 border-t border-slate-800">
              Paddle.com is the authorized Merchant of Record for all commercial transactions and subscriptions.
            </div>
          </div>

          {/* Col 3: Company Column */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  id="footer-link-converter"
                  onClick={() => handleNav('home')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  PDF to Excel Converter
                </button>
              </li>
              <li>
                <button
                  id="footer-link-pricing"
                  onClick={() => handleNav('pricing')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Pricing Plans
                </button>
              </li>
              <li>
                <button
                  id="footer-link-contact"
                  onClick={() => handleNav('contact')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Contact & Support
                </button>
              </li>
            </ul>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800 px-3 py-1.5 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>System Status: Fully Operational</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {currentYear} Staty. All rights reserved.</p>
          <p>
            Developed with privacy-first client-side architecture. No cookies for file tracking.
          </p>
        </div>
      </div>
    </footer>
  );
};
