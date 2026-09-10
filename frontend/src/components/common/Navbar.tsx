'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Projects', href: '/projects' },
    { name: 'Services', href: '/#services' },
    { name: 'Ethos', href: '/about' },
    { name: 'Journal', href: '/#journal' },
    { name: 'Contact', href: '/contact' },
  ];

  const isTransparentHero = pathname === '/' && !scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-0 opacity-100 pointer-events-auto ${
          isTransparentHero
            ? 'py-6 bg-transparent'
            : 'py-4 bg-[#0E0D0C]/90 backdrop-blur-md border-b border-white/10 shadow-2xl'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Studio Brand / Logo */}
          <Link
            href="/"
            className="group flex flex-col items-start focus:outline-none"
          >
            <span className="font-serif text-xl md:text-2xl tracking-[-0.01em] font-light text-white drop-shadow-md group-hover:text-[#E2D6C3] transition-colors">
              ATELIER VANGUARD
            </span>
            <span className="text-[8px] uppercase tracking-[0.36em] -mt-0.5 font-light text-white/70 drop-shadow group-hover:text-white transition-colors">
              ARCHITECTURAL PRACTICE
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[10px] uppercase tracking-[0.28em] transition-all duration-300 relative py-1 font-light ${
                    isActive
                      ? 'text-[#E2D6C3] drop-shadow'
                      : 'text-white/80 hover:text-white drop-shadow-sm'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#E2D6C3]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right CTA */}
          <div className="hidden md:flex items-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-5 py-2 text-[10px] uppercase tracking-[0.26em] transition-all duration-300 group font-light text-white border border-white/30 bg-white/5 hover:bg-white hover:text-[#181614] backdrop-blur-md"
            >
              <span>Inquire</span>
              <ArrowUpRight strokeWidth={1.25} className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 transition-colors focus:outline-none cursor-pointer relative z-50 text-white hover:text-[#E2D6C3]"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X strokeWidth={1.25} className="w-6 h-6" /> : <Menu strokeWidth={1.25} className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#0E0D0C]/96 backdrop-blur-2xl md:hidden flex flex-col justify-between p-8 pt-28 transition-all duration-300 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="flex flex-col gap-6">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#9E7D47] font-light">
            Navigation
          </span>
          {navLinks.map((link, idx) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif text-3xl sm:text-4xl text-white hover:text-[#E2D6C3] transition-colors flex items-baseline font-light"
            >
              <span className="text-xs font-mono text-white/40 mr-4 font-light">0{idx + 1}</span>
              <span className="text-white hover:text-[#E2D6C3] transition-colors">{link.name}</span>
            </Link>
          ))}
        </div>

        <div className="border-t border-white/15 pt-6 space-y-4">
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-3.5 bg-white text-[#141414] hover:bg-[#E2D6C3] border border-white font-sans font-light text-[11px] tracking-[0.26em] uppercase flex items-center justify-center gap-2 transition-colors"
          >
            <span>Initiate Commission</span>
            <ArrowUpRight strokeWidth={1.25} className="w-3.5 h-3.5" />
          </Link>
          <div className="text-[9px] tracking-[0.3em] uppercase text-white/50 text-center font-light">
            Kochi · Zurich · Global
          </div>
        </div>
      </div>
    </>
  );
}
