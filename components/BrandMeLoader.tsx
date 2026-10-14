"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function BrandMeLoader() {
  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-[rgba(5,6,9,0.97)] backdrop-blur-md">
      <div className="relative flex flex-col items-center">
        {/* Pulsing flame ring */}
        <motion.div
          className="absolute -inset-1 rounded-full"
          initial={{ opacity: 0.5, scale: 0.8 }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [0.8, 1.1, 0.8],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(circle, rgba(255,77,28,0.4) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />

        {/* Logo */}
        <motion.div
          className="relative z-10 mb-6 flex items-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Image
            src="/images/logo/brandmeIcon-logo.svg"
            alt="BrandME Icon"
            width={40}
            height={32}
            priority
          />
          <Image
            src="/images/logo/brandme-logo.svg"
            alt="BrandME"
            width={120}
            height={32}
            priority
          />
        </motion.div>

        {/* Animated progress bar */}
        <motion.div
          className="relative h-1 w-48 overflow-hidden rounded-full bg-white/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <motion.div
            className="h-full w-1/3 rounded-full bg-[linear-gradient(90deg,var(--color-flame),var(--color-gold))]"
            initial={{ x: "-120%" }}
            animate={{ x: "120%" }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="mt-4 text-xs font-medium text-mist"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          Your brand. Your web.
        </motion.p>
      </div>
    </div>
  );
}
