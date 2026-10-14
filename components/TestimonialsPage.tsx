"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import { getTestimonials, Testimonial } from "@/lib/testimonials";

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: "fallback-1",
    name: "Adaeze Okafor",
    role: "Founder",
    company: "Luxe Skin Co.",
    quote:
      "BrandME took our idea from a brief to a live, polished website in seven days. Inquiries doubled within the first month.",
    rating: 5,
  },
  {
    id: "fallback-2",
    name: "Emeka Adeyemi",
    role: "CEO",
    company: "Nova Logistics",
    quote:
      "No agency markups, no surprises. Fixed pricing, honest timelines, and a site that finally makes our brand look the part.",
    rating: 5,
  },
  {
    id: "fallback-3",
    name: "Chiamaka Eze",
    role: "Head of Operations",
    company: "Bloom & Craft",
    quote:
      "The booking widget and WhatsApp button alone paid for themselves. Our customers book directly instead of sliding into DMs.",
    rating: 5,
  },
  {
    id: "fallback-4",
    name: "Tunde Balogun",
    role: "Managing Partner",
    company: "Kola & Co. Chambers",
    quote:
      "Professional, fast, and genuinely done-for-you. We filled out a five-minute brief and our site launched a week later.",
    rating: 5,
  },
];

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getTestimonials()
      .then((items) => {
        if (!isMounted) return;
        setTestimonials(items.length > 0 ? items : FALLBACK_TESTIMONIALS);
      })
      .catch((error) => {
        console.error("Failed to load testimonials:", error);
        if (isMounted) {
          setTestimonials(FALLBACK_TESTIMONIALS);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="testimonials" className="py-20 lg:py-24">
      <div className="mx-auto max-w-300 px-5">
        <motion.div
          className="max-w-2xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-gold" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Client stories
            </span>
          </div>
          <h2 className="font-syne text-3xl md:text-4xl font-bold text-cream leading-[1.2] mb-4">
            Client <span className="gradient-text-gold">Stories</span>
          </h2>
          <p className="text-mist text-base leading-relaxed">
            Real feedback from businesses building a sharper online presence.
          </p>
        </motion.div>

        <motion.div
          className="max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
          }}
        >
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <motion.article
                  className="border-t border-white/10 py-10 animate-pulse"
                  key={`skeleton-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <span
                        key={starIndex}
                        className="w-4.5 h-4.5 rounded-sm bg-white/10"
                      />
                    ))}
                  </div>
                  <div className="h-6 bg-white/10 rounded w-full mb-3" />
                  <div className="h-6 bg-white/10 rounded w-2/3 mb-8" />
                  <div className="flex items-center gap-4">
                    <span className="w-12 h-12 rounded-full bg-white/10" />
                    <div className="flex flex-col gap-2">
                      <span className="h-4 bg-white/10 rounded w-32" />
                      <span className="h-3 bg-white/10 rounded w-48" />
                    </div>
                  </div>
                </motion.article>
              ))
            : testimonials.map((item, index) => (
              <motion.article
                className="border-t border-white/10 py-10"
                key={item.id ?? `${item.name}-${index}`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <motion.div
                  className="flex gap-1 text-amber-500 mb-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  {Array.from({ length: Math.max(1, Math.min(item.rating || 5, 5)) }).map((_, starIndex) => (
                    <Star key={starIndex} size={18} fill="currentColor" />
                  ))}
                </motion.div>

                <motion.blockquote
                  className="text-xl md:text-2xl leading-relaxed text-cream mb-8 font-syne"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                >
                  "{item.quote}"
                </motion.blockquote>

                <motion.div
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {item.avatar ? (
                    <div
                      className="relative w-12 h-12 rounded-full overflow-hidden border border-charcoal shrink-0"
                    >
                      <Image src={item.avatar} alt={item.name} fill className="object-cover" />
                    </div>
                  ) : (
                    <motion.div
                      className="w-12 h-12 rounded-full bg-flame text-white flex items-center justify-center font-bold shrink-0"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {item.name.charAt(0)}
                    </motion.div>
                  )}

                  <div>
                    <strong className="block text-white leading-[1.2]">{item.name}</strong>
                    <span className="text-mist text-sm">
                      {item.role}
                      {item.company ? `, ${item.company}` : ""}
                    </span>
                  </div>
                </motion.div>
              </motion.article>
            ))}
        </motion.div>
      </div>
    </section>
  );
}
