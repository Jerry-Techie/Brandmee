import Link from 'next/link';
import { Sparkles, Check, X, ArrowRight, Target, HeartHandshake, ShieldCheck } from 'lucide-react';
import StatsCounter from '@/components/StatsCounter';

export default function AboutPage() {
  return (
    <>
      <section className="pt-16 pb-8 text-center">
        <div className="wrapper text-center">
          <h1 className="text-[clamp(2.2rem,5vw,4rem)] mb-6">
            Learn More About Brand<span className="title">ME</span>
          </h1>

          <div
            className="glass-card bg-[#111111]! border-[#262626]! p-10 text-left mb-8"
          >
            <p className="text-xl leading-[1.8] text-cream opacity-95">
              We at BrandME build fast, clean and professional websites in 7 days or less. We specialize in creating websites that speak a thousand words about our clients&apos; brands or businesses and also deliver within 7 days at prices that can be well afforded. We have a vision to help small brands and businesses escape the flaws of freelancers, web agencies, and DIY tools. We are always available for your service 24/7.
            </p>
          </div>

          <div className="flex justify-center">
            <Link href="/pricing" className="btn py-[0.9rem] px-8">
              Get Started <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CORE VALUES / FEATURE CARDS */}
      <section className="py-12">
        <div className="wrapper">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8">
            <div className="glass-card bg-[#111111]! border-[#262626]! p-8">
              <div
                className="w-11 h-11 rounded-lg bg-[rgba(255,77,28,0.15)] text-flame flex items-center justify-center mb-5"
              >
                <Target size={22} />
              </div>
              <h3 className="text-[1.3rem] font-bold mb-[0.6rem]">The Problem We Solve</h3>
              <p className="text-mist leading-[1.6] text-[0.95rem]">
                Most small business owners get stuck choosing between expensive traditional agencies charging thousands of dollars, unreliable freelancers who drag timelines for months, or overwhelming DIY website builders.
              </p>
            </div>

            <div className="glass-card bg-[#111111]! border-[#262626]! p-8">
              <div
                className="w-11 h-11 rounded-lg bg-[rgba(255,184,0,0.15)] text-gold flex items-center justify-center mb-5"
              >
                <HeartHandshake size={22} />
              </div>
              <h3 className="text-[1.3rem] font-bold mb-[0.6rem]">The BrandME Promise</h3>
              <p className="text-mist leading-[1.6] text-[0.95rem]">
                We provide a completely done-for-you service. Submit your business info via a brief, and within 7 days, we deliver a polished, high-converting website ready to accept client inquiries and generate sales.
              </p>
            </div>

            <div className="glass-card bg-[#111111]! border-[#262626]! p-8">
              <div
                className="w-11 h-11 rounded-lg bg-[rgba(255,77,28,0.15)] text-flame flex items-center justify-center mb-5"
              >
                <ShieldCheck size={22} />
              </div>
              <h3 className="text-[1.3rem] font-bold mb-[0.6rem]">Long-Term Peace of Mind</h3>
              <p className="text-mist leading-[1.6] text-[0.95rem]">
                Launching your site is just the beginning. Our ongoing monthly hosting and maintenance plan keeps your website secure, updated, and continuously optimized while you focus on growing your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON MATRIX */}
      <section className="py-16">
        <div className="wrapper">
          <div className="text-center mb-10">
            <h2>
              Why Choose <span className="gold">BrandME</span>?
            </h2>
            <p className="text-mist mt-1">See how we compare against traditional options in the market.</p>
          </div>

          <div className="overflow-x-auto">
            <table
              className="w-full border-collapse min-w-[600px] bg-[#111111] rounded-xl overflow-hidden border border-[#262626]"
            >
              <thead>
                <tr className="bg-[#1a1a1a] border-b border-[#333333]">
                  <th className="p-5 text-left text-xl font-bold">Feature</th>
                  <th className="p-5 text-center text-xl font-bold text-flame">BrandME</th>
                  <th className="p-5 text-center text-xl font-semibold text-mist">Freelancers</th>
                  <th className="p-5 text-center text-xl font-semibold text-mist">Web Agencies</th>
                  <th className="p-5 text-center text-xl font-semibold text-mist">DIY Site Builders</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#222222]">
                  <td className="py-4 px-5 font-semibold">Turnaround Time</td>
                  <td className="py-4 px-5 text-center text-gold font-bold">7 Days Guaranteed</td>
                  <td className="py-4 px-5 text-center text-mist">3 to 8 Weeks</td>
                  <td className="py-4 px-5 text-center text-mist">2 to 4 Months</td>
                  <td className="py-4 px-5 text-center text-mist">Requires hours of DIY work</td>
                </tr>
                <tr className="border-b border-[#222222]">
                  <td className="py-4 px-5 font-semibold">Upfront Price</td>
                  <td className="py-4 px-5 text-center text-gold font-bold">Starting $150</td>
                  <td className="py-4 px-5 text-center text-mist">$500 - $2,000</td>
                  <td className="py-4 px-5 text-center text-mist">$3,000 - $10,000+</td>
                  <td className="py-4 px-5 text-center text-mist">$20 - $50/mo subscription</td>
                </tr>
                <tr className="border-b border-[#222222]">
                  <td className="py-4 px-5 font-semibold">Technical Skills Needed</td>
                  <td className="py-4 px-5 text-center">
                    <span className="inline-flex items-center gap-1 text-gold font-bold">
                      Zero Skills Required
                    </span>
                  </td>
                  <td className="py-4 px-5 text-center text-mist">None</td>
                  <td className="py-4 px-5 text-center text-mist">None</td>
                  <td className="py-4 px-5 text-center text-[#ef4444]">
                    <span className="inline-flex items-center gap-1">
                      <X size={18} /> High Learning Curve
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-[#222222]">
                  <td className="py-4 px-5 font-semibold">Ongoing Maintenance & Edits</td>
                  <td className="py-4 px-5 text-center">
                    <span className="inline-flex items-center gap-1 text-gold font-bold">
                     Done-For-You Monthly
                    </span>
                  </td>
                  <td className="py-4 px-5 text-center text-[#ef4444]">Uncertain availability</td>
                  <td className="py-4 px-5 text-center text-mist">Expensive retainer fees</td>
                  <td className="py-4 px-5 text-center text-[#ef4444]">DIY Edits yourself</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <StatsCounter />
    </>
  );
}
