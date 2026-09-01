'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Moon } from 'lucide-react';

const navLinks = [
  { name: 'HOME', href: '#hero' },
  { name: 'ABOUT', href: '#about' },
  { name: 'SKILLS', href: '#stack' },
  { name: 'PROJECTS', href: '#projects' },
  { name: 'ROADMAP', href: '#roadmap' },
  { name: 'CONTACT', href: '#contact' },
];

export default function KintaroNavbar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = totalScroll > 0 ? (window.scrollY / totalScroll) * 100 : 0;
      setScrollProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Thin Progress Line */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-white/10">
        <div
          className="h-full bg-white transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Global Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 md:px-12 py-5 flex items-center justify-between pointer-events-none">
        {/* Brand Logo */}
        <a
          href="#hero"
          className="font-bold text-xl tracking-tighter text-white pointer-events-auto hover:opacity-80 transition-opacity"
        >
          FALAH
        </a>

        {/* Navigation Items + Utilities */}
        <div className="flex items-center gap-6 md:gap-10 pointer-events-auto">
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-xs font-mono tracking-widest text-neutral-400 hover:text-white transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Right Icons: Language & Theme */}
          <div className="flex items-center gap-4 text-neutral-400">
            <button
              aria-label="Language Selector"
              className="hover:text-white transition-colors"
            >
              <Globe className="size-4" />
            </button>
            <button
              aria-label="Theme Toggle"
              className="hover:text-white transition-colors"
            >
              <Moon className="size-4" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
