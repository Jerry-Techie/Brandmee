'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, ArrowRight, Calculator, ArrowLeftCircleIcon } from 'lucide-react';

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

  const toggleBtn = (active: boolean) =>
    `py-2.5 px-5 rounded-md font-semibold text-[0.9rem] transition-colors duration-200 ${
      active
        ? 'bg-flame text-white'
        : 'bg-white/5 text-mist hover:bg-white/10 hover:text-cream'
    }`;

  return (
    <section id="pricing" className="py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5">
        {/* Left-aligned section header */}
        <div className="max-w-2xl mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-flame" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-flame">
              Pricing
            </span>
          </div>
          <h2 className="font-syne text-3xl md:text-4xl font-bold text-cream leading-[1.2] mb-4">
            Simple, affordable <span className="gradient-text-flame">pricing</span>
          </h2>
          <p className="text-mist text-base leading-relaxed">
            No hidden setup fees. Pick a package or customize a plan built specifically for your brand.
          </p>

          {/* Billing Toggle — segmented control */}
          <div className="mt-6">
            <div
              className="inline-flex flex-wrap items-center gap-1 bg-black border border-white/10 rounded-md p-1"
              role="group"
              aria-label="Billing cycle"
            >
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                aria-pressed={billingCycle === 'monthly'}
                className={toggleBtn(billingCycle === 'monthly')}
              >
                Monthly Hosting
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('annual')}
                aria-pressed={billingCycle === 'annual'}
                className={`${toggleBtn(billingCycle === 'annual')} flex items-center gap-2`}
              >
                Annual Hosting
                <span className="text-[0.65rem] font-bold uppercase tracking-wide bg-[#08090d] text-[#ffb800] px-2 py-0.5 rounded-full">
                  15% OFF
                </span>
              </button>
            </div>
            {billingCycle === 'annual' && (
              <p className="text-mist text-xs mt-3">
                Annual billing selected — 15% discount applied to every monthly hosting rate below.
              </p>
            )}
          </div>
        </div>

        {/* Pricing Cards — 3 per row */}
        <div className="pricing-grid">
          {/* CARD 1 — STARTER */}
          <div className="pricing-card p-7 flex flex-col">
            <span className="text-xs font-bold tracking-[0.15em] text-mist mb-6">
              STARTER
            </span>
            <div className="mb-6">
              <span className="font-syne text-5xl font-extrabold text-cream">$150</span>
              <span className="block text-mist text-sm mt-1.5">
                + ${getMonthlyRate(20)}/mo hosting
              </span>
            </div>
            <ul className="list-none flex flex-col gap-3 mb-8 text-sm">
              <li className="flex items-center gap-2.5 text-mist">
                <Check size={16} color="var(--flame)" /> 4-Page Custom Website
              </li>
              <li className="flex items-center gap-2.5 text-mist">
                <Check size={16} color="var(--flame)" /> Mobile Responsive Design
              </li>
              <li className="flex items-center gap-2.5 text-mist">
                <Check size={16} color="var(--flame)" /> Contact Form Integration
              </li>
              <li className="flex items-center gap-2.5 text-mist">
                <Check size={16} color="var(--flame)" /> Guaranteed 7-Day Delivery
              </li>
            </ul>
            <div className="mt-auto">
              <Link href="/contact?plan=Starter" className="admin-btn-secondary w-full">
                Get Started
              </Link>
            </div>
          </div>

          {/* CARD 2 — GROWTH */}
          <div className="pricing-card growth-plan p-7 flex flex-col relative">
            <div className="absolute top-4 right-4">
              <span className="badge badge-gold text-xs">
                RECOMMENDED
              </span>
            </div>
            <span className="text-xs font-bold tracking-[0.15em] text-gold mb-6">
              GROWTH
            </span>
            <div className="mb-6">
              <span className="font-syne text-5xl font-extrabold text-cream">$300</span>
              <span className="block text-[rgba(255,255,255,0.75)] text-sm mt-1.5">
                + ${getMonthlyRate(35)}/mo hosting
              </span>
            </div>
            <ul className="list-none flex flex-col gap-3 mb-8 text-sm">
              <li className="flex items-center gap-2.5 text-cream">
                <Check size={16} color="var(--gold)" /> 7-Page Custom Website
              </li>
              <li className="flex items-center gap-2.5 text-cream">
                <Check size={16} color="var(--gold)" /> Advanced SEO Optimization
              </li>
              <li className="flex items-center gap-2.5 text-cream">
                <Check size={16} color="var(--gold)" /> Booking & Scheduling Setup
              </li>
              <li className="flex items-center gap-2.5 text-cream">
                <Check size={16} color="var(--gold)" /> Contact Form + WhatsApp Button
              </li>
              <li className="flex items-center gap-2.5 text-cream">
                <Check size={16} color="var(--gold)" /> 2 Iterative Revision Rounds
              </li>
            </ul>
            <div className="mt-auto">
              <Link
                href="/contact?plan=Growth"
                className="growth-btn-primary no-underline"
              >
                Select Growth Plan <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* CARD 3 — PRO */}
          <div className="pricing-card p-7 flex flex-col">
            <span className="text-xs font-bold tracking-[0.15em] text-mist mb-6">
              PRO
            </span>
            <div className="mb-6">
              <span className="font-syne text-5xl font-extrabold text-cream">$600</span>
              <span className="block text-mist text-sm mt-1.5">
                + ${getMonthlyRate(60)}/mo hosting
              </span>
            </div>
            <ul className="list-none flex flex-col gap-3 mb-8 text-sm">
              <li className="flex items-center gap-2.5 text-mist">
                <Check size={16} color="var(--flame)" /> Unlimited Custom Pages
              </li>
              <li className="flex items-center gap-2.5 text-mist">
                <Check size={16} color="var(--flame)" /> E-commerce & Payments Ready
              </li>
              <li className="flex items-center gap-2.5 text-mist">
                <Check size={16} color="var(--flame)" /> Priority 24/7 Support
              </li>
              <li className="flex items-center gap-2.5 text-mist">
                <Check size={16} color="var(--flame)" /> Unlimited Edits & Updates
              </li>
            </ul>
            <div className="mt-auto">
              <Link href="/contact?plan=Pro" className="admin-btn-secondary w-full">
                Select Pro Plan
              </Link>
            </div>
          </div>

          {/* CARD 4 — ENTERPRISE (full-width banner row) */}
          <div className="pricing-card p-7 lg:col-span-3 flex flex-col md:flex-row md:items-center gap-8">
            <div className="md:w-60 shrink-0">
              <span className="text-xs font-bold tracking-[0.15em] text-mist">
                ENTERPRISE
              </span>
              <div className="font-syne text-4xl font-extrabold text-cream mt-2">
                Custom
              </div>
              <span className="text-mist text-sm">Tailored plan</span>
            </div>
            <ul className="list-none flex flex-col sm:flex-row sm:flex-wrap gap-x-8 gap-y-2.5 flex-1 text-sm">
              <li className="flex items-center gap-2.5 text-mist">
                <Check size={16} color="var(--flame)" /> Multi-location Architecture
              </li>
              <li className="flex items-center gap-2.5 text-mist">
                <Check size={16} color="var(--flame)" /> Custom API & Backend Integration
              </li>
              <li className="flex items-center gap-2.5 text-mist">
                <Check size={16} color="var(--flame)" /> Dedicated Account Manager
              </li>
              <li className="flex items-center gap-2.5 text-mist">
                <Check size={16} color="var(--flame)" /> White-label Agency Option
              </li>
            </ul>
            <Link href="/contact?plan=Enterprise" className="admin-btn-secondary md:w-auto whitespace-nowrap">
              Contact Sales
            </Link>
          </div>
        </div>

        {/* Interactive Custom Quote Calculator — split layout */}
        <div
          className="glass-card bg-[#111111] border border-[rgba(255,77,28,0.3)] p-8 lg:p-10"
        >
          <div className="flex items-center gap-3 mb-8">
            <Calculator size={24} color="var(--flame)" />
            <h3 className="text-2xl font-bold">
              Interactive <span className="gradient-text-flame">Quote Builder</span>
            </h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
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
              className="bg-ink p-6 rounded-xl border border-white/10 text-left lg:sticky lg:top-28"
            >
              <p className="text-mist text-[0.9rem] mb-2">Estimated Instant Quote</p>
              <div className="mb-4">
                <span className="font-syne text-5xl font-extrabold text-cream">
                  ${customEstimate.setup}
                </span>
                <span className="text-lg text-flame font-semibold"> upfront</span>
              </div>
              <p className="text-mist text-[0.95rem] mb-6">
                + <strong className="text-gold">${customEstimate.monthly}/mo</strong> hosting & ongoing updates
              </p>
              <Link
                href={`/contact?customQuote=true&pages=${pages}&setup=${customEstimate.setup}&monthly=${customEstimate.monthly}`}
                className="btn-primary w-full lg:w-auto"
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
