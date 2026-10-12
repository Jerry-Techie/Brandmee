import Link from 'next/link';
import { ArrowRight, Layout, Server, Palette, Layers, Shield, MessageSquare, CheckCircle } from 'lucide-react';
import StatsCounter from '@/components/StatsCounter';
import PortfolioGallery from '@/components/PortfolioGallery';
import TestimonialsPage from '@/components/TestimonialsPage';
import logo from '@/public/images/logo/brandmeIcon-logo.svg';
import Image from 'next/image';
import React from 'react';

const SERVICES = [
  {
    icon: Layout,
    title: 'Web Design & Development',
    description: 'Clean, ultra-fast, responsive sites delivered in 7 days or less.',
  },
  {
    icon: Server,
    title: 'Rapid Deployment',
    description: 'Global cloud infrastructure, free SSL, CDN caching, custom domains.',
  },
  {
    icon: Palette,
    title: 'Product & Brand Design',
    description: 'Cohesive typography, color themes, and high-impact digital assets.',
  },
  {
    icon: Shield,
    title: 'Monthly Hosting & Care',
    description: 'Hosting, daily backups, continuous edits, and security maintenance.',
  },
  {
    icon: Layers,
    title: 'SEO & Performance Tuning',
    description: 'Built-in SEO, fast load speeds, and mobile responsiveness.',
  },
  {
    icon: MessageSquare,
    title: 'Direct Customer Intake',
    description: 'Lead forms, WhatsApp widgets, and booking links that convert.',
  },
];

