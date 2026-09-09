'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#ECE8E1] text-[#141414] border-t border-[#D8D2C6] pt-24 pb-12 overflow-hidden relative">
      {/* Background Subtle Ambience */}
      <div className="absolute inset-0 noise-overlay opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Large Final CTA Banner */}
        <div className="border-b border-[#D8D2C6] pb-20 mb-16">
          <p className="eyebrow mb-6">
            Inquiries &amp; Commissions
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <h2 className="font-serif text-4xl sm:text-6xl lg:text-8xl font-light tracking-tight leading-none text-ink max-w-3xl">
              HAVE A PROJECT
              <br />
              <span className="editorial-italic font-normal text-bronzeAntique hover:text-ink transition-colors">
                IN MIND?
              </span>
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-4 px-8 py-5 bg-ink text-white hover:bg-bronze hover:text-white transition-all duration-300 text-xs uppercase tracking-[0.24em] font-medium shrink-0 group self-start lg:self-end shadow-md"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Studio Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-[#D8D2C6] text-xs tracking-wider">
          {/* Col 1: Studio */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg text-ink font-medium">ATELIER VANGUARD</h3>
            <p className="text-graphite leading-relaxed max-w-xs font-light">
              International architecture and spatial design studio dedicated to permanence, materiality, and light.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <span className="eyebrow block mb-4">
              Directory
            </span>
            <ul className="space-y-2 text-graphite font-light">
              <li>
                <Link href="/projects" className="hover:text-ink transition-colors">
                  Projects &amp; Monograph
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-ink transition-colors">
                  Practices &amp; Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-ink transition-colors">
                  Studio Philosophy
                </Link>
              </li>
              <li>
                <Link href="/#journal" className="hover:text-ink transition-colors">
                  Architectural Journal
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-ink transition-colors">
                  Direct Commission
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Coordinates */}
          <div className="space-y-3">
            <span className="eyebrow block mb-4">
              Coordinates
            </span>
            <div className="text-graphite space-y-3 font-light">
              <div>
                <strong className="text-ink block font-normal">Kochi Studio</strong>
                <span>Fort Kochi, Waterfront 14, Kerala</span>
              </div>
              <div>
                <strong className="text-ink block font-normal">Zurich Atelier</strong>
                <span>Limmatquai 72, 8001 Zürich</span>
              </div>
            </div>
          </div>

          {/* Col 4: Dispatch & Social */}
          <div className="space-y-3">
            <span className="eyebrow block mb-4">
              Connection
            </span>
            <div className="space-y-2 text-graphite font-light">
              <p>
                <a
                  href="mailto:commissions@ateliervanguard.com"
                  className="hover:text-bronze transition-colors block underline underline-offset-4"
                >
                  commissions@ateliervanguard.com
                </a>
              </p>
              <div className="flex gap-4 pt-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-ink transition-colors uppercase text-[11px] tracking-[0.2em]"
                >
                  Instagram ↗
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-ink transition-colors uppercase text-[11px] tracking-[0.2em]"
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] tracking-[0.25em] uppercase text-stoneCaption gap-4">
          <div>© 2026 ATELIER VANGUARD. ALL RIGHTS RESERVED.</div>
          <div>CRAFTED FOR INTERNATIONAL ARCHITECTURE &amp; DESIGN</div>
        </div>
      </div>
    </footer>
  );
}
