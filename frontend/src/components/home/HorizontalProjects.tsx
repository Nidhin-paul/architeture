'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, Compass, Sparkles } from 'lucide-react';
import { Project } from '../../types';
import { fallbackProjects } from '../../lib/api';

interface HorizontalProjectsProps {
  projects: Project[];
}

export default function HorizontalProjects({ projects: propProjects }: HorizontalProjectsProps) {
  const allProjects = propProjects && propProjects.length > 0 ? propProjects : fallbackProjects;
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = ['All', 'Residential', 'Cultural', 'Commercial', 'Hospitality'];

  const filteredProjects =
    selectedCategory === 'All'
      ? allProjects
      : allProjects.filter(
          (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  const activeProjects = filteredProjects.length > 0 ? filteredProjects : allProjects;

  // Track scroll position to update active index indicator
  const handleScroll = () => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const cardWidth = track.firstElementChild ? (track.firstElementChild as HTMLElement).offsetWidth + 32 : 400;
    const active = Math.round(track.scrollLeft / cardWidth);
    setCurrentIndex(Math.min(Math.max(active, 0), activeProjects.length - 1));
  };

  const scrollByDirection = (direction: 'prev' | 'next') => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const cardWidth = track.firstElementChild ? (track.firstElementChild as HTMLElement).offsetWidth + 32 : 500;
    const scrollAmount = direction === 'next' ? cardWidth : -cardWidth;
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  // Enable smooth horizontal wheel scroll on the projects track
  const handleWheel = (e: React.WheelEvent) => {
    if (!trackRef.current) return;
    // If predominantly vertical scroll, scroll horizontally through cards if not at edges
    const isAtEnd =
      trackRef.current.scrollLeft + trackRef.current.clientWidth >=
      trackRef.current.scrollWidth - 10;
    const isAtStart = trackRef.current.scrollLeft <= 5;

    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      if ((e.deltaY > 0 && !isAtEnd) || (e.deltaY < 0 && !isAtStart)) {
        trackRef.current.scrollLeft += e.deltaY * 0.9;
      }
    }
  };

  return (
    <section
      id="projects-showcase"
      className="relative w-full py-20 md:py-28 bg-[#F9F8F6] text-[#141414] border-t border-[#E2DDD5]"
    >
      <div className="max-w-[1700px] mx-auto">
        {/* Section Header & Architectural Category Tabs */}
        <div className="px-6 md:px-16 flex flex-col md:flex-row md:items-end justify-between pb-12 gap-8 border-b border-[#E2DDD5]">
          <div className="space-y-3">
            <h2 className="section-heading text-[#141414]">
              SELECTED WORKS
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    if (trackRef.current) trackRef.current.scrollLeft = 0;
                  }}
                  className={`relative px-4 py-2 text-[11px] uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'text-white font-semibold shadow-md'
                      : 'text-[#141414]/70 hover:text-[#141414] border border-[#E2DDD5] bg-white/60'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterTab"
                      className="absolute inset-0 bg-[#9E7D47]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>

          {/* Controls: Prev / Next & View All */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-muted tracking-widest mr-2 hidden sm:inline">
              {(currentIndex + 1).toString().padStart(2, '0')} /{' '}
              {activeProjects.length.toString().padStart(2, '0')}
            </span>
            <button
              onClick={() => scrollByDirection('prev')}
              className="p-3 rounded-full border border-[#E2DDD5] bg-white hover:border-bronze hover:text-bronze transition-colors text-[#141414] cursor-pointer shadow-sm disabled:opacity-30"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollByDirection('next')}
              className="p-3 rounded-full border border-[#E2DDD5] bg-white hover:border-bronze hover:text-bronze transition-colors text-[#141414] cursor-pointer shadow-sm disabled:opacity-30"
              aria-label="Next project"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <Link
              href="/projects"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-widest border border-[#E2DDD5] bg-white hover:border-bronze hover:text-bronze transition-colors ml-2 shadow-sm font-medium"
            >
              <Compass className="w-3.5 h-3.5 text-bronze" />
              <span>Full Archive ({allProjects.length})</span>
            </Link>
          </div>
        </div>

        {/* Main Horizontal Carousel Track */}
        <div className="pt-10 overflow-hidden">
          <div
            ref={trackRef}
            onScroll={handleScroll}
            onWheel={handleWheel}
            className="flex items-center gap-6 sm:gap-8 overflow-x-auto scroll-smooth pl-6 md:pl-16 pr-24 py-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {activeProjects.map((project, index) => {
              const formattedIndex = (index + 1).toString().padStart(2, '0');

              return (
                <motion.div
                  key={project.slug || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  className="project-slide relative shrink-0 w-[84vw] sm:w-[68vw] lg:w-[54vw] max-w-[880px] h-[68vh] min-h-[480px] max-h-[680px] flex flex-col justify-between p-6 sm:p-10 border border-[#E2DDD5] hover:border-bronze/60 bg-white shadow-[0_15px_40px_rgba(20,20,20,0.06)] group overflow-hidden transition-all duration-500"
                  data-cursor="project"
                >
                  {/* Architectural Photography Image */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      priority={index < 2}
                      className="project-image object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/90 via-[#141414]/40 to-transparent opacity-80 group-hover:opacity-65 transition-opacity" />
                  </div>

                  {/* Slide Header: Index + Category */}
                  <div className="relative z-10 flex justify-between items-start">
                    <span className="font-serif text-4xl sm:text-6xl font-light text-bronze drop-shadow">
                      {formattedIndex}
                    </span>
                    <span className="px-3.5 py-1 text-[10px] uppercase tracking-[0.22em] border border-white/30 text-white bg-[#181614]/75 backdrop-blur-md font-medium">
                      {project.category}
                    </span>
                  </div>

                  {/* Slide Footer: Specifications & Direct Link */}
                  <div className="project-meta relative z-10 space-y-3">
                    <div className="text-[10px] sm:text-xs uppercase tracking-[0.24em] text-white/90 flex items-center gap-3 font-light">
                      <span>{project.location}</span>
                      <span>·</span>
                      <span>{project.year}</span>
                      <span>·</span>
                      <span>{project.area}</span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-light leading-tight group-hover:text-champagne transition-colors drop-shadow">
                      {project.title}
                    </h3>

                    <p className="text-white/85 text-xs sm:text-sm font-light max-w-xl line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="pt-2">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-3 px-6 py-2.5 bg-white text-ink hover:bg-bronze hover:text-white transition-all text-xs uppercase tracking-[0.24em] font-medium group/btn cursor-pointer shadow-lg"
                      >
                        <span>View Project</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Final Slide: Explore Full Monograph */}
            <motion.div
              whileHover={{ y: -8, scale: 1.01 }}
              className="shrink-0 w-[80vw] sm:w-[42vw] max-w-[440px] h-[68vh] min-h-[480px] max-h-[680px] flex flex-col justify-center items-center text-center p-8 sm:p-12 border border-[#E2DDD5] bg-[#F2EFE9] shadow-[0_15px_40px_rgba(20,20,20,0.05)] relative overflow-hidden group"
            >
              <div className="relative z-10 space-y-6">
                <span className="px-3.5 py-1 text-[10px] uppercase tracking-[0.3em] text-bronze border border-bronze/40 bg-white inline-flex items-center gap-2 font-medium">
                  <Sparkles className="w-3 h-3 text-bronze" />
                  <span>Curated Archive</span>
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-light text-ink leading-snug">
                  EXPLORE COMPLETE
                  <br />
                  <span className="editorial-italic font-normal text-bronzeAntique">MONOGRAPH</span>
                </h3>
                <p className="text-stoneMuted text-xs font-light max-w-xs leading-relaxed">
                  Access our private international monograph of luxury residences, civic landmarks, and spatial research.
                </p>
                <div className="pt-4">
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-ink text-white hover:bg-bronze transition-all text-xs uppercase tracking-[0.24em] font-medium shadow-xl"
                  >
                    <span>All Works ({allProjects.length})</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Editorial Guidance */}
        <div className="px-6 md:px-16 pt-8 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-muted">
          <span>Swipe horizontally or use arrow buttons</span>
          <span className="text-bronze">Click any card to inspect architectural drawings</span>
          <Link href="/projects" className="hover:text-[#141414] transition-colors font-medium">
            Monograph Index →
          </Link>
        </div>
      </div>
    </section>
  );
}
