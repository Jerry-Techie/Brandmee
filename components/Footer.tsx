"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Twitter,
  Github,
  Send,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";

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
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-12 mb-16">
          {/* Brand Info */}
          <div>
            <Link href="/" aria-label="BrandME home" onClick={closeMenu}>
              <div className="flex items-center gap-3">
                <Image
                  src="/images/logo/brandmeIcon-logo.svg"
                  alt="Second Logo"
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
              </div>
            </Link>
            <p className="text-dim text-[0.95rem] leading-[1.7] mb-6 mt-6">
              BrandME builds fast, clean, and professional done-for-you websites
              for SMEs and brands in 7 days or less.
            </p>
            <div className="flex gap-4">
              <a
                href="https://x.com/brandme_nigeria"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-black border border-white/10 flex items-center justify-center text-cream transition-all duration-200"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://github.com/thecodingmob/brandme"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-black border border-white/10 flex items-center justify-center text-cream transition-all duration-200"
              >
                <Github size={18} />
              </a>
              <a
                href="https://wa.me/2349169370962?text=Hi%20I%20need%20a%20Website"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-black border border-[rgba(37,211,102,0.3)] flex items-center justify-center text-[#25D366] transition-all duration-200"
              >
                <MessageSquare size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[1.1rem] font-semibold mb-5 text-cream">
              Navigation
            </h4>
            <ul className="list-none flex flex-col gap-[0.8rem]">
              <li>
                <Link
                  href="/"
                  className="text-dim text-[0.95rem]"
                >
                  Home Page
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-dim text-[0.95rem]"
                >
                  About BrandME
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-dim text-[0.95rem]"
                >
                  Services Offered
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-dim text-[0.95rem]"
                >
                  Pricing Packages
                </Link>
              </li>
              <li>
                <Link
                  href="/#portfolio"
                  className="text-dim text-[0.95rem]"
                >
                  Portfolio & Case Studies
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[1.1rem] font-semibold mb-5 text-cream">
              Direct Contact
            </h4>
            <ul className="list-none flex flex-col gap-[0.8rem] text-dim text-[0.95rem]">
              <li>
                WhatsApp:{" "}
                <a
                  href="https://wa.me/2349169370962"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-flame"
                >
                  +234 916 937 0962
                </a>
              </li>
              <li>
                Email:{" "}
                <a
                  href="mailto:brandmenigeria01@gmail.com"
                  className="text-flame"
                >
                  brandmenigeria01@gmail.com
                </a>
              </li>
              <li>Response Time: Within 24 hours</li>
              <li>Delivery Guarantee: 7 Days</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[1.1rem] font-semibold mb-5 text-cream">
              Stay Updated
            </h4>
            <p className="text-dim text-[0.95rem] mb-4">
              Subscribe to get business growth tips and website design insights.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col gap-[0.6rem]"
            >
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-4 px-4 rounded-xl bg-black border border-white/10 text-cream text-[0.95rem] outline-none"
                />
              </div>
              <button
                type="submit"
                className="btn-primary p-3 w-full"
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
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex items-center justify-between flex-wrap gap-4 text-dim text-[0.9rem]">
          <p>
            © {new Date().getFullYear()} BrandME Nigeria. All rights reserved.
          </p>
          <p>Your Brand. Your Web. Delivered in 7 Days.</p>
        </div>
      </div>
    </footer>
  );
}
