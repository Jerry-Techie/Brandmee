'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: 'How long does it take to deliver a full website?',
    answer: 'We deliver all standard website packages in 7 days or less from the date you complete our intake brief. Express 3-day delivery is also available as an add-on.',
  },
  {
    question: 'How much does BrandME cost?',
    answer: 'Packages start at $150 one-time setup + $20/month ongoing hosting & maintenance. We have zero hidden fees or agency markups.',
  },
  {
    question: 'Do I need technical skills or coding knowledge?',
    answer: 'None at all! BrandME is a done-for-you service. You simply answer a quick brief about your business, and our expert engineering team builds and deploys everything for you.',
  },
  {
    question: 'What is included in the monthly maintenance fee?',
    answer: 'Monthly maintenance covers high-performance cloud hosting, security SSL certificates, domain management, regular software updates, and ongoing edit requests so your site never breaks.',
  },
  {
    question: 'Can I request edits or revisions during the build?',
    answer: 'Yes! All plans come with revision rounds to ensure you are 100% satisfied with the outcome before final launch.',
  },
];

export default function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="max-w-[760px] mx-auto">
      <motion.div
        className="flex items-center gap-[0.6rem] justify-center mb-6"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <HelpCircle size={22} color="var(--gold)" />
        <h3 className="text-2xl font-bold">Frequently Asked Questions</h3>
      </motion.div>

      <div className="flex flex-col gap-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <motion.div
              key={idx}
              className="glass-card px-6 py-5 cursor-pointer"
              onClick={() => toggleFaq(idx)}
              whileHover={{ backgroundColor: 'rgba(255, 77, 28, 0.03)' }}
            >
              <div className="flex justify-between items-center gap-4">
                <motion.h4
                  className={`text-[1.05rem] font-semibold ${isOpen ? 'text-gold' : 'text-cream'}`}
                  animate={{ color: isOpen ? '#ffb800' : '#faf7f2' }}
                >
                  {faq.question}
                </motion.h4>
                <motion.div
                  className={`transition-transform duration-300 ${isOpen ? 'text-gold' : 'text-mist'}`}
                  animate={{ rotate: isOpen ? 180 : 0, color: isOpen ? '#ffb800' : '#9e9e9e' }}
                >
                  <ChevronDown size={20} />
                </motion.div>
              </div>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="mt-[0.8rem] text-mist text-[0.95rem] leading-[1.6] border-t border-white/10 pt-[0.8rem]">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
