import React, { useState, useEffect } from 'react';
import { PageRoute } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { PricingPage } from './pages/PricingPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';
import { RefundPolicyPage } from './pages/RefundPolicyPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const getInitialRoute = (): PageRoute => {
    if (typeof window === 'undefined') return 'home';
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    if (hash === 'pricing') return 'pricing';
    if (hash === 'privacy-policy') return 'privacy-policy';
    if (hash === 'terms-of-service') return 'terms-of-service';
    if (hash === 'refund-policy') return 'refund-policy';
    if (hash === 'contact') return 'contact';

    const path = window.location.pathname.replace(/^\//, '');
    if (path === 'pricing') return 'pricing';
    if (path === 'privacy-policy') return 'privacy-policy';
    if (path === 'terms-of-service') return 'terms-of-service';
    if (path === 'refund-policy') return 'refund-policy';
    if (path === 'contact') return 'contact';

    return 'home';
  };

  const [currentRoute, setCurrentRoute] = useState<PageRoute>(getInitialRoute);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (['home', 'pricing', 'privacy-policy', 'terms-of-service', 'refund-policy', 'contact'].includes(hash)) {
        setCurrentRoute(hash as PageRoute);
      } else if (!hash) {
        setCurrentRoute('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route: PageRoute) => {
    setCurrentRoute(route);
    window.location.hash = route === 'home' ? '' : `/${route}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9fafb] text-slate-800 font-sans antialiased selection:bg-green-100 selection:text-green-900">
      {/* Top Navigation */}
      <Navbar currentRoute={currentRoute} onNavigate={navigateTo} />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentRoute === 'home' && <HomePage onNavigate={navigateTo} />}
        {currentRoute === 'pricing' && <PricingPage onNavigate={navigateTo} />}
        {currentRoute === 'privacy-policy' && <PrivacyPolicyPage onNavigate={navigateTo} />}
        {currentRoute === 'terms-of-service' && <TermsOfServicePage onNavigate={navigateTo} />}
        {currentRoute === 'refund-policy' && <RefundPolicyPage onNavigate={navigateTo} />}
        {currentRoute === 'contact' && <ContactPage onNavigate={navigateTo} />}
      </main>

      {/* Shared Global Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}
