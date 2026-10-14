"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import BrandMeLink from "@/components/BrandMeLink";
import { Menu, X, ArrowRight } from "lucide-react";

type NavbarUser = {
  isLoggedIn: boolean;
  role: string;
} | null;

type NavbarProps = {
  user?: NavbarUser;
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/#testimonials", label: "Testimonials" },
];

const itemVariant: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 },
};

const containerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

export default function Navbar({ user }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`navbar ${scrolled ? "scrolled" : ""}`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="navbar-inner mx-auto max-w-300 px-5">
        <motion.div
          className="flex items-center gap-4 flex-wrap"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <BrandMeLink
            href="/"
            className="nav-logo"
            aria-label="BrandME home"
            onClick={closeMenu}
          >
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo/brandmeIcon-logo.svg"
                alt="BrandME Icon"
                width={25}
                height={20}
                priority
              />
              <Image
                src="/images/logo/brandme-logo.svg"
                alt="BrandME"
                width={100}
                height={20}
                priority
              />
            </div>
          </BrandMeLink>

          {/* Hairline separator between logo and nav */}
          <span
            aria-hidden
            className="hidden lg:block h-6 w-px rule-fade-down self-center opacity-40"
          />
        </motion.div>

        <motion.nav
          className="desktop-nav"
          aria-label="Primary navigation"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
        >
          <ul className="nav-links">
            {navLinks.map((link) => (
              <motion.li key={link.href} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <BrandMeLink
                  href={link.href}
                  className="nav-link"
                  onClick={closeMenu}
                >
                  {link.label}
                </BrandMeLink>
              </motion.li>
            ))}
          </ul>
        </motion.nav>


        <motion.div
          className="nav-actions desktop-only"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        >
          {user?.isLoggedIn && user.role === "admin" ? (
            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
              <BrandMeLink href="/admin" className="btn-secondary">
                Admin
              </BrandMeLink>
            </motion.div>
          ) : null}
          <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
            <BrandMeLink href="/contact" className="btn-primary-nav">
              Get Started <ArrowRight size={16} />
            </BrandMeLink>
          </motion.div>
        </motion.div>

        <motion.button
          type="button"
          className="mobile-toggle"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
    
   

      {isOpen ? (
        <motion.button
          className="nav-backdrop"
          aria-label="Close menu"
          onClick={closeMenu}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      ) : null}
        </div>

      <motion.nav
        className={`mobile-drawer ${isOpen ? "open" : ""}`}
        aria-label="Mobile navigation"
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <motion.div
          className="mobile-drawer-content"
          variants={containerVariant}
          initial="hidden"
          animate={isOpen ? "visible" : "hidden"}
        >
          {navLinks.map((link) => (
            <motion.div key={link.href} variants={itemVariant}>
              <BrandMeLink
                href={link.href}
                className="nav-link"
                onClick={closeMenu}
              >
                {link.label}
              </BrandMeLink>
            </motion.div>
          ))}
          {user?.isLoggedIn && user.role === "admin" ? (
            <motion.div variants={itemVariant}>
              <BrandMeLink
                href="/admin"
                className="btn-secondary mobile-btn"
                onClick={closeMenu}
              >
                Admin
              </BrandMeLink>
            </motion.div>
          ) : null}
          <motion.div variants={itemVariant}>
            <BrandMeLink
              href="/contact"
              className="btn-primary-nav mobile-btn"
              onClick={closeMenu}
            >
              Get Started <ArrowRight size={16} />
            </BrandMeLink>
          </motion.div>
        </motion.div>
      </motion.nav>
    </motion.header>
  );
}
