import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Layout,
  Server,
  Palette,
  Layers,
  Star,
  CheckCircle,
  ChartBarIcon,
  MessageSquare,
} from "lucide-react";
import StatsCounter from "@/components/StatsCounter";
import PricingCalculator from "@/components/PricingCalculator";
import PortfolioGallery from "@/components/PortfolioGallery";
import TestimonialsPage from "@/components/TestimonialsPage";
import logo from "@/public/images/logo/brandmeIcon-logo.svg";
import Image from "next/image";
import React from "react";

export default function HomePage() {
  const WORKFLOW_STEPS = [
    {
      stepNumber: '01',
      title: 'Affordable, Fixed Pricing',
      titleClass: 'text-flame',
      description:
        'Starting at $150 setup + small monthly fee. No agency markups, no hidden charges. SME-friendly pricing that scales seamlessly with your growth.',
    },
    {
      stepNumber: '02',
      title: 'Done-For-You Service',
      titleClass: 'text-gold',
      description:
        'Simply fill out a 5-minute intake brief. Our expert engineering team builds your entire website, organizes copy, and designs high-quality visuals.',
    },
    {
      stepNumber: '03',
      title: '7-Day Guaranteed Launch',
      titleClass: 'text-flame',
      description:
        'While traditional agencies take months, BrandME delivers your live website in 7 days, giving your business immediate online credibility and sales momentum.',
    },
  ];
  return (
    <>
      {/* HERO SECTION  IS HERE*/}
      <section className="hero-section">
        {/* Background Glowing Ambient Orbs */}
        <div className="shape hero-glow-1"></div>
        <div className="hero-glow-2"></div>

        {/* Decorative Floating Geometric Shapes */}
        <div className="hero-shape-ring"></div>
        <div className="hero-shape-square"></div>

        {/* Floating Glassmorphic Badges */}
        <div className="hero-floating-card card-left">
          <MessageSquare size={16} color="var(--gold)" />
          <span>Expert support whenever you need it</span>
        </div>

        <div className="hero-floating-card card-right">
          <CheckCircle size={16} color="#ff4d1c" />
          <span>Quality design and fast delivery</span>
        </div>

        <div className="hero-container mx-auto max-w-[1200px] px-5">
          <div className="inline-block mb-4">
            <span className="badge">
              <Image src={logo} alt="logo" width={20} height={20} />{" "}
            </span>
          </div>

          <h1 className="hero-title">
            YOUR <span className="title">BRAND</span>,<br />
            YOUR WEB.
          </h1>

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

      {/* SERVICES SECTION IS HERE */}
      <section id="services" className="py-24">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="section-header">
            <h2 className="section-title">
              What We <span className="gradient-text-flame">Offer</span>
            </h2>
            <p className="section-desc">
              Everything your business needs to launch, grow, and convert
              visitors online.
            </p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
            <div className="glass-card">
              <div className="w-12 h-12 rounded-xl bg-[rgba(255,77,28,0.1)] flex items-center justify-center mb-5 text-flame">
                <Layout size={24} />
              </div>
              <h3 className="text-xl font-bold mb-[0.6rem] text-cream">
                Web Design & Development
              </h3>
              <p className="text-mist text-[0.95rem] leading-[1.6]">
                We design and develop clean, ultra-fast, and responsive websites
                tailored specifically to your brand identity and target
                audience. Delivered in 7 days or less.
              </p>
            </div>

            <div className="glass-card">
              <div className="w-12 h-12 rounded-xl bg-[rgba(255,184,0,0.1)] flex items-center justify-center mb-5 text-gold">
                <Server size={24} />
              </div>
              <h3 className="text-xl font-bold mb-[0.6rem] text-cream">
                Rapid Deployment
              </h3>
              <p className="text-mist text-[0.95rem] leading-[1.6]">
                Instant deployment on high-availability global cloud
                infrastructure with free SSL encryption, fast CDN caching, and
                custom domain configuration.
              </p>
            </div>

            <div className="glass-card">
              <div className="w-12 h-12 rounded-xl bg-[rgba(255,77,28,0.1)] flex items-center justify-center mb-5 text-flame">
                <Palette size={24} />
              </div>
              <h3 className="text-xl font-bold mb-[0.6rem] text-cream">
                Product & Brand Design
              </h3>
              <p className="text-mist text-[0.95rem] leading-[1.6]">
                We elevate your brand visuals with cohesive typography, modern
                color themes, logo optimization, and high-impact digital assets.
              </p>
            </div>

            <div className="glass-card">
              <div className="w-12 h-12 rounded-xl bg-[rgba(255,184,0,0.1)] flex items-center justify-center mb-5 text-gold">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-bold mb-[0.6rem] text-cream">
                Monthly Hosting & Care
              </h3>
              <p className="text-mist text-[0.95rem] leading-[1.6]">
                After launch, stay stress-free. We handle ongoing hosting, daily
                backups, continuous edit requests, and security maintenance for
                a small flat monthly fee.
              </p>
            </div>

            <div className="glass-card">
              <div className="w-12 h-12 rounded-xl bg-[rgba(255,77,28,0.1)] flex items-center justify-center mb-5 text-flame">
                <Layers size={24} />
              </div>
              <h3 className="text-xl font-bold mb-[0.6rem] text-cream">
                SEO & Performance Tuning
              </h3>
              <p className="text-mist text-[0.95rem] leading-[1.6]">
                Built-in search engine optimization, fast load speeds, meta tag
                structures, and mobile responsiveness to maximize Google search
                rankings.
              </p>
            </div>

            <div className="glass-card">
              <div className="w-12 h-12 rounded-xl bg-[rgba(255,184,0,0.1)] flex items-center justify-center mb-5 text-gold">
                <MessageSquare size={24} />
              </div>
              <h3 className="text-xl font-bold mb-[0.6rem] text-cream">
                Direct Customer Intake
              </h3>
              <p className="text-mist text-[0.95rem] leading-[1.6]">
                Integrated lead generation forms, direct WhatsApp chat widgets,
                and booking scheduling links that convert visitors directly into
                paying clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS IS HERE */}
      <section className="py-24 bg-white/[0.015]">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="section-header">
            <h2 className="section-title">
              How <span className="gradient-text-gold">BrandME</span> Works
            </h2>
            <p className="section-desc">
              Zero coding or technical knowledge required from you. We do 100%
              of the heavy lifting.
            </p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8">
            {WORKFLOW_STEPS.map((step, index) => {
              const stepNumber = String(index + 1).padStart(2, "0");

              return (
                <div key={stepNumber} className="glass-card flex flex-col p-8">
                  {/* Header row: Title on the left, number on the right without overlapping */}
                  <div className="flex justify-between items-start gap-4 mb-4">
                  <h3
                    className={`text-xl font-bold leading-[1.3] m-0 ${step.titleClass}`}
                  >
                    {step.title}
                  </h3>
                    <span className="text-3xl font-extrabold leading-none select-none text-white/15">
                      {stepNumber}
                    </span>
                  </div>

                  <p className="text-mist text-[0.95rem] leading-[1.6] m-0">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <StatsCounter />

      {/* PRICING SECTION */}
      <PricingCalculator />

      {/* PORTFOLIO SECTION */}
      <PortfolioGallery />

      {/* Testimonial SECTION */}
      <TestimonialsPage />

      {/* CTA BANNER */}
      <section className="pt-16 pb-24">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="glass-card bg-[linear-gradient(135deg,rgba(255,77,28,0.15)_0%,rgba(255,184,0,0.1)_100%)] border border-[rgba(255,77,28,0.3)] text-center px-8 py-16">
            <h2 className="text-[clamp(1.8rem,4vw,2.4rem)] font-bold mb-4">
              Ready to go live in{" "}
              <span className="gradient-text-gold">7 Days</span>?
            </h2>
            <p className="text-mist text-xl max-w-[600px] mx-auto mb-10">
              Tell us about your business and we will build a powerful website
              you will be proud to share with the world.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link href="/contact" className="btn-primary">
                Start Your Project <ArrowRight size={18} />
              </Link>
              <a
                href="https://wa.me/2349169370962?text=Hi%20I%20need%20a%20Website"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary btn-whatsapp"
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
