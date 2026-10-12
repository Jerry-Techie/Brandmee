'use client';

import React, { useEffect, useState, JSX } from "react";
import { Globe, DollarSign, Clock, ShieldCheck } from 'lucide-react';
import { motion, useMotionValue, useTransform, animate, useMotionValueEvent, MotionValue } from "framer-motion";

interface StatItem {
  icon: JSX.Element;
  prefix?: string;
  suffix?: string;
  isAnimated: boolean;
  motionValue?: MotionValue<number>;
  staticValue?: string;
  decimals?: number;
  label: string;
  subtext: string;
}

interface AnimatedNumberProps {
  value: MotionValue<number>;
  decimals?: number;
}

function AnimatedNumber({ value, decimals = 0 }: AnimatedNumberProps): JSX.Element {
  const [displayValue, setDisplayValue] = useState<number>(0);

  useMotionValueEvent(value, "change", (latest: number) => {
    setDisplayValue(latest);
  });

  return <>{displayValue.toFixed(decimals)}</>;
}

export default function StatsCounter(): JSX.Element {

  const countSme = useMotionValue<number>(0);
  const countMarket = useMotionValue<number>(0);
  const countDays = useMotionValue<number>(0);
  const countSatisfaction = useMotionValue<number>(0);

  const roundSme = useTransform(countSme, (latest) => Math.round(latest));
  const roundMarket = useTransform(countMarket, (latest) => Math.round(latest));
  const roundDays = useTransform(countDays, (latest) => Math.round(latest));

  const roundSatisfaction = useTransform(countSatisfaction, (latest) => Math.round(latest * 10) / 10);

  useEffect(() => {
    const controls1 = animate(countSme, 3, { duration: 2.5, ease: "easeOut" });
    const controls2 = animate(countMarket, 150, { duration: 2.8, ease: "easeOut" });
    const controls3 = animate(countDays, 7, { duration: 2, ease: "easeOut" });
    const controls4 = animate(countSatisfaction, 99.8, { duration: 3, ease: "easeOut" });

    return () => {
      controls1.stop();
      controls2.stop();
      controls3.stop();
      controls4.stop();
    };
  }, [countSme, countMarket, countDays, countSatisfaction]);

  const stats: StatItem[] = [
    {
      icon: <Globe size={28} color="var(--gold)" />,
      isAnimated: true,
      motionValue: roundSme,
      suffix: 'M+',
      label: 'SMEs GLOBALLY',
      subtext: 'Businesses needing high quality online presence',
    },
    {
      icon: <DollarSign size={28} color="var(--flame)" />,
      isAnimated: true,
      motionValue: roundMarket,
      prefix: '$',
      suffix: '',
      label: 'MARKET SIZE',
      subtext: 'Global small business website & design market',
    },
    {
      icon: <Clock size={28} color="var(--gold)" />,
      isAnimated: true,
      motionValue: roundDays,
      suffix: ' Days',
      label: 'DELIVERY TIME',
      subtext: 'From brief submission to live launch',
    },
    {
      icon: <ShieldCheck size={28} color="var(--flame)" />,
      isAnimated: true,
      motionValue: roundSatisfaction,
      suffix: '%',
      decimals: 1,
      label: 'SATISFACTION RATE',
      subtext: 'On-time delivery and ongoing host maintenance',
    },
  ];

  return (
    <section className="py-16 border-y border-white/10 bg-white/[0.02]">
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-8">
          {stats.map((stat: StatItem, idx: number) => (
            <motion.div
              key={idx}
              className="glass-card text-center flex flex-col items-center px-6 py-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div
                className="w-14 h-14 rounded-full bg-black flex items-center justify-center mb-4"
              >
                {stat.icon}
              </div>

              <strong className="text-[2.5rem] font-extrabold text-cream leading-[1.1] mb-[0.4rem]">
                {stat.prefix}
                {stat.isAnimated && stat.motionValue ? (
                  <AnimatedNumber value={stat.motionValue} decimals={stat.decimals || 0} />
                ) : (
                  stat.staticValue
                )}
                {stat.suffix}
              </strong>

              <span className="text-[0.85rem] font-bold tracking-[0.05em] text-gold mb-[0.4rem]">
                {stat.label}
              </span>

              <p className="text-[0.9rem] text-mist">
                {stat.subtext}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
