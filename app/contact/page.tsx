'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MessageSquare, Mail, Clock, Send, CheckCircle2, Sparkles } from 'lucide-react';
import FaqAccordion from '@/components/FaqAccordion';

function ContactFormInner() {
  const searchParams = useSearchParams();
  const [selectedPlan, setSelectedPlan] = useState<string>('Growth');

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [useGoogleForm, setUseGoogleForm] = useState(false);

  useEffect(() => {
    const plan = searchParams.get('plan');
    if (plan) {
      setSelectedPlan(plan);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && phone) {
      setSubmitted(true);
      const text = encodeURIComponent(
        `Hi BrandME! I'd like to start a project.\nName: ${name}\nBusiness: ${businessName}\nPlan: ${selectedPlan}\nPhone: ${phone}\nEmail: ${email}\nNotes: ${message}`
      );
      setTimeout(() => {
        window.open(`https://wa.me/2349169370962?text=${text}`, '_blank');
      }, 1200);
    }
  };

  return (
    <div className="glass-card p-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-cream">
            Project Intake Form
          </h3>
          <p className="text-mist text-[0.9rem]">Takes less than 3 minutes to submit.</p>
        </div>
        <button
          onClick={() => setUseGoogleForm(!useGoogleForm)}
          className="text-sm text-gold underline bg-transparent border-0 cursor-pointer"
        >
          {useGoogleForm ? 'Use Interactive Form' : 'Use Google Form'}
        </button>
      </div>

      {submitted ? (
        <div
          className="text-center py-12 px-6 bg-[rgba(34,197,94,0.05)] rounded-xl border border-[rgba(34,197,94,0.3)]"
        >
          <CheckCircle2 size={48} color="#22c55e" className="mx-auto mb-4" />
          <h4 className="text-2xl font-bold mb-2">
            Brief Submitted Successfully!
          </h4>
          <p className="text-mist text-[0.95rem] mb-6">
            Redirecting you to WhatsApp to confirm your project brief with our design lead...
          </p>
          <button onClick={() => setSubmitted(false)} className="btn-secondary text-sm">
            Submit Another Inquiry
          </button>
        </div>
      ) : useGoogleForm ? (
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSciWKynTlFoTq9rDPHD7LN9vEl2Fn1aQjgi77UhcsGnLtRh5Q/viewform?embedded=true"
          width="100%"
          height="550"
          className="border-0 rounded-xl"
        >
          Loading intake form…
        </iframe>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-[0.9rem] font-semibold mb-1">
              Your Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full py-4 px-4 rounded-xl bg-ink border border-white/10 text-cream outline-none"
            />
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-4">
            <div>
              <label className="block text-[0.9rem] font-semibold mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-4 px-4 rounded-xl bg-ink border border-white/10 text-cream outline-none"
              />
            </div>
            <div>
              <label className="block text-[0.9rem] font-semibold mb-1">
                WhatsApp Number *
              </label>
              <input
                type="tel"
                required
                placeholder="+234..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full py-4 px-4 rounded-xl bg-ink border border-white/10 text-cream outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-4">
            <div>
              <label className="block text-[0.9rem] font-semibold mb-1">
                Business / Brand Name
              </label>
              <input
                type="text"
                placeholder="e.g. Okeme Solar"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full py-4 px-4 rounded-xl bg-ink border border-white/10 text-cream outline-none"
              />
            </div>
            <div>
              <label className="block text-[0.9rem] font-semibold mb-1">
                Preferred Package
              </label>
              <select
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="w-full py-4 px-4 rounded-xl bg-ink border border-white/10 text-cream outline-none"
              >
                <option value="Starter">Starter ($150)</option>
                <option value="Growth">Growth ($300 - Recommended)</option>
                <option value="Pro">Pro ($600)</option>
                <option value="Enterprise">Enterprise (Custom)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[0.9rem] font-semibold mb-1">
              Tell us about your project or business goals
            </label>
            <textarea
              rows={4}
              placeholder="Describe what services you offer, pages you need, or special features..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full py-4 px-4 rounded-xl bg-ink border border-white/10 text-cream outline-none font-[inherit]"
            />
          </div>

          <button type="submit" className="btn-primary py-[0.9rem] w-full">
            Submit Brief & Chat <Send size={16} />
          </button>
        </form>
      )}
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <section className="hero-section pt-20 pb-12">
        <div className="mx-auto max-w-[1200px] px-5">
          <span className="badge badge-gold mb-4">
            Let&apos;s Talk
          </span>
          <h1 className="hero-title">
            Start Your Project <span className="gradient-text-gold">Today</span>
          </h1>
          <p className="hero-subtitle">
            Fill out the quick intake form below or reach out to us directly via WhatsApp. We respond within 24 hours!
          </p>
        </div>
      </section>

      <section className="pt-8 pb-24">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-12 mb-24">
            {/* Left: Contact Form wrapped in Suspense */}
            <Suspense fallback={<div className="glass-card p-12 text-center">Loading form...</div>}>
              <ContactFormInner />
            </Suspense>

            {/* Right: Direct Reach Out */}
            <div className="flex flex-col gap-6">
              <div className="glass-card flex gap-5 items-start">
                <div
                  className="w-12 h-12 rounded-full bg-[rgba(37,211,102,0.1)] text-[#25D366] flex items-center justify-center shrink-0"
                >
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h4 className="text-[1.1rem] font-bold mb-[0.2rem]">WhatsApp Direct</h4>
                  <p className="text-mist text-sm mb-[0.6rem]">
                    Chat directly with our team for instant replies.
                  </p>
                  <a
                    href="https://wa.me/2349169370962?text=Hi%20i%20want%20to%20get%20a%20website"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#25D366] font-bold text-[1.05rem]"
                  >
                    +234 916 937 0962
                  </a>
                </div>
              </div>

              <div className="glass-card flex gap-5 items-start">
                <div
                  className="w-12 h-12 rounded-full bg-[rgba(255,77,28,0.1)] text-flame flex items-center justify-center shrink-0"
                >
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-[1.1rem] font-bold mb-[0.2rem]">Email Us</h4>
                  <p className="text-mist text-sm mb-[0.6rem]">
                    Send us your project specifications or questions.
                  </p>
                  <a href="mailto:brandmenigeria01@gmail.com" className="text-flame font-bold text-[1.05rem]">
                    brandmenigeria01@gmail.com
                  </a>
                </div>
              </div>

              <div className="glass-card flex gap-5 items-start">
                <div
                  className="w-12 h-12 rounded-full bg-[rgba(255,184,0,0.1)] text-gold flex items-center justify-center shrink-0"
                >
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="text-[1.1rem] font-bold mb-[0.2rem]">Guaranteed Turnaround</h4>
                  <p className="text-mist text-sm">
                    Intake brief review within 24 hours. Full website launch in 7 calendar days.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <FaqAccordion />
        </div>
      </section>
    </>
  );
}
