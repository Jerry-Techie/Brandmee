'use client';

import { useState } from 'react';
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
      <div className="flex items-center gap-[0.6rem] justify-center mb-6">
        <HelpCircle size={22} color="var(--gold)" />
        <h3 className="text-2xl font-bold">Frequently Asked Questions</h3>
      </div>

      <div className="flex flex-col gap-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="glass-card px-6 py-5 cursor-pointer"
              onClick={() => toggleFaq(idx)}
            >
              <div className="flex justify-between items-center gap-4">
                <h4 className={`text-[1.05rem] font-semibold ${isOpen ? 'text-gold' : 'text-cream'}`}>
                  {faq.question}
                </h4>
                <div
                  className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'} ${isOpen ? 'text-gold' : 'text-mist'}`}
                >
                  <ChevronDown size={20} />
                </div>
              </div>

              {isOpen && (
                <p className="mt-[0.8rem] text-mist text-[0.95rem] leading-[1.6] border-t border-white/10 pt-[0.8rem]">
                  {faq.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
