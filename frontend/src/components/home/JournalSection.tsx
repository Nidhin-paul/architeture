'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function JournalSection() {
  const articles = [
    {
      date: 'SEPTEMBER 2026',
      tag: 'MATERIALS',
      title: 'Monolithic Poured Concrete & The Poetics of Mass',
      excerpt:
        'An investigation into board-formed architectural concrete as a sensory medium rather than merely a structural necessity.',
      readTime: '06 MIN READ',
      image: '/images/projects/project-monolith.jpg',
    },
    {
      date: 'AUGUST 2026',
      tag: 'IDEAS',
      title: 'Obsidian Water Mirrors: Thermodynamic Ecology in High-Heat Climes',
      excerpt:
        'How shallow architectural reflection pools lower localized microclimate temperatures while creating double-height celestial reflections.',
      readTime: '08 MIN READ',
      image: '/images/projects/project-alibaug.jpg',
    },
    {
      date: 'JUNE 2026',
      tag: 'DESIGN',
      title: 'The Unbearable Weight of Silence: Designing Sanctuary in Urban Centres',
      excerpt:
        'Reclaiming mental stillness through acoustic stone mass, shielded perimeter walls, and interior courtyard voids.',
      readTime: '05 MIN READ',
      image: '/images/projects/project-kyoto.jpg',
    },
  ];

  return (
    <section id="journal" className="py-28 md:py-36 bg-[#F2EFE9] text-[#141414] border-t border-[#E2DDD5] overflow-hidden">
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
              04 / MONOGRAPH JOURNAL
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-[#141414] leading-[1.06] tracking-tight">
              CRITICAL <span className="editorial-italic font-normal text-[#9E7D47]">DISPATCHES</span>
            </h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.26em] text-[#736B61] hover:text-[#141414] transition-colors font-light"
          >
            <span>Read All Essays</span>
            <ArrowUpRight strokeWidth={1.25} className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        {/* 3 Editorial Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 pt-12">
          {articles.map((item, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="group space-y-5 flex flex-col justify-between bg-[#F9F8F6] p-6 md:p-7 border border-[#E2DDD5] hover:border-[#141414]/30 transition-all duration-500 shadow-sm"
            >
              <div className="space-y-4">
                {/* Visual */}
                <div className="relative h-60 md:h-64 overflow-hidden border border-[#E2DDD5] bg-[#EAE6DF]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3.5 left-3.5 px-2.5 py-1 bg-[#F9F8F6]/95 backdrop-blur-md text-[9px] uppercase tracking-[0.24em] text-[#9E7D47] font-light border border-[#E2DDD5]">
                    {item.tag}
                  </div>
                </div>

                {/* Metadata */}
                <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.24em] text-[#8C8478] font-light">
                  <span>{item.date}</span>
                  <span>{item.readTime}</span>
                </div>

                {/* Heading */}
                <h3 className="font-serif text-xl md:text-2xl font-light text-[#141414] group-hover:text-[#9E7D47] transition-colors leading-snug">
                  {item.title}
                </h3>

                {/* Excerpt */}
                <p className="text-[#5A554D] text-xs font-light leading-relaxed">
                  {item.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E2DDD5]">
                <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-[#141414] group-hover:text-[#9E7D47] font-light transition-colors">
                  Read Essay
                  <ArrowUpRight strokeWidth={1.25} className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
