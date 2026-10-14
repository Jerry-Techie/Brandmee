"use client";

import Link from "next/link";
import BrandMeLink from "@/components/BrandMeLink";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HeroContent() {
  return (
    <motion.div
      className="hero-container mx-auto max-w-[1200px] px-5"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } },
      }}
    >
      <motion.div
        className="inline-flex items-center gap-3 mb-8"
        variants={{
          hidden: { opacity: 0, y: -10 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-mist">
          Your Web, Your Design
        </span>
      </motion.div>

      <motion.h1
        className="hero-title"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        YOUR <span className="title">BRAND</span>,<br />
        YOUR WEB.
      </motion.h1>

      <motion.p
        className="hero-subtitle"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        A done-for-you web design platform built for SMEs, businesses, and
        emerging brands who deserve a high-converting, professional online
        presence without high agency costs.
      </motion.p>

      <motion.div
        className="hero-ctas"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
          <BrandMeLink href="/contact" className="btn-primary">
             Get Started <ArrowRight size={18} />
          </BrandMeLink>
        </motion.div>
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
          <Link href="#portfolio" className="btn-secondary">
            View Our Work
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
