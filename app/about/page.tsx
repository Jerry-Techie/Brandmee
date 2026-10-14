'use client';

import Link from 'next/link';
import { ArrowRight, Target, HeartHandshake, ShieldCheck } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import StatsCounter from '@/components/StatsCounter';

const PROBLEM_SOLVE = [
  {
    icon: Target,
    iconColor: 'text-flame',
    iconBg: 'bg-[rgba(255,77,28,0.15)]',
    title: 'The problem we solve',
    text: 'Small business owners are stuck between overpriced agencies that take months, unreliable freelancers with no accountability, and DIY builders that need skills they don\'t have.',
  },
  {
    icon: HeartHandshake,
    iconColor: 'text-gold',
    iconBg: 'bg-[rgba(255,184,0,0.15)]',
    title: 'The BrandME promise',
    text: 'Submit a brief, we handle the rest. Your site goes live in 7 days with zero technical work on your end.',
  },
  {
    icon: ShieldCheck,
    iconColor: 'text-flame',
    iconBg: 'bg-[rgba(255,77,28,0.15)]',
    title: 'Long-term peace of mind',
    text: 'One monthly plan keeps your site secure, updated, backed up, and optimized — so you can focus on growing your business.',
  },
];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.1 },
  }),
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export default function AboutPage() {
  return (
    <>
      {/* HERO / KICKER */}
      <motion.section
        className="pt-28 pb-16"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="mx-auto max-w-[1200px] px-5">
          <motion.div
            className="flex items-center gap-3 mb-5"
            custom={0}
            variants={fadeInUp}
          >
            <span className="h-px w-10 bg-flame" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-flame">
              Our story
            </span>
          </motion.div>

          <motion.h1
            className="font-syne text-[clamp(2.2rem,5vw,4rem)] font-extrabold text-cream leading-[1.15] mb-6"
            custom={1}
            variants={fadeInUp}
          >
            Your brand. Your web. <span className="title">Delivered in 7 days.</span>
          </motion.h1>

          <motion.p
            className="text-lg text-mist max-w-2xl leading-relaxed"
            custom={2}
            variants={fadeInUp}
          >
            At BrandME, we help small businesses and emerging brands get a professional
            website — fast and affordable. No agency markups. No freelancer drama.
            Just a clean, high-converting site built while you run your business.
          </motion.p>

          <motion.div
            className="mt-10 flex gap-4"
            custom={3}
            variants={fadeInUp}
          >
            <Link href="/contact" className="btn-primary">
              Start your project <ArrowRight size={18} />
            </Link>
            <Link href="/pricing" className="btn-secondary">
              See pricing
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* CORE VALUES / CARDS */}
      <motion.section
        className="py-20 lg:py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="mx-auto max-w-[1200px] px-5">
          <motion.div
            className="flex items-center gap-3 mb-5"
            custom={0}
            variants={fadeInUp}
          >
            <span className="h-px w-10 bg-gold" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Why BrandME
            </span>
          </motion.div>

          <motion.h2
            className="font-syne text-[clamp(1.8rem,4vw,2.4rem)] font-bold text-cream mb-12 max-w-2xl"
            custom={1}
            variants={fadeInUp}
          >
            The difference is in the details
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROBLEM_SOLVE.map((item, idx) => (
              <motion.div
                key={idx}
                className="glass-card bg-[#111111]! border-[#262626]! p-8"
                custom={idx + 2}
                variants={fadeInUp}
                whileHover={{ y: -4, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' }}
              >
                <div
                  className={`w-11 rounded-lg flex items-center justify-center mb-5`}
                >
                </div>
                <h3 className="font-syne text-xl font-bold text-cream mb-3">
                  {item.title}
                </h3>
                <p className="text-mist text-[0.95rem] leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* COMPARISON MATRIX */}
      <motion.section
        className="py-20 lg:py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="mx-auto max-w-[1200px] px-5">
          <motion.div
            className="flex items-center gap-3 mb-5"
            custom={0}
            variants={fadeInUp}
          >
            <span className="h-px w-10 bg-flame" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-flame">
              The comparison
            </span>
          </motion.div>
          <motion.h2
            className="font-syne text-[clamp(1.8rem,4vw,2.4rem)] font-bold text-cream mb-12 max-w-2xl"
            custom={1}
            variants={fadeInUp}
          >
            Why choose <span className="title">BrandME</span>?
          </motion.h2>

          <motion.div
            className="overflow-x-auto rounded-xl border border-[#262626]"
            custom={2}
            variants={fadeInUp}
          >
            {/* <motion.table
              className="w-full border-collapse min-w-[560px]"
              initial="hide"
              animate="show"
              variants={{
                hide: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.04, delayChildren: 0.3 },
                },
              }}
            >
              <thead>
                <motion.tr
                  variants={{
                    hide: { opacity: 0, y: -10 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  <th className="p-4 text-left text-sm font-bold text-mist uppercase tracking-[0.05em]">
                    Feature
                  </th>
                  <th className="p-4 text-center text-sm font-bold text-flame uppercase tracking-[0.05em]">
                    BrandME
                  </th>
                  <th className="p-4 text-center text-sm font-semibold text-mist uppercase tracking-[0.05em]">
                    Freelancers
                  </th>
                  <th className="p-4 text-center text-sm font-semibold text-mist uppercase tracking-[0.05em]">
                    Agencies
                  </th>
                  <th className="p-4 text-center text-sm font-semibold text-mist uppercase tracking-[0.05em]">
                    DIY Builders
                  </th>
                </motion.tr>
              </thead>
              <tbody>
                {[
                  ['Turnaround', '7 Days', '3–8 Weeks', '2–4 Months', 'You DIY'],
                  ['Upfront Cost', '$150', '$500–$2,000', '$3K–$10K+', '$20–$50/mo'],
                  ['Skills Needed', 'Zero', 'None', 'None', 'High learning curve'],
                  ['Ongoing Maintenance', 'Done-for-you', 'Uncertain', 'Retainer fees', 'You DIY'],
                ].map((row, rIdx) => (
                  <motion.tr
                    key={rIdx}
                    className="border-b border-[#262626]"
                    variants={{
                      hide: { opacity: 0, x: -20 },
                      show: { opacity: 1, x: 0 },
                    }}
                  >
                    {row.map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        className={
                          cIdx === 0
                            ? 'py-4 px-4 font-medium text-cream'
                            : cIdx === 1
                            ? 'py-4 px-4 text-center text-gold font-bold'
                            : 'py-4 px-4 text-center text-mist'
                        }
                      >
                        {cell}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </motion.table> */}
          </motion.div>
        </div>
      </motion.section>

      <StatsCounter />
    </>
  );
}
