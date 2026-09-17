import { useEffect } from 'react'
import { Check, Sparkles } from 'lucide-react'
import { PageRoute } from '../types'

interface PricingPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    const existing = document.querySelector('script[src="https://cdn.paddle.com/paddle/v2/paddle.js"]') as HTMLScriptElement | null;
    if (existing) {
      if ((window as any).Paddle) {
        (window as any).Paddle.Environment.set('production')
        ;(window as any).Paddle.Initialize({ token: 'live_2f479480b152ab571be8acd35c7' })
      }
      return;
    }
    const script = document.createElement('script')
    script.src = 'https://cdn.paddle.com/paddle/v2/paddle.js'
    script.async = true
    script.onload = () => {
      // @ts-ignore
      window.Paddle.Environment.set('production')
      // @ts-ignore
      window.Paddle.Initialize({ token: 'live_2f479480b152ab571be8acd35c7' })
    }
    document.body.appendChild(script)
  }, [])

  const openMonthly = () => {
    // @ts-ignore
    window.Paddle?.Checkout.open({
      items: [{ priceId: 'pri_01m2ra3dy583ac8qtb5erzed8j', quantity: 1 }]
    })
  }

  const openAnnual = () => {
    // @ts-ignore
    window.Paddle?.Checkout.open({
      items: [{ priceId: 'pri_01m2ra7gg41wfqqnnb9rk9nz5v', quantity: 1 }]
    })
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        {/* Header - EXACTLY like your screenshot */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-green-50 border border-green-200 text-green-800 text- font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-green-600" />
            <span>FLEXIBLE PLANS FOR EVERYONE</span>
          </div>
          <h1 className="text- sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Simple, Transparent Pricing
          </h1>
          <p className="text- sm:text- text-slate-500">
            No hidden fees. Cancel anytime. Choose the plan that fits your bookkeeping workflow.
          </p>
        </div>

        {/* Cards - EXACTLY like your screenshot */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">

          {/* Free */}
          <div className="bg-white border border-slate-200 rounded- p-8 flex flex-col min-h-">
            <h3 className="font-bold text-slate-900 text-">Free</h3>
            <p className="text-slate-500 text- mt-2 leading-">Ideal for individuals and quick one-off statement conversions.</p>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="text- font-extrabold text-slate-900">$0</span>
              <span className="text-slate-500 text-">/ forever</span>
            </div>
            <div className="h- bg-slate-100 my-6"></div>
            <p className="text- font-bold tracking-widest text-slate-400 uppercase mb-4">Included Features</p>
            <ul className="space-y-3.5 text- flex-1">
              <li className="flex gap-2.5"><Check className="w-5 h-5 text-green-600 shrink-0"/> 1 statement conversion/day</li>
              <li className="flex gap-2.5"><Check className="w-5 h-5 text-green-600 shrink-0"/> Up to 2 pages per file</li>
              <li className="flex gap-2.5"><Check className="w-5 h-5 text-green-600 shrink-0"/> Excel & CSV export</li>
              <li className="flex gap-2.5 text-slate-400"><Check className="w-5 h-5 text-slate-300 shrink-0"/> 100% Client-side privacy</li>
            </ul>
            <button onClick={() => onNavigate('home')} className="w-full mt-8 bg-slate-100 text-slate-600 border border-slate-200 rounded-full py-3 font-semibold text-">Currently Active</button>
          </div>

          {/* Monthly - BEST VALUE */}
          <div className="bg-white border-2 border-green-500 rounded- p-8 flex flex-col min-h- relative shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-green-600 text-white text- px-4 py-1.5 rounded-full font-bold tracking-widest">BEST VALUE</div>
            <h3 className="font-bold text-slate-900 text-">Monthly</h3>
            <p className="text-slate-500 text- mt-2 leading-">Perfect for accountants, bookkeepers, and active businesses.</p>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="text- font-extrabold text-slate-900">$12</span>
              <span className="text-slate-500 text-">/ month</span>
            </div>
            <p className="text-slate-500 text- mt-1">Billed monthly, cancel anytime</p>
            <div className="h- bg-slate-100 my-6"></div>
            <p className="text- font-bold tracking-widest text-slate-400 uppercase mb-4">Everything in Free, Plus</p>
            <ul className="space-y-3.5 text- flex-1">
              <li className="flex gap-2.5"><Check className="w-5 h-5 text-green-600 shrink-0"/><span className="font-medium">Unlimited conversions</span></li>
              <li className="flex gap-2.5"><Check className="w-5 h-5 text-green-600 shrink-0"/><span className="font-medium">Unlimited pages</span></li>
              <li className="flex gap-2.5"><Check className="w-5 h-5 text-green-600 shrink-0"/> Excel, CSV & QuickBooks export</li>
              <li className="flex gap-2.5"><Check className="w-5 h-5 text-green-600 shrink-0"/> Priority support</li>
              <li className="flex gap-2.5"><Check className="w-5 h-5 text-green-600 shrink-0"/> Early access to upcoming OCR parser</li>
            </ul>
            <button onClick={openMonthly} className="w-full mt-8 bg-black text-white rounded-full py-3.5 font-semibold text- hover:bg-slate-800 transition">Subscribe Monthly</button>
          </div>

          {/* Annual */}
          <div className="bg-white border border-slate-200 rounded- p-8 flex flex-col min-h-">
            <div className="flex items-center gap-2.5">
              <h3 className="font-bold text-slate-900 text-">Annual</h3>
              <span className="bg-green-50 text-green-700 border border-green-100 text- px-2.5 py-1 rounded-full font-bold">Save 31%</span>
            </div>
            <p className="text-slate-500 text- mt-2 leading-">Maximum savings for established accounting practices.</p>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="text- font-extrabold text-slate-900">$99</span>
              <span className="text-slate-500 text-">/ year</span>
            </div>
            <p className="text-slate-500 text- mt-1">Just $8.25/month</p>
            <div className="h- bg-slate-100 my-6"></div>
            <p className="text- font-bold tracking-widest text-slate-400 uppercase mb-4">Everything in Monthly</p>
            <ul className="space-y-3.5 text- flex-1">
              <li className="flex gap-2.5"><Check className="w-5 h-5 text-green-600 shrink-0"/> Everything in Monthly</li>
              <li className="flex gap-2.5 text-green-700 font-medium"><Check className="w-5 h-5 text-green-600 shrink-0"/> Save 31% vs monthly</li>
              <li className="flex gap-2.5"><Check className="w-5 h-5 text-green-600 shrink-0"/> Unlimited conversions</li>
              <li className="flex gap-2.5"><Check className="w-5 h-5 text-green-600 shrink-0"/> Priority support</li>
              <li className="flex gap-2.5"><Check className="w-5 h-5 text-green-600 shrink-0"/> Multi-year price lock</li>
            </ul>
            <button onClick={openAnnual} className="w-full mt-8 bg-black text-white rounded-full py-3.5 font-semibold text- hover:bg-slate-800 transition">Subscribe Annual</button>
          </div>

        </div>

        <div className="flex justify-center mt-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-500 text-">
            <span>Paid plans will be active via secure checkout (powered by Paddle).</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default PricingPage;
