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
    <section className="py-32 bg-[#F9F8F6] text-ink border-t border-[#E2DDD5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between pb-20 border-b border-[#E2DDD5] gap-8"
        >
          <div>
            <span className="eyebrow block mb-4">
              Studio Philosophy
            </span>
            <h2 className="section-heading text-ink max-w-2xl">
              WE DESIGN SPACES
              <br />
              <span className="editorial-italic text-bronzeAntique font-normal">THAT ENDURE.</span>
            </h2>
          </div>
          <p className="text-graphite text-xs md:text-sm font-light max-w-md leading-relaxed">
            Architecture is more than the buildings we construct. It is how human beings experience silence, space, light, material, and time.
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
              className="py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center group"
            >
              {/* Pillar Number & Title */}
              <div className="lg:col-span-4 space-y-3">
                <span className="font-serif text-4xl md:text-5xl text-bronze block font-light">
                  {pillar.num}
                </span>
                <h3 className="font-serif text-3xl md:text-5xl text-ink font-light tracking-tight group-hover:text-bronze transition-colors">
                  {pillar.title}
                </h3>
                <p className="caption-stone text-stoneCaption">
                  {pillar.subtitle}
                </p>
              </div>

              {/* Pillar Narrative */}
              <div className="lg:col-span-4">
                <p className="text-graphite text-sm md:text-base font-light leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              {/* Architectural Plate */}
              <div className="lg:col-span-4 relative h-64 md:h-80 overflow-hidden border border-[#E2DDD5] shadow-sm">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  className="object-cover object-center filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-[#181614]/5 group-hover:bg-transparent transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
