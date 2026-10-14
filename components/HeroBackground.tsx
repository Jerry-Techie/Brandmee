"use client";

import { motion } from "framer-motion";

type Particle = {
  size: number;
  left: string;
  top: string;
  duration: number;
  delay: number;
  color: string;
  x: number[];
  y: number[];
};

const particles: Particle[] = [
  {
    size: 6,
    left: "12%",
    top: "22%",
    duration: 7,
    delay: 0,
    color: "rgba(255, 77, 28, 0.55)",
    x: [0, 18, -6, 12, 0],
    y: [0, -14, 10, -6, 0],
  },
  {
    size: 4,
    left: "24%",
    top: "62%",
    duration: 9,
    delay: 1.2,
    color: "rgba(255, 184, 0, 0.5)",
    x: [0, -16, 8, -10, 0],
    y: [0, 12, -8, 14, 0],
  },
  {
    size: 8,
    left: "78%",
    top: "18%",
    duration: 11,
    delay: 0.6,
    color: "rgba(255, 77, 28, 0.45)",
    x: [0, 14, -10, 8, 0],
    y: [0, -10, 14, -8, 0],
  },
  {
    size: 5,
    left: "86%",
    top: "58%",
    duration: 8.5,
    delay: 2.1,
    color: "rgba(255, 184, 0, 0.45)",
    x: [0, -12, 10, -6, 0],
    y: [0, 14, -10, 12, 0],
  },
  {
    size: 3,
    left: "55%",
    top: "72%",
    duration: 10,
    delay: 1.8,
    color: "rgba(255, 255, 255, 0.4)",
    x: [0, 10, -8, 6, 0],
    y: [0, -12, 8, -10, 0],
  },
  {
    size: 4,
    left: "42%",
    top: "14%",
    duration: 9.5,
    delay: 0.9,
    color: "rgba(255, 184, 0, 0.4)",
    x: [0, -10, 12, -8, 0],
    y: [0, 10, -6, 12, 0],
  },
  {
    size: 7,
    left: "8%",
    top: "78%",
    duration: 12,
    delay: 2.4,
    color: "rgba(255, 77, 28, 0.4)",
    x: [0, 16, -8, 10, 0],
    y: [0, -8, 12, -6, 0],
  },
  {
    size: 3,
    left: "68%",
    top: "38%",
    duration: 8,
    delay: 1.5,
    color: "rgba(255, 255, 255, 0.35)",
    x: [0, -8, 10, -6, 0],
    y: [0, 12, -8, 10, 0],
  },
];

export default function HeroBackground() {
  return (
    <div
      aria-hidden
      className="hero-background pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Soft flame glow — tucked behind the headline, never overlapping */}
      <motion.div
        className="absolute -top-24 -left-24 h-[26rem] w-[26rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,77,28,0.16) 0%, rgba(255,184,0,0.05) 40%, transparent 70%)",
          filter: "blur(70px)",
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Soft gold glow — bottom right corner */}
      <motion.div
        className="absolute -bottom-28 -right-24 h-[22rem] w-[22rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,184,0,0.12) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
        animate={{
          scale: [1, 1.06, 1],
          opacity: [0.7, 0.95, 0.7],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            background: p.color,
            filter: "blur(1px)",
          }}
          animate={{ x: p.x, y: p.y }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}