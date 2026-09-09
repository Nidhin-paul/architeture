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
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Projects', href: '/projects' },
    { name: 'Services', href: '/#services' },
    { name: 'About', href: '/about' },
    { name: 'Journal', href: '/#journal' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3.5 bg-[#F9F8F6]/90 backdrop-blur-md border-b border-[#E2DDD5] shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Studio Brand / Logo */}
          <Link
            href="/"
            className="group flex flex-col items-start focus:outline-none"
          >
            <span
              className={`font-serif text-xl md:text-2xl tracking-tight font-light transition-colors ${
                scrolled ? 'text-ink group-hover:text-bronze' : 'text-white drop-shadow-md group-hover:text-[#E5C378]'
              }`}
            >
              ATELIER VANGUARD
            </span>
            <span
              className={`text-[9px] uppercase tracking-[0.3em] -mt-1 font-medium transition-colors ${
                scrolled ? 'text-stoneCaption group-hover:text-ink' : 'text-white/75 drop-shadow group-hover:text-white'
              }`}
            >
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
                  className={`text-[11px] uppercase tracking-[0.24em] transition-all duration-300 relative py-1 font-medium ${
                    isActive
                      ? scrolled ? 'text-bronze' : 'text-[#E5C378] drop-shadow'
                      : scrolled
                      ? 'text-stoneMuted hover:text-ink'
                      : 'text-white/85 hover:text-white drop-shadow-sm'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-[1.5px] ${
                        scrolled ? 'bg-bronze' : 'bg-[#E5C378]'
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right CTA */}
          <div className="hidden md:flex items-center">
            <Link
              href="/contact"
              className={`inline-flex items-center gap-2 px-5 py-2.5 text-[11px] uppercase tracking-[0.24em] transition-all duration-300 rounded-none group font-medium ${
                scrolled
                  ? 'text-ink border border-ink/20 hover:border-bronze hover:text-bronze hover:bg-bronze/5'
                  : 'text-white border border-white/40 bg-white/10 hover:bg-white hover:text-[#181614] backdrop-blur-md shadow-lg'
              }`}
            >
              <span>Start A Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#141414] hover:text-bronze transition-colors focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#F9F8F6]/98 backdrop-blur-xl md:hidden flex flex-col justify-between p-8 pt-28 transition-all duration-300 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="flex flex-col gap-6">
          <span className="text-[10px] tracking-widest uppercase text-bronze font-medium">
            Navigation
          </span>
          {navLinks.map((link, idx) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif text-3xl text-[#141414] hover:text-bronze transition-colors"
            >
              <span className="text-xs font-mono text-muted mr-4">0{idx + 1}</span>
              {link.name}
            </Link>
          ))}
        </div>

        <div className="border-t border-[#E2DDD5] pt-6 space-y-4">
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-3.5 bg-bronze text-white font-sans font-medium text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg"
          >
            <span>Start A Commission</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <div className="text-[10px] tracking-widest uppercase text-muted text-center">
            Studio in Kochi · Dubai · Zurich
          </div>
        </div>
      </div>
    </>
  );
}
