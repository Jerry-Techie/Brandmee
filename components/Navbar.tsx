'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link href="/" className="nav-logo">
          <Image
            src="/images/logo/brandme-logo.svg"
            alt="BrandME Logo"
            width={160}
            height={40}
            priority
            style={{ height: 'auto', width: 'auto' }}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden-mobile">
          <ul className="nav-links">
            <li>
              <Link href="/" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="nav-link">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/#services" className="nav-link">
                Services
              </Link>
            </li>
            <li>
              <Link href="/#pricing" className="nav-link">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/#portfolio" className="nav-link">
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/contact" className="nav-link">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/contact" className="btn-primary" style={{ padding: '0.65rem 1.4rem', fontSize: '0.9rem' }}>
            <span>Get Started</span>
          </Link>

          <button
            className="mobile-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="nav-links mobile-open">
            <Link href="/" className="nav-link" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link href="/about" className="nav-link" onClick={() => setIsOpen(false)}>
              About Us
            </Link>
            <Link href="/#services" className="nav-link" onClick={() => setIsOpen(false)}>
              Services
            </Link>
            <Link href="/#pricing" className="nav-link" onClick={() => setIsOpen(false)}>
              Pricing
            </Link>
            <Link href="/#portfolio" className="nav-link" onClick={() => setIsOpen(false)}>
              Portfolio
            </Link>
            <Link href="/contact" className="nav-link" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
            <Link
              href="/contact"
              className="btn-primary"
              onClick={() => setIsOpen(false)}
              style={{ marginTop: '0.5rem', textAlign: 'center' }}
            >
              Start Project <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
