'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function ServicesSection() {
  const [activeImage, setActiveImage] = useState<string>('/images/projects/project-monolith.jpg');

  const services = [
    {
      title: 'ARCHITECTURE',
      category: '01 / CORE PRACTICE',
      desc: 'Bespoke residential estates, monolithic cultural pavilions, and civic landmarks sculpted for permanence.',
      image: '/images/projects/project-monolith.jpg',
    },
    {
      title: 'INTERIOR DESIGN',
      category: '02 / SPATIAL POETICS',
      desc: 'Custom joinery, curated rare stone finishes, integrated acoustic wall planes, and tactile minimalism.',
      image: '/images/hero/hero-interior.jpg',
    },
    {
      title: 'MASTER PLANNING',
      category: '03 / REGIONAL SCALE',
      desc: 'Topographical campus orchestration, ecological water corridors, and low-density luxury enclaves.',
      image: '/images/projects/project-cultural.jpg',
    },
    {
      title: 'LANDSCAPE ARCHITECTURE',
      category: '04 / BOTANICAL HARMONY',
      desc: 'Obsidian reflecting pools, native biophilic vegetation, stepped rock gardens, and natural microclimates.',
      image: '/images/projects/project-alibaug.jpg',
    },
    {
      title: 'PROJECT MANAGEMENT',
      category: '05 / EXECUTION DISCIPLINE',
      desc: 'Bespoke procurement, custom structural concrete formwork supervision, and precision artisanal delivery.',
      image: '/images/projects/project-zurich.jpg',
    },
    {
      title: 'CONSULTING & ADVISORY',
      category: '06 / STRATEGIC VISION',
      desc: 'High-net-worth real estate valuation, site feasibility analysis, and sustainable thermodynamic optimization.',
      image: '/images/projects/project-dubai.jpg',
    },
  ];

  return (
    <section id="services" className="py-28 md:py-36 bg-[#F9F8F6] text-[#141414] border-t border-[#E2DDD5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between pb-16 border-b border-[#E2DDD5] gap-6"
        >
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.32em] text-[#9E7D47] font-light block">
              03 / PRACTICES &amp; DISCIPLINES
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-[#141414] leading-[1.06] tracking-tight">
              ARCHITECTURAL <span className="editorial-italic font-normal text-[#9E7D47]">SERVICES</span>
            </h2>
          </div>
          <p className="text-[#6E685F] text-xs sm:text-sm font-light max-w-sm leading-relaxed">
            Hover each discipline to inspect spatial documentation, site typologies, and execution protocols.
          </p>
        </motion.div>

        {/* Layout: Interactive List on Left, Dynamic Image Reveal on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 items-center">
          {/* Services List */}
          <div className="lg:col-span-7 divide-y divide-[#E2DDD5]">
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setActiveImage(service.image)}
                className="py-7 md:py-8 group flex items-start justify-between cursor-pointer transition-all hover:pl-2"
              >
                <div className="space-y-2 max-w-lg">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-[#9E7D47] font-light block group-hover:text-[#141414] transition-colors">
                    {service.category}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-[#141414] font-light group-hover:text-[#9E7D47] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[#5A554D] text-xs sm:text-sm font-light leading-relaxed">
                    {service.desc}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full border border-[#E2DDD5] text-[#8C8478] flex items-center justify-center group-hover:border-[#141414] group-hover:text-[#141414] transition-all shrink-0 mt-2">
                  <ArrowUpRight strokeWidth={1.25} className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Floating Hover Image Preview Plate */}
          <div className="hidden lg:block lg:col-span-5 sticky top-32">
            <div className="relative w-full h-[520px] overflow-hidden border border-[#E2DDD5] bg-[#F2EFE9]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeImage}
                    alt="Architectural Practice Visual"
                    fill
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/70 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-6 left-6 right-6 text-[9px] uppercase tracking-[0.28em] text-white/95 flex justify-between items-center z-10 font-light drop-shadow-sm">
                <span>Atelier Archive</span>
                <span className="text-[#E2D6C3]">Active Specification</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
