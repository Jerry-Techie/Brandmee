"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import { getTestimonials, Testimonial } from "@/lib/testimonials";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    let isMounted = true;

    getTestimonials()
      .then((items) => {
        if (isMounted) {
          setTestimonials(items);
        }
      })
      .catch((error) => {
        console.error("Failed to load testimonials:", error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="testimonials" className="py-24">
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="section-header">
          <h2 className="section-title">
            Client <span className="gradient-text-gold">Stories</span>
          </h2>
          <p className="section-desc">
            Real feedback from businesses building a sharper online presence.
          </p>
        </div>

        <div
          className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6"
        >
          {testimonials.map((item, index) => (
            <article className="testimonial-card" key={item.id ?? `${item.name}-${index}`}>
              <div className="flex gap-[0.25rem] text-amber-500 mb-4">
                {Array.from({ length: Math.max(1, Math.min(item.rating || 5, 5)) }).map((_, starIndex) => (
                  <Star key={starIndex} size={18} fill="currentColor" />
                ))}
              </div>

              <p className="text-cream text-base leading-[1.7] mb-6">
                "{item.quote}"
              </p>

              <div className="flex items-center gap-3">
                {item.avatar ? (
                  <div
                    className="relative w-11 h-11 rounded-full overflow-hidden border border-charcoal shrink-0"
                  >
                    <Image src={item.avatar} alt={item.name} fill className="object-cover" />
                  </div>
                ) : (
                  <div
                    className="w-11 h-11 rounded-full bg-flame text-white flex items-center justify-center font-bold shrink-0"
                  >
                    {item.name.charAt(0)}
                  </div>
                )}

                <div>
                  <strong className="block text-white leading-[1.2]">{item.name}</strong>
                  <span className="text-mist text-sm">
                    {item.role}
                    {item.company ? `, ${item.company}` : ""}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
