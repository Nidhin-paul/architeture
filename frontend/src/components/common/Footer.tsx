'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#EAE6DF] text-[#141414] border-t border-[#D8D2C6] pt-20 md:pt-28 pb-12 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Large Final CTA Banner */}
        <div className="border-b border-[#D8D2C6] pb-16 md:pb-20 mb-16">
          <span className="text-[10px] uppercase tracking-[0.32em] text-[#9E7D47] font-light block mb-4">
            05 / COMMISSIONS &amp; INQUIRIES
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight leading-[1.02] text-[#141414] max-w-3xl">
              HAVE A VISION
              <br />
              <span className="editorial-italic font-normal text-[#9E7D47]">
                IN MIND?
              </span>
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-7 py-4 bg-[#141414] text-white hover:bg-transparent hover:text-[#141414] border border-[#141414] transition-all duration-300 text-[10px] uppercase tracking-[0.28em] font-light shrink-0 group self-start lg:self-end"
            >
              <span>Initiate Dialogue</span>
              <ArrowUpRight strokeWidth={1.25} className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Studio Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-[#D8D2C6]">
          {/* Col 1: Studio */}
          <div className="space-y-3">
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#9E7D47] font-light block">
              01 / STUDIO
            </span>
            <h3 className="font-serif text-xl text-[#141414] font-light">ATELIER VANGUARD</h3>
            <p className="text-[#5A554D] text-xs font-light leading-relaxed max-w-xs">
              International architecture and spatial design studio dedicated to permanence, materiality, and the poetics of light.
            </p>
          </div>

          {/* Col 2: Archive */}
          <div className="space-y-3">
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#9E7D47] font-light block">
              02 / DIRECTORY
            </span>
            <ul className="space-y-2.5 text-xs text-[#5A554D] font-light">
              <li>
                <Link href="/projects" className="hover:text-[#141414] transition-colors">
                  Monograph &amp; Commissions
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-[#141414] transition-colors">
                  Practices &amp; Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#141414] transition-colors">
                  Foundational Ethos
                </Link>
              </li>
              <li>
                <Link href="/#journal" className="hover:text-[#141414] transition-colors">
                  Critical Dispatches
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#141414] transition-colors">
                  Commission Inquiry
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Coordinates */}
          <div className="space-y-3">
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#9E7D47] font-light block">
              03 / ATELIERS
            </span>
            <div className="text-xs text-[#5A554D] space-y-3 font-light">
              <div>
                <span className="text-[#141414] block font-normal">Kochi Studio</span>
                <span>Fort Kochi Waterfront 14, Kerala</span>
              </div>
              <div>
                <span className="text-[#141414] block font-normal">Zurich Laboratory</span>
                <span>Limmatquai 72, 8001 Zürich</span>
              </div>
            </div>
          </div>

          {/* Col 4: Dispatch & Social */}
          <div className="space-y-3">
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#9E7D47] font-light block">
              04 / TRANSMISSIONS
            </span>
            <div className="space-y-3 text-xs text-[#5A554D] font-light">
              <p>
                <a
                  href="mailto:commissions@ateliervanguard.com"
                  className="hover:text-[#9E7D47] transition-colors block underline underline-offset-4"
                >
                  commissions@ateliervanguard.com
                </a>
              </p>
              <div className="flex gap-4 pt-1">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#141414] transition-colors uppercase text-[10px] tracking-[0.24em] inline-flex items-center gap-1"
                >
                  <span>Instagram</span>
                  <ArrowUpRight strokeWidth={1.25} className="w-3 h-3" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#141414] transition-colors uppercase text-[10px] tracking-[0.24em] inline-flex items-center gap-1"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight strokeWidth={1.25} className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-[9px] tracking-[0.28em] uppercase text-[#8C8478] font-light gap-4">
          <div>© 2026 ATELIER VANGUARD. ALL RIGHTS RESERVED.</div>
          <div>SPATIAL ORDER · RESTRAINT · PERMANENCE</div>
        </div>
      </div>
    </footer>
  );
}
