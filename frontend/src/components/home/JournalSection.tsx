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
    <section id="journal" className="py-32 bg-[#F2EFE9] text-[#141414] border-t border-[#E2DDD5] overflow-hidden">
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
              Dispatches &amp; Monograph Thoughts
            </span>
            <h2 className="section-heading text-ink">JOURNAL</h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-stoneCaption hover:text-ink transition-colors font-medium"
          >
            <span>Read All Essays</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        {/* 3 Editorial Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12">
          {articles.map((item, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="group space-y-6 flex flex-col justify-between bg-[#F9F8F6] p-7 border border-[#E2DDD5] shadow-sm hover:shadow-md transition-all"
            >
              <div className="space-y-4">
                {/* Visual */}
                <div className="relative h-64 md:h-72 overflow-hidden border border-[#E2DDD5]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#F9F8F6]/95 backdrop-blur-md text-[9px] uppercase tracking-[0.25em] text-bronze font-medium border border-[#E2DDD5]">
                    {item.tag}
                  </div>
                </div>

                {/* Metadata */}
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-stoneCaption">
                  <span>{item.date}</span>
                  <span>{item.readTime}</span>
                </div>

                {/* Heading */}
                <h3 className="font-serif text-xl md:text-2xl font-light text-ink group-hover:text-bronze transition-colors leading-snug">
                  {item.title}
                </h3>

                {/* Excerpt */}
                <p className="text-graphite text-xs md:text-sm font-light leading-relaxed">
                  {item.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E2DDD5]">
                <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-ink group-hover:text-bronze font-medium">
                  Read Essay
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
