'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function PhilosophySection() {
  const pillars = [
    {
      num: '01',
      title: 'VISION',
      subtitle: 'The Architecture of Time',
      description:
        'We perceive space not as void, but as a living instrument of light and human consciousness. Every form emerges from radical dialogue with topography, sun orientation, and regional geology.',
      image: '/images/projects/project-monolith.jpg',
    },
    {
      num: '02',
      title: 'PRECISION',
      subtitle: 'Material Authenticity',
      description:
        'Cast concrete, patinated bronze, structural glass, and hand-finished stone. We strip away superfluous ornamentation to reveal raw tactile substance and structural honesty.',
      image: '/images/hero/hero-entrance.jpg',
    },
    {
      num: '03',
      title: 'PURPOSE',
      subtitle: 'Permanence & Ecology',
      description:
        'Our buildings are engineered to endure generations. By integrating passive thermodynamic principles, courtyard cross-ventilation, and reflection cooling basins, we create buildings that live in ecological harmony.',
      image: '/images/projects/project-kyoto.jpg',
    },
  ];

  return (
    <section className="py-28 md:py-36 bg-[#F9F8F6] text-[#141414] border-t border-[#E2DDD5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between pb-16 md:pb-20 border-b border-[#E2DDD5] gap-8"
        >
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.32em] text-[#9E7D47] font-light block">
              02 / FOUNDATIONAL ETHOS
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-[#141414] leading-[1.06] tracking-tight max-w-2xl">
              SPATIAL PROPORTION &amp;
              <br />
              <span className="editorial-italic font-normal text-[#9E7D47]">PERMANENCE.</span>
            </h2>
          </div>
          <p className="text-[#6E685F] text-xs sm:text-sm font-light max-w-md leading-relaxed">
            Architecture is the deliberate containment of light, silence, and matter. We craft sanctuaries that age with dignity across centuries.
          </p>
        </motion.div>

        {/* 3 Editorial Pillars */}
        <div className="divide-y divide-[#E2DDD5]">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="py-14 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center group"
            >
              {/* Pillar Number & Title */}
              <div className="lg:col-span-4 space-y-2.5">
                <span className="font-serif text-2xl sm:text-3xl text-[#9E7D47] block font-light">
                  {pillar.num} <span className="text-xs font-sans font-light text-[#C2BBB0]">/ 03</span>
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl text-[#141414] font-light tracking-tight group-hover:text-[#9E7D47] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-[10px] uppercase tracking-[0.26em] text-[#8C8478] font-light">
                  {pillar.subtitle}
                </p>
              </div>

              {/* Pillar Narrative */}
              <div className="lg:col-span-4">
                <p className="text-[#5A554D] text-xs sm:text-sm font-light leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              {/* Architectural Plate */}
              <div className="lg:col-span-4 relative h-56 md:h-72 overflow-hidden border border-[#E2DDD5] bg-[#EAE6DF]">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  className="object-cover object-center filter grayscale contrast-[0.95] group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-105 transition-all duration-700"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
