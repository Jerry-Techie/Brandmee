"use client";

import { useState } from "react";
import BrandMeLink from "@/components/BrandMeLink";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import {
  Twitter,
  Github,
  Send,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";

const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const socialLinks = [
  {
    href: "https://x.com/brandme_nigeria",
    icon: Twitter,
    bg: "bg-black",
    border: "border-white/10",
    text: "text-cream",
    hoverBg: "bg-flame/10",
  },
  {
    href: "https://github.com/thecodingmob/brandme",
    icon: Github,
    bg: "bg-black",
    border: "border-white/10",
    text: "text-cream",
    hoverBg: "bg-flame/10",
  },
  {
    href: "https://wa.me/2349169370962?text=Hi%20I%20need%20a%20Website",
    icon: MessageSquare,
    bg: "bg-black",
    border: "border-[rgba(37,211,102,0.3)]",
    text: "text-[#25D366]",
    hoverBg: "bg-[#25D366]/10",
  },
];

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[rgba(5,6,9,0.95)] border-t border-white/10 pt-16 pb-8">
      <motion.div
        className="mx-auto max-w-[1200px] px-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-12 mb-16">
          {/* Brand Info */}
          <motion.div variants={fadeUpItem}>
            <BrandMeLink href="/" aria-label="BrandME home" onClick={closeMenu}>
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src="/images/logo/brandmeIcon-logo.svg"
                  alt="BrandME Icon"
                  width={55}
                  height={40}
                  priority
                />
                <Image
                  src="/images/logo/brandme-logo.svg"
                  alt="BrandME"
                  width={140}
                  height={40}
                  priority
                />
              </motion.div>
            </BrandMeLink>
            <motion.p
              className="text-dim text-[0.95rem] leading-[1.7] mb-6 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              BrandME builds fast, clean, and professional done-for-you websites
              for SMEs and brands in 7 days or less.
            </motion.p>
            <motion.div
              className="flex gap-4"
              variants={staggerContainer}
            >
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full ${social.bg} ${social.border} ${social.text} flex items-center justify-center transition-all duration-200 ${social.hoverBg}`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeUpItem}>
            <h4 className="text-[1.1rem] font-semibold mb-5 text-cream">
              Navigation
            </h4>
            <ul className="list-none flex flex-col gap-[0.8rem]">
              {[
                { href: '/', label: 'Home Page' },
                { href: '/about', label: 'About BrandME' },
                { href: '/#services', label: 'Services Offered' },
                { href: '/pricing', label: 'Pricing Packages' },
                { href: '/#portfolio', label: 'Portfolio & Case Studies' },
              ].map((link, idx) => (
                <motion.li key={link.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: idx * 0.05 + 0.2 }}>
                  <BrandMeLink
                    href={link.href}
                    className="text-dim text-[0.95rem]"
                    onClick={closeMenu}
                  >
                    {link.label}
                  </BrandMeLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeUpItem}>
            <h4 className="text-[1.1rem] font-semibold mb-5 text-cream">
              Direct Contact
            </h4>
            <ul className="list-none flex flex-col gap-[0.8rem] text-dim text-[0.95rem]">
              <motion.li initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.25 }}>
                WhatsApp:{" "}
                <motion.a
                  href="https://wa.me/2349169370962"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-flame"
                  whileHover={{ textDecoration: "underline" }}
                >
                  +234 916 937 0962
                </motion.a>
              </motion.li>
              <motion.li initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.3 }}>
                Email:{" "}
                <motion.a
                  href="mailto:brandmenigeria01@gmail.com"
                  className="text-flame"
                  whileHover={{ textDecoration: "underline" }}
                >
                  brandmenigeria01@gmail.com
                </motion.a>
              </motion.li>
              <motion.li initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.35 }}>Response Time: Within 24 hours</motion.li>
              <motion.li initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.4 }}>Delivery Guarantee: 7 Days</motion.li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={fadeUpItem}>
            <h4 className="text-[1.1rem] font-semibold mb-5 text-cream">
              Stay Updated
            </h4>
            <motion.p
              className="text-dim text-[0.95rem] mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Subscribe to get business growth tips and website design insights.
            </motion.p>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col gap-[0.6rem]"
            >
              <div className="relative">
                <motion.input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-4 px-4 rounded-xl bg-black border border-white/10 text-cream text-[0.95rem] outline-none"
                  whileFocus={{ borderColor: "rgba(255, 77, 28, 0.5)" }}
                />
              </div>
              <motion.button
                type="submit"
                className="btn-primary p-3 w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                {subscribed ? (
                  <>
                    <CheckCircle2 size={18} /> Subscribed!
                  </>
                ) : (
                  <>
                    Subscribe <Send size={16} />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-white/10 pt-8 flex items-center justify-between flex-wrap gap-4 text-dim text-[0.9rem]"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p>
            © {new Date().getFullYear()} BrandME Nigeria. All rights reserved.
          </p>
          <p>Your Brand. Your Web. Delivered in 7 Days.</p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
