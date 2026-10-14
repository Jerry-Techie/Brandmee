'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, Variants } from 'framer-motion';
import { MessageSquare, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
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
    <motion.div
      className="glass-card p-10"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
      }}
    >
      <motion.div
        className="flex justify-between items-center mb-6"
        variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }}
      >
        <div>
          <h3 className="text-2xl font-bold text-cream">
            Project Intake Form
          </h3>
          <p className="text-mist text-[0.9rem]">Takes less than 3 minutes to submit.</p>
        </div>
        <motion.button
          onClick={() => setUseGoogleForm(!useGoogleForm)}
          className="text-sm text-gold underline bg-transparent border-0 cursor-pointer"
          whileTap={{ scale: 0.95 }}
        >
          {useGoogleForm ? 'Use Interactive Form' : 'Use Google Form'}
        </motion.button>
      </motion.div>

      {submitted ? (
        <motion.div
          className="text-center py-12 px-6 bg-[rgba(34,197,94,0.05)] rounded-xl border border-[rgba(34,197,94,0.3)]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <CheckCircle2 size={48} color="#22c55e" className="mx-auto mb-4" />
          <h4 className="text-2xl font-bold mb-2">
            Brief Submitted Successfully!
          </h4>
          <p className="text-mist text-[0.95rem] mb-6">
            Redirecting you to WhatsApp to confirm your project brief with our design lead...
          </p>
          <motion.button
            onClick={() => setSubmitted(false)}
            className="btn-secondary text-sm"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Submit Another Inquiry
          </motion.button>
        </motion.div>
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
          <motion.div
            className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
            }}
          >
            {[
              { label: 'Your Full Name *', name: 'name', type: 'text', placeholder: 'e.g. John Doe', value: name, onChange: setName, required: true },
              { label: 'Email Address *', name: 'email', type: 'email', placeholder: 'john@example.com', value: email, onChange: setEmail, required: true },
              { label: 'WhatsApp Number *', name: 'phone', type: 'tel', placeholder: '+234...', value: phone, onChange: setPhone, required: true },
              { label: 'Business / Brand Name', name: 'businessName', type: 'text', placeholder: 'e.g. Okeme Solar', value: businessName, onChange: setBusinessName, required: false },
            ].map((field, idx) => (
              <motion.div
                key={field.name}
                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              >
                <label className="block text-[0.9rem] font-semibold mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  required={field.required}
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="w-full py-4 px-4 rounded-xl bg-ink border border-white/10 text-cream outline-none"
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.4 }}
          >
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.5 }}
          >
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
          </motion.div>

          <motion.button
            type="submit"
            className="btn-primary py-[0.9rem] w-full"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Submit Brief & Chat <Send size={16} />
          </motion.button>
        </form>
      )}
    </motion.div>
  );
}

export default function ContactPage() {
  const contactItems = [
    {
      icon: MessageSquare,
      iconColor: 'text-[#25D366]',
      iconBg: 'bg-[rgba(37,211,102,0.1)]',
      title: 'WhatsApp Direct',
      desc: 'Chat directly with our team for instant replies.',
      action: (
        <a
          href="https://wa.me/2349169370962?text=Hi%20i%20want%20to%20get%20a%20website"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#25D366] font-bold text-[1.05rem]"
        >
          +234 916 937 0962
        </a>
      ),
    },
    {
      icon: Mail,
      iconColor: 'text-flame',
      iconBg: 'bg-[rgba(255,77,28,0.1)]',
      title: 'Email Us',
      desc: 'Send us your project specifications or questions.',
      action: (
        <a href="mailto:brandmenigeria01@gmail.com" className="text-flame font-bold text-[1.05rem]">
          brandmenigeria01@gmail.com
        </a>
      ),
    },
    {
      icon: Clock,
      iconColor: 'text-gold',
      iconBg: 'bg-[rgba(255,184,0,0.1)]',
      title: 'Guaranteed Turnaround',
      desc: 'Intake brief review within 24 hours. Full website launch in 7 calendar days.',
      action: null,
    },
  ];

  return (
    <>
      <motion.section
        className="hero-section pt-20 pb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="mx-auto max-w-[1200px] px-5">
                 <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Start Your Project <span className="gradient-text-gold">Today</span>
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            Fill out the quick intake form below or reach out to us directly via WhatsApp. We respond within 24 hours!
          </motion.p>
        </div>
      </motion.section>

      <section className="pt-8 pb-24">
        <div className="mx-auto max-w-[1200px] px-5">
          <motion.div
            className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-12 mb-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
            }}
          >
            {/* Left: Contact Form wrapped in Suspense */}
            <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
              <Suspense fallback={<div className="glass-card p-12 text-center">Loading form...</div>}>
                <ContactFormInner />
              </Suspense>
            </motion.div>

            {/* Right: Direct Reach Out */}
            <motion.div
              className="flex flex-col gap-6"
              variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}
            >
              {contactItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="glass-card flex gap-5 items-start"
                  whileHover={{ y: -4, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' }}
                  transition={{ duration: 0.2 }}
                >
                  <div>
                    <h4 className="text-[1.1rem] font-bold mb-[0.2rem]">{item.title}</h4>
                    <p className="text-mist text-sm mb-[0.6rem]">{item.desc}</p>
                    {item.action}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <FaqAccordion />
        </div>
      </section>
    </>
  );
}
