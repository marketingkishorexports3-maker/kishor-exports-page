// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Journey', href: '#timeline' },
  { label: 'Map', href: '#map' },
  { label: 'Certifications', href: '#certifications' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (href) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f1b3d]">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-center h-16 lg:h-18">
          <button
            onClick={() => handleClick('#hero')}
            className="font-serif text-3xl md:text-4xl font-normal tracking-wide text-[#f5f7fb]"
          >
            Kishor Exports
          </button>

          <div />
        </div>
      </div>
    </nav>
  );
}
