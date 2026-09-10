'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Compass, Maximize2 } from 'lucide-react';
import { Project } from '../../types';
import { fallbackProjects } from '../../lib/api';

interface ProjectsMonographProps {
  projects?: Project[];
}

export default function ProjectsMonograph({ projects: propProjects }: ProjectsMonographProps) {
  const allProjects = propProjects && propProjects.length > 0 ? propProjects : fallbackProjects;
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Residential', 'Cultural', 'Commercial', 'Hospitality'];

  const filteredProjects =
    selectedCategory === 'All'
      ? allProjects
      : allProjects.filter(
          (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  const activeProjects = filteredProjects.length > 0 ? filteredProjects : allProjects;

  return (
    <section
      id="selected-works"
      className="relative w-full py-24 md:py-36 bg-[#F9F8F6] text-[#141414] overflow-hidden"
    >
      {/* Background Decorative Gridlines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-12 md:pb-16 border-b border-[#E2DDD5] gap-8">
          <div className="space-y-4 max-w-2xl">
            <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-[#141414] leading-[1.08] tracking-tight">
              SELECTED <span className="editorial-italic font-normal text-[#9E7D47]">COMMISSIONS</span>
            </h2>
            <p className="text-[#6E685F] text-sm md:text-base font-light leading-relaxed max-w-xl">
              Each commission represents an uncompromising investigation into spatial weight, materiality, and the interplay between natural light and architectural void.
            </p>
          </div>

          {/* Category Filter Pills & Archive Link */}
          <div className="flex flex-wrap items-center gap-3 self-start md:self-center shrink-0 md:-translate-y-3">
            <div className="inline-flex items-center gap-1 p-1 bg-white border border-[#E2DDD5] rounded-full shadow-sm max-w-full overflow-x-auto">
              {categories.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`relative px-3.5 py-1.5 rounded-full text-[11px] uppercase tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'text-white font-medium shadow-sm'
                        : 'text-[#6E685F] hover:text-[#141414]'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeMonographFilter"
                        className="absolute inset-0 bg-[#141414] rounded-full"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{category}</span>
                  </button>
                );
              })}
            </div>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-4 py-2 text-[11px] uppercase tracking-[0.2em] border border-[#141414]/20 hover:border-[#141414] hover:bg-[#141414] hover:text-white transition-all duration-300 font-medium rounded-full whitespace-nowrap shrink-0 shadow-sm"
            >
              <Compass className="w-3.5 h-3.5 text-[#9E7D47]" />
              <span>Full Archive ({allProjects.length})</span>
            </Link>
          </div>
        </div>

        {/* Projects Monograph: Revealed One by One with Scroll-Triggered Luxury Animations */}
        <div className="pt-20 md:pt-28 space-y-32 md:space-y-48">
          <AnimatePresence mode="popLayout">
            {activeProjects.map((project, idx) => {
              const isEven = idx % 2 === 0;
              const formattedIndex = (idx + 1).toString().padStart(2, '0');
              const totalCount = activeProjects.length.toString().padStart(2, '0');

              return (
                <motion.article
                  key={project.slug || idx}
                  initial={{ opacity: 0, y: 70 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="group relative"
                >
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                      isEven ? '' : 'lg:flex-row-reverse'
                    }`}
                  >
                    {/* Project Image Column */}
                    <div
                      className={`lg:col-span-7 relative ${
                        isEven ? 'lg:order-1' : 'lg:order-2'
                      }`}
                    >
                      <Link
                        href={`/projects/${project.slug}`}
                        className="block relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-sm bg-[#EAE6DF] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-[#E2DDD5]/70 group-hover:shadow-[0_25px_60px_rgba(0,0,0,0.16)] transition-all duration-700"
                      >
                        <Image
                          src={project.coverImage}
                          alt={project.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          priority={idx < 2}
                          className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                        />
                      </Link>
                    </div>

                    {/* Project Editorial Information Column */}
                    <div
                      className={`lg:col-span-5 space-y-6 ${
                        isEven ? 'lg:order-2 lg:pl-4' : 'lg:order-1 lg:pr-4'
                      }`}
                    >
                      {/* Numerals */}
                      <div className="border-b border-[#E2DDD5] pb-4">
                        <span className="font-serif text-3xl sm:text-4xl text-[#9E7D47] font-light">
                          {formattedIndex}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#141414] leading-[1.12] tracking-tight group-hover:text-[#9E7D47] transition-colors duration-300">
                        <Link href={`/projects/${project.slug}`}>
                          {project.title}
                        </Link>
                      </h3>

                      {/* Area & Specifications if available */}
                      {project.area && (
                        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#9E7D47] font-medium">
                          <Maximize2 className="w-3 h-3" />
                          <span>Footprint: {project.area}</span>
                        </div>
                      )}

                      {/* Synopsis Narrative */}
                      <p className="text-[#6E685F] text-sm sm:text-base font-light leading-relaxed">
                        {project.description}
                      </p>

                      {/* Story extract if available */}
                      {project.story && (
                        <p className="text-xs text-[#8A847A] italic font-serif leading-relaxed line-clamp-2 border-l-2 border-[#9E7D47]/40 pl-3">
                          &ldquo;{project.story}&rdquo;
                        </p>
                      )}

                      {/* Services Pills */}
                      {project.services && project.services.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 pt-2">
                          {project.services.slice(0, 3).map((service, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] bg-[#EAE6DF]/70 text-[#4A453E] border border-[#D8D2C7] rounded-none"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Direct CTA */}
                      <div className="pt-4">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="inline-flex items-center gap-3 px-8 py-4 bg-[#141414] text-white hover:bg-[#9E7D47] hover:text-[#141414] transition-all duration-300 text-xs uppercase tracking-[0.24em] font-medium group/btn shadow-lg"
                        >
                          <span>Explore Project Monograph</span>
                          <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom Archive Banner */}
        <div className="mt-28 md:mt-40 p-10 md:p-16 bg-white border border-[#E2DDD5] flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] uppercase tracking-[0.32em] text-[#9E7D47] font-medium">
              Comprehensive Portfolio
            </span>
            <h4 className="font-serif text-2xl sm:text-3xl font-light text-[#141414]">
              Explore the Complete Atelier Archive
            </h4>
            <p className="text-[#6E685F] text-xs sm:text-sm font-light">
              View all residential, cultural, and commercial commissions spanning 2020–2026.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#141414] text-white hover:bg-[#9E7D47] hover:text-[#141414] transition-all duration-300 text-xs uppercase tracking-[0.24em] font-medium whitespace-nowrap shadow-xl"
          >
            <span>View All {allProjects.length} Commissions</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
