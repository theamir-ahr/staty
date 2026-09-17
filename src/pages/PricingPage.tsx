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

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {/* Free */}
        <div className="border rounded-2xl p-8 flex flex-col">
          <h3 className="font-semibold text-slate-900">Free</h3>
          <div className="text-4xl font-bold mt-4">$0 <span className="text-base font-normal text-slate-500">/forever</span></div>
          <p className="text-sm text-slate-500 mt-2">Perfect for trying out Staty</p>
          <button onClick={() => onNavigate('home')} className="w-full mt-6 border rounded-full py-3 font-semibold">Current Plan</button>
          <ul className="mt-8 space-y-3 text-sm">
            <li className="flex gap-2"><Check className="w-4 h-4 text-green-600"/> 5 conversions / day</li>
            <li className="flex gap-2"><Check className="w-4 h-4 text-green-600"/> Basic file support</li>
            <li className="flex gap-2"><Check className="w-4 h-4 text-green-600"/> Standard speed</li>
          </ul>
        </div>

        {/* Monthly */}
        <div className="border-2 border-green-500 rounded-2xl p-8 flex flex-col relative shadow-xl">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-bold">BEST VALUE</div>
          <h3 className="font-semibold text-slate-900">Monthly</h3>
          <div className="text-4xl font-bold mt-4">$12 <span className="text-base font-normal text-slate-500">/month</span></div>
          <p className="text-sm text-slate-500 mt-2">Billed monthly, cancel anytime</p>
          <button onClick={openMonthly} className="w-full mt-6 bg-black text-white rounded-full py-3 font-semibold hover:bg-slate-800">Subscribe Monthly</button>
          <ul className="mt-8 space-y-3 text-sm">
            <li className="flex gap-2"><Check className="w-4 h-4 text-green-600"/> Unlimited conversions</li>
            <li className="flex gap-2"><Check className="w-4 h-4 text-green-600"/> All file formats</li>
            <li className="flex gap-2"><Check className="w-4 h-4 text-green-600"/> Priority speed</li>
            <li className="flex gap-2"><Check className="w-4 h-4 text-green-600"/> No watermarks</li>
          </ul>
        </div>

        {/* Annual */}
        <div className="border rounded-2xl p-8 flex flex-col">
          <h3 className="font-semibold text-slate-900 flex items-center gap-2">Annual <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Save 31%</span></h3>
          <div className="text-4xl font-bold mt-4">$99 <span className="text-base font-normal text-slate-500">/year</span></div>
          <p className="text-sm text-slate-500 mt-2">Just $8.25/month</p>
          <button onClick={openAnnual} className="w-full mt-6 bg-black text-white rounded-full py-3 font-semibold hover:bg-slate-800">Subscribe Annual</button>
          <ul className="mt-8 space-y-3 text-sm">
            <li className="flex gap-2"><Check className="w-4 h-4 text-green-600"/> Everything in Monthly</li>
            <li className="flex gap-2"><Check className="w-4 h-4 text-green-600"/> 31% savings</li>
            <li className="flex gap-2"><Check className="w-4 h-4 text-green-600"/> Early access</li>
          </ul>
        </div>
      </div>
      <p className="text-center text-xs text-slate-400">Secure checkout by Paddle • Cancel anytime • 14-day guarantee</p>
    </div>
  )
}

export default PricingPage;
