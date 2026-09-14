import React, { useState } from 'react';
import { Logo } from './Logo';
import { PageRoute } from '../types';
import { Menu, X, ShieldCheck, ArrowRight } from 'lucide-react';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (route: PageRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand */}
          <button
            id="nav-logo-btn"
            onClick={() => handleNav('home')}
            className="flex items-center text-left focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-lg py-1 px-1 transition-transform hover:opacity-95"
            aria-label="Staty Home"
          >
            <Logo size="md" />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              id="nav-link-converter"
              onClick={() => handleNav('home')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentRoute === 'home'
                  ? 'text-green-700 bg-green-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Converter
            </button>
            <button
              id="nav-link-pricing"
              onClick={() => handleNav('pricing')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentRoute === 'pricing'
                  ? 'text-green-700 bg-green-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Pricing
            </button>
            <button
              id="nav-link-contact"
              onClick={() => handleNav('contact')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentRoute === 'contact'
                  ? 'text-green-700 bg-green-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Contact
            </button>

            <div className="h-5 w-px bg-slate-200 mx-2" />

            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 rounded-full">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Client-Side Privacy</span>
            </div>

            <button
              id="nav-cta-convert"
              onClick={() => handleNav('home')}
              className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 active:bg-green-800 rounded-lg shadow-sm transition-colors"
            >
              <span>Convert PDF</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg">
          <button
            id="mobile-nav-converter"
            onClick={() => handleNav('home')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium ${
              currentRoute === 'home'
                ? 'bg-green-50 text-green-700 font-semibold'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Converter
          </button>
          <button
            id="mobile-nav-pricing"
            onClick={() => handleNav('pricing')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium ${
              currentRoute === 'pricing'
                ? 'bg-green-50 text-green-700 font-semibold'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Pricing
          </button>
          <button
            id="mobile-nav-contact"
            onClick={() => handleNav('contact')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium ${
              currentRoute === 'contact'
                ? 'bg-green-50 text-green-700 font-semibold'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Contact
          </button>

          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2 px-3 py-2 text-xs text-slate-500 bg-slate-50 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Zero server uploads. Your data stays in your browser.</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
