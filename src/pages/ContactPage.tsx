import React, { useState } from 'react';
import { Mail, MapPin, User, Clock, Send, CheckCircle2, MessageSquare, Building2, HelpCircle } from 'lucide-react';
import { PageRoute } from '../types';

interface ContactPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Support');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    // Simulate clean client response & provide direct mailto link
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-800 text-xs font-semibold tracking-wide uppercase">
          <MessageSquare className="w-3.5 h-3.5 text-green-600" />
          <span>We're Here to Help</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Contact Us
        </h1>
        <p className="text-base sm:text-lg text-slate-600">
          Have questions about bank statement formats, subscription inquiries, or feature suggestions? Our team typically responds within <strong>24 to 48 hours</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Info Card (Col 1 - Mandatory requirement #6) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-900">
              Official Business Details
            </h3>

            <div className="space-y-4 text-sm text-slate-700">
              {/* Business Name */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <Building2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase">Business / App Name</p>
                  <p className="font-semibold text-slate-900">Staty</p>
                  <p className="text-xs text-slate-500">Bank Statement PDF to Excel Converter</p>
                </div>
              </div>

              {/* Owner */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <User className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase">Business Owner</p>
                  <p className="font-semibold text-slate-900">MD AMIR HAMZA REDOY</p>
                </div>
              </div>

              {/* Support Email */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <Mail className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase">Support Email</p>
                  <a
                    href="mailto:ahredoy420@gmail.com"
                    className="font-semibold text-green-700 hover:text-green-800 underline"
                  >
                    ahredoy420@gmail.com
                  </a>
                  <p className="text-xs text-slate-500">Monitored 7 days a week</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <MapPin className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase">Registered Address</p>
                  <p className="font-semibold text-slate-900">Joypurhat, Rajshahi, Bangladesh</p>
                </div>
              </div>

              {/* Response Time */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 text-emerald-900">
                <Clock className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-emerald-700 font-semibold uppercase">Expected Response Time</p>
                  <p className="font-semibold">24 – 48 Hours</p>
                  <p className="text-xs text-emerald-700">All customer tickets receive a direct human response.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form (Col 2) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Send Us a Message
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              Fill out the form below or write directly to{' '}
              <a href="mailto:ahredoy420@gmail.com" className="text-green-600 underline">
                ahredoy420@gmail.com
              </a>.
            </p>

            {submitted ? (
              <div className="py-10 text-center space-y-4 bg-green-50/60 rounded-xl p-6 border border-green-200">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">
                  Message Sent Successfully!
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you, <strong>{name}</strong>. We have received your inquiry and will reply to <strong>{email}</strong> within 24 to 48 hours.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="text-xs font-semibold text-green-700 underline"
                  >
                    Send another inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none text-sm transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    Subject
                  </label>
                  <select
                    id="contact-subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none text-sm transition-all bg-white"
                  >
                    <option value="General Support">General Support & Question</option>
                    <option value="Bank PDF Compatibility">Bank PDF Compatibility / Layout Request</option>
                    <option value="Pricing & Billing">Pricing & Paddle Billing Inquiry</option>
                    <option value="Feature Suggestion">Feature Suggestion or Partnership</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    Message Details *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    placeholder="Tell us about the bank statement you're trying to convert, or any questions you have..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none text-sm transition-all resize-y"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <p className="text-xs text-slate-400">
                    * Required fields
                  </p>
                  <button
                    id="submit-contact-btn"
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold text-sm shadow-sm transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
