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
    <section id="services" className="py-32 bg-[#F9F8F6] text-[#141414] border-t border-[#E2DDD5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between pb-16 border-b border-[#E2DDD5] gap-6"
        >
          <div>
            <span className="eyebrow block mb-4">
              Disciplines &amp; Expertise
            </span>
            <h2 className="section-heading text-ink">SERVICES</h2>
          </div>
          <p className="text-graphite text-xs md:text-sm font-light max-w-sm leading-relaxed">
            Hover each practice to inspect spatial documentation and commission protocols.
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
                className="py-8 group flex items-start justify-between cursor-pointer transition-colors hover:pl-2"
              >
                <div className="space-y-2 max-w-lg">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-bronze font-medium group-hover:text-bronzeHover transition-colors">
                    {service.category}
                  </span>
                  <h3 className="font-serif text-2xl md:text-4xl text-ink font-light group-hover:text-bronze transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-graphite text-xs md:text-sm font-light leading-relaxed">
                    {service.desc}
                  </p>
                </div>
                <div className="p-3 rounded-full border border-[#E2DDD5] text-stoneCaption group-hover:border-bronze group-hover:text-bronze group-hover:bg-bronze/10 transition-all shrink-0 mt-2">
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Floating Hover Image Preview Plate */}
          <div className="hidden lg:block lg:col-span-5 sticky top-32">
            <div className="relative w-full h-[520px] overflow-hidden border border-[#E2DDD5] bg-[#F2EFE9] shadow-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.05 }}
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
              <div className="absolute bottom-6 left-6 right-6 text-xs uppercase tracking-widest text-white/95 flex justify-between items-center z-10 font-medium drop-shadow-sm">
                <span>Atelier Portfolio Archive</span>
                <span className="text-bronze font-mono">Active Documentation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
