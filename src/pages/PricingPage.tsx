import { useEffect } from 'react'

declare global {
  interface Window {
    Paddle: any
  }
}

export default function PricingPage() {
  useEffect(() => {
    // Load Paddle.js
    const script = document.createElement('script')
    script.src = 'https://cdn.paddle.com/paddle/v2/paddle.js'
    script.async = true
    script.onload = () => {
      if (window.Paddle) {
        window.Paddle.Environment.set('production')
        window.Paddle.Initialize({ 
          token: 'live_2f479480b152ab571be8acd35c7' 
        })
      }
    }
    document.body.appendChild(script)
  }, [])

  const openMonthly = () => {
    window.Paddle?.Checkout.open({
      items: [{ priceId: 'pri_01m2ra3dy583ac8qtb5erzed8j', quantity: 1 }]
    })
  }

  const openAnnual = () => {
    window.Paddle?.Checkout.open({
      items: [{ priceId: 'pri_01m2ra7gg41wfqqnnb9rk9nz5v', quantity: 1 }]
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-16 text-center">
        <div className="inline-block px-4 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold tracking-widest mb-6">
          FLEXIBLE PLANS FOR EVERYONE
        </div>
        <h1 className="text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-gray-500 text-lg">Choose the plan that fits your needs. All plans include our core features.</p>
        
        <div className="grid md:grid-cols-3 gap-8 mt-16 text-left">
          {/* Free */}
          <div className="border rounded-2xl p-8">
            <h3 className="font-semibold">Free</h3>
            <div className="text-4xl font-bold mt-4">$0 <span className="text-base font-normal text-gray-500">/forever</span></div>
            <p className="text-sm text-gray-500 mt-2">Perfect for trying out Staty</p>
            <button className="w-full mt-6 border rounded-full py-3 font-semibold cursor-default">Current Plan</button>
            <ul className="mt-8 space-y-3 text-sm text-gray-700">
              <li>✓ 5 conversions per day</li>
              <li>✓ Basic file support</li>
              <li>✓ Standard speed</li>
              <li>✓ Community support</li>
            </ul>
          </div>

          {/* Monthly */}
          <div className="border-2 border-green-500 rounded-2xl p-8 relative shadow-lg">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-bold">BEST VALUE</div>
            <h3 className="font-semibold">Monthly</h3>
            <div className="text-4xl font-bold mt-4">$12 <span className="text-base font-normal text-gray-500">/month</span></div>
            <p className="text-sm text-gray-500 mt-2">Billed monthly, cancel anytime</p>
            <button onClick={openMonthly} className="w-full mt-6 bg-black text-white rounded-full py-3 font-semibold hover:bg-gray-800 transition">Subscribe Monthly</button>
            <ul className="mt-8 space-y-3 text-sm text-gray-700">
              <li>✓ Unlimited conversions</li>
              <li>✓ All file formats supported</li>
              <li>✓ Priority conversion speed</li>
              <li>✓ No watermarks</li>
              <li>✓ Email support</li>
            </ul>
          </div>

          {/* Annual */}
          <div className="border rounded-2xl p-8">
            <h3 className="font-semibold flex items-center gap-2">Annual <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Save 31%</span></h3>
            <div className="text-4xl font-bold mt-4">$99 <span className="text-base font-normal text-gray-500">/year</span></div>
            <p className="text-sm text-gray-500 mt-2">That's just $8.25/month</p>
            <button onClick={openAnnual} className="w-full mt-6 bg-black text-white rounded-full py-3 font-semibold hover:bg-gray-800 transition">Subscribe Annual</button>
            <ul className="mt-8 space-y-3 text-sm text-gray-700">
              <li>✓ Everything in Monthly</li>
              <li>✓ 31% savings</li>
              <li>✓ Early access to features</li>
              <li>✓ Priority support</li>
            </ul>
          </div>
        </div>

        <p className="mt-12 text-xs text-gray-400">Secure checkout powered by Paddle • Cancel anytime • 14-day money-back guarantee</p>
      </div>
    </div>
  )
}