const WORKFLOW_STEPS = [
  {
    stepNumber: '01',
    title: 'Affordable, Fixed Pricing',
    titleColor: 'var(--flame)',
    description:
      'Starting at $150 setup + small monthly fee. No agency markups, no hidden charges. SME-friendly pricing that scales seamlessly with your growth.',
  },
  {
    stepNumber: '02',
    title: 'Done-For-You Service',
    titleColor: 'var(--gold)',
    description:
      'Simply fill out a 5-minute intake brief. Our expert engineering team builds your entire website, organizes copy, and designs high-quality visuals.',
  },
  {
    stepNumber: '03',
    title: '7-Day Guaranteed Launch',
    titleColor: 'var(--flame)',
    description:
      'While traditional agencies take months, BrandME delivers your live website in 7 days, giving your business immediate online credibility and sales momentum.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="hero-section">
        {/* Background Glowing Ambient Orbs */}
        <div className="shape hero-glow-1"></div>
        <div className="hero-glow-2"></div>

        {/* Decorative Floating Geometric Shapes */}
        <div className="hero-shape-ring"></div>
        <div className="hero-shape-square"></div>

        {/* Floating Glassmorphic Badges */}
        <div className="hero-floating-card card-left text-mist">
          <MessageSquare size={16} color="var(--gold)" />
          <span>Expert support whenever you need it</span>
        </div>

        <div className="hero-floating-card card-right text-mist">
          <span>Quality design and fast delivery</span>
        </div>

        <div className="hero-container mx-auto max-w-[1200px] px-5">
          <div className="inline-flex items-center gap-3 mb-8">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-mist">
              Your Web, Your Design
            </span>
          </div>

          <h1 className="hero-title">
            YOUR <span className="title">BRAND</span>,<br />
            YOUR WEB.
          </h1>

          <p className="hero-subtitle">
            A done-for-you web design platform built for SMEs, businesses, and
            emerging brands who deserve a high-converting, professional online
            presence without high agency costs.
          </p>

          <div className="hero-ctas">
            <Link href="/contact" className="btn-primary">
              Get Started <ArrowRight size={18} />
            </Link>
            <Link href="#portfolio" className="btn-secondary">
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES — SPLIT SCREEN */}
      <section id="services" className="py-20 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left: sticky intro */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 self-start">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-flame" />
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-flame">
                  Capabilities
                </span>
              </div>
              <h2 className="font-syne text-3xl md:text-4xl font-bold text-cream leading-[1.2] mb-5">
                Everything you need to launch, grow, and convert.
              </h2>
              <p className="text-mist text-base leading-relaxed mb-6 max-w-md">
                One partner for your entire web presence — from the first brief
                to the final launch, and every edit after it.
              </p>
              <Link href="/contact" className="btn-secondary">
                Talk to our team <ArrowRight size={16} />
              </Link>
            </div>

            {/* Right: compact hairline service grid */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-px bg-white/10 border border-white/10">
              {SERVICES.map((service, idx) => (
                <div
                  key={service.title}
                  className="group bg-ink p-7 hover:bg-[#141414] transition-colors duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <service.icon size={20} className="text-flame" />
                    <span className="font-syne text-xs font-bold text-mist">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-cream mb-1.5">
                    {service.title}
                  </h3>
                  <p className="text-mist text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — NATURAL TIMELINE */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-gold" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              The process
            </span>
          </div>
          <h2 className="font-syne text-3xl md:text-4xl font-bold text-cream leading-[1.2] mb-12 max-w-2xl">
            How <span className="gradient-text-gold">BrandME</span> works
          </h2>

          <div className="max-w-3xl">
            <div className="relative border-l border-white/10">
              {WORKFLOW_STEPS.map((step) => (
                <div
                  key={step.stepNumber}
                  className="relative pl-8 md:pl-12 pb-12 last:pb-0"
                >
                  <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-flame" />
                  <span className="font-syne text-sm font-bold text-gold mb-2 block">
                    Step {step.stepNumber}
                  </span>
                  <h3
                    className="text-xl md:text-2xl font-bold mb-2.5"
                    style={{ color: step.titleColor }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-mist leading-relaxed max-w-xl">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <StatsCounter />

      {/* PRICING CTA — POINTS TO FULL PRICING PAGE */}
      <section className="relative py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="glass-card bg-[#111111] border border-white/10 p-8 lg:p-12 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-[16rem] h-[16rem] rounded-full bg-[radial-gradient(circle,rgba(255,77,28,0.14)_0%,transparent_70%)] blur-3xl pointer-events-none" />
            <div className="relative flex flex-col md:flex-row md:items-center gap-8 justify-between">
              <div className="max-w-xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-px w-10 bg-flame" />
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-flame">
                    Pricing
                  </span>
                </div>
                <h2 className="font-syne text-2xl md:text-3xl font-bold text-cream leading-tight mb-3">
                  Simple, affordable{" "}
                  <span className="gradient-text-flame">pricing</span>
                </h2>
                <p className="text-mist text-base leading-relaxed">
                  Plans from $150 setup plus a small monthly fee. No agency
                  markups, no hidden charges — pick a package or build a custom
                  quote for your brand.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 shrink-0">
                <Link href="/pricing" className="btn-primary">
                  See Pricing <ArrowRight size={18} />
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <PortfolioGallery />

      {/* TESTIMONIALS */}
      <TestimonialsPage />

      {/* CTA BANNER — LEFT ALIGNED, NO CARD */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-[22rem] h-[22rem] rounded-full bg-[radial-gradient(circle,rgba(255,77,28,0.16)_0%,transparent_70%)] blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-24 w-[20rem] h-[20rem] rounded-full bg-[radial-gradient(circle,rgba(255,184,0,0.1)_0%,transparent_70%)] blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-10 bg-flame" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-flame">
                Ready when you are
              </span>
            </div>
            <h2 className="font-syne text-3xl md:text-5xl font-bold text-cream leading-[1.1] mb-5">
              Ready to go live in{" "}
              <span className="gradient-text-gold">7 days</span>?
            </h2>
            <p className="text-mist text-lg leading-relaxed mb-8 max-w-xl">
              Tell us about your business and we will build a powerful website
              you will be proud to share with the world.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary">
                Start Your Project <ArrowRight size={18} />
              </Link>
              <a
                href="https://wa.me/2349169370962?text=Hi%20I%20need%20a%20Website"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <MessageSquare size={18} /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
