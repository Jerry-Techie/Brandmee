'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Star, Sparkles, ArrowRight, Calculator, ArrowLeftCircleIcon } from 'lucide-react';

export default function PricingCalculator() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  // Custom Quote State
  const [pages, setPages] = useState<number>(5);
  const [hasEcommerce, setHasEcommerce] = useState<boolean>(false);
  const [hasBooking, setHasBooking] = useState<boolean>(false);
  const [expressDelivery, setExpressDelivery] = useState<boolean>(false);

  // Dynamic Price Calculation
  const calculateCustomPrice = () => {
    let baseSetup = 150 + (pages - 4) * 25;
    let baseMonthly = 20 + Math.floor((pages - 4) / 3) * 5;

    if (hasEcommerce) {
      baseSetup += 150;
      baseMonthly += 15;
    }
    if (hasBooking) {
      baseSetup += 50;
      baseMonthly += 5;
    }
    if (expressDelivery) {
      baseSetup += 100;
    }

    if (billingCycle === 'annual') {
      baseMonthly = Math.round(baseMonthly * 0.85); // 15% off
    }

    return { setup: Math.max(150, baseSetup), monthly: Math.max(20, baseMonthly) };
  };

  const customEstimate = calculateCustomPrice();

  const getMonthlyRate = (rate: number) => {
    return billingCycle === 'annual' ? Math.round(rate * 0.85) : rate;
  };

  return (
    <section id="pricing" className="py-24">
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="section-header">
          <h2 className="section-title">
            Simple, Affordable <span className="gradient-text-flame">Pricing</span>
          </h2>
          <p className="section-desc">
            No hidden setup fees. Pick a package or customize a plan built specifically for your brand.
          </p>

          {/* Billing Toggle */}
          <div
            className="inline-flex items-center bg-black p-[0.35rem] rounded-full border border-white/10 mt-8 gap-2"
          >
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`py-2.5 px-5 rounded-full font-semibold text-[0.9rem] transition-all duration-200 ${
                billingCycle === 'monthly'
                  ? 'bg-flame text-white'
                  : 'bg-transparent text-mist'
              }`}
            >
              Monthly Hosting
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`py-2.5 px-5 rounded-full font-bold text-[0.9rem] transition-all duration-200 flex items-center gap-1 ${
                billingCycle === 'annual'
                  ? 'bg-gold text-[#08090d]'
                  : 'bg-transparent text-mist'
              }`}
            >
              Annual Hosting <span className="text-xs bg-[#08090d] text-[#ffb800] py-[0.1rem] px-1 rounded-[10px]">15% OFF</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="pricing-grid">
          {/* CARD 1 */}
          <div className="pricing-card flex flex-col justify-between">
            <div>
              <span className="text-[0.85rem] font-bold tracking-[0.05em] text-mist">
                STARTER
              </span>
              <div className="mt-4 mb-6">
                <span className="text-5xl font-extrabold text-cream">$150</span>
                <span className="text-mist text-[0.95rem]"> + ${getMonthlyRate(20)}/mo hosting</span>
              </div>
              <ul className="list-none flex flex-col gap-[0.8rem] mb-8">
                <li className="flex items-center gap-[0.6rem] text-mist">
                  <Check size={18} color="var(--flame)" /> 4-Page Custom Website
                </li>
                <li className="flex items-center gap-[0.6rem] text-mist">
                  <Check size={18} color="var(--flame)" /> Mobile Responsive Design
                </li>
                <li className="flex items-center gap-[0.6rem] text-mist">
                  <Check size={18} color="var(--flame)" /> Contact Form Integration
                </li>
                <li className="flex items-center gap-[0.6rem] text-mist">
                  <Check size={18} color="var(--flame)" /> Guaranteed 7-Day Delivery
                </li>
              </ul>
            </div>
            <Link href="/contact?plan=Starter" className="admin-btn-secondary w-full text-center">
              Get Started
            </Link>
          </div>

          {/* CARD 2 - GROWTH */}
          <div
            className="pricing-card growth-plan flex flex-col justify-between relative"
          >
            <div className="absolute top-3 right-4">
              <span className="badge badge-gold text-xs">
                RECOMMENDED
              </span>
            </div>
            <div>
              <span className="text-[0.85rem] font-bold tracking-[0.05em] text-gold">
                GROWTH
              </span>
              <div className="mt-4 mb-6">
                <span className="text-5xl font-extrabold text-cream">$300</span>
                <span className="text-mist text-[0.95rem]"> + ${getMonthlyRate(35)}/mo hosting</span>
              </div>
              <ul className="list-none flex flex-col gap-[0.8rem] mb-8">
                <li className="flex items-center gap-[0.6rem] text-cream">
                  <Check size={18} color="var(--gold)" /> 7-Page Custom Website
                </li>
                <li className="flex items-center gap-[0.6rem] text-cream">
                  <Check size={18} color="var(--gold)" /> Advanced SEO Optimization
                </li>
                <li className="flex items-center gap-[0.6rem] text-cream">
                  <Check size={18} color="var(--gold)" /> Booking & Scheduling Setup
                </li>
                <li className="flex items-center gap-[0.6rem] text-cream">
                  <Check size={18} color="var(--gold)" /> Contact Form + WhatsApp Button
                </li>
                <li className="flex items-center gap-[0.6rem] text-cream">
                  <Check size={18} color="var(--gold)" /> 2 Iterative Revision Rounds
                </li>
              </ul>
            </div>
            <Link
              href="/contact?plan=Growth"
              className="growth-btn-primary bg-[linear-gradient(135deg,var(--gold)_0%,#d49500_100%)] text-[#08090d] font-bold inline-flex items-center justify-center gap-2 no-underline w-full"
            >
              Select Growth Plan <ArrowRight size={16} />
            </Link>
          </div>

          {/* CARD 3 - PRO */}
          <div className="pricing-card flex flex-col justify-between">
            <div>
              <span className="text-[0.85rem] font-bold tracking-[0.05em] text-mist">
                PRO
              </span>
              <div className="mt-4 mb-6">
                <span className="text-5xl font-extrabold text-cream">$600</span>
                <span className="text-mist text-[0.95rem]"> + ${getMonthlyRate(60)}/mo hosting</span>
              </div>
              <ul className="list-none flex flex-col gap-[0.8rem] mb-8">
                <li className="flex items-center gap-[0.6rem] text-mist">
                  <Check size={18} color="var(--flame)" /> Unlimited Custom Pages
                </li>
                <li className="flex items-center gap-[0.6rem] text-mist">
                  <Check size={18} color="var(--flame)" /> E-commerce & Payments Ready
                </li>
                <li className="flex items-center gap-[0.6rem] text-mist">
                  <Check size={18} color="var(--flame)" /> Priority 24/7 Support
                </li>
                <li className="flex items-center gap-[0.6rem] text-mist">
                  <Check size={18} color="var(--flame)" /> Unlimited Edits & Updates
                </li>
              </ul>
            </div>
            <Link href="/contact?plan=Pro" className="admin-btn-secondary w-full text-center">
              Select Pro Plan
            </Link>
          </div>

          {/* CARD 4 - ENTERPRISE (Wraps to Row 2 automatically) */}
          <div className="pricing-card flex flex-col justify-between">
            <div>
              <span className="text-[0.85rem] font-bold tracking-[0.05em] text-mist">
                ENTERPRISE
              </span>
              <div className="mt-4 mb-6">
                <span className="text-5xl font-extrabold text-cream">Custom</span>
                <span className="text-mist text-[0.95rem]"> Tailored plan</span>
              </div>
              <ul className="list-none flex flex-col gap-[0.8rem] mb-8">
                <li className="flex items-center gap-[0.6rem] text-mist">
                  <Check size={18} color="var(--flame)" /> Multi-location Architecture
                </li>
                <li className="flex items-center gap-[0.6rem] text-mist">
                  <Check size={18} color="var(--flame)" /> Custom API & Backend Integration
                </li>
                <li className="flex items-center gap-[0.6rem] text-mist">
                  <Check size={18} color="var(--flame)" /> Dedicated Account Manager
                </li>
                <li className="flex items-center gap-[0.6rem] text-mist">
                  <Check size={18} color="var(--flame)" /> White-label Agency Option
                </li>
              </ul>
            </div>
            <Link href="/contact?plan=Enterprise" className="admin-btn-secondary w-full text-center">
              Contact Sales
            </Link>
          </div>
        </div>
        {/* Interactive Custom Quote Calculator */}
        <div
          className="glass-card bg-[#111111] border border-[rgba(255,77,28,0.3)] px-8 py-10"
        >
          <div className="flex items-center gap-3 mb-6">
            <Calculator size={24} color="var(--flame)" />
            <h3 className="text-2xl font-bold">
              Interactive <span className="gradient-text-flame">Quote Builder</span>
            </h3>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-10 items-center">
            {/* Options Form */}
            <div className="flex flex-col gap-6">
              <div>
                <label className="block text-[0.95rem] font-semibold mb-2 text-cream">
                  Number of Pages: <span className="text-flame font-bold">{pages} Pages</span>
                </label>
                <input
                  type="range"
                  min="3"
                  max="20"
                  value={pages}
                  onChange={(e) => setPages(parseInt(e.target.value))}
                  className="w-full cursor-pointer accent-flame"
                />
              </div>

              <div className="flex flex-col gap-[0.8rem]">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasEcommerce}
                    onChange={(e) => setHasEcommerce(e.target.checked)}
                    className="w-[18px] h-[18px] accent-flame"
                  />
                  <span>E-Commerce / Online Store (+ $150 upfront, + $15/mo)</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasBooking}
                    onChange={(e) => setHasBooking(e.target.checked)}
                    className="w-[18px] h-[18px] accent-flame"
                  />
                  <span>Booking & Appointment Calendar (+ $50 upfront, + $5/mo)</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={expressDelivery}
                    onChange={(e) => setExpressDelivery(e.target.checked)}
                    className="w-[18px] h-[18px] accent-gold"
                  />
                  <span className="text-gold font-semibold">Express 3-Day Delivery (+ $100 upfront)</span>
                </label>
              </div>
            </div>

            {/* Price Output */}
            <div
              className="bg-ink p-8 rounded-xl border border-white/10 text-center"
            >
              <p className="text-mist text-[0.9rem] mb-2">Estimated Instant Quote</p>
              <div className="mb-4">
                <span className="text-5xl font-extrabold text-cream">
                  ${customEstimate.setup}
                </span>
                <span className="text-lg text-flame font-semibold"> upfront</span>
              </div>
              <p className="text-mist text-[0.95rem] mb-6">
                + <strong className="text-gold">${customEstimate.monthly}/mo</strong> hosting & ongoing updates
              </p>
              <Link
                href={`/contact?customQuote=true&pages=${pages}&setup=${customEstimate.setup}&monthly=${customEstimate.monthly}`}
                className="btn-primary w-full"
              >
                Claim This Quote Now <ArrowLeftCircleIcon size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
