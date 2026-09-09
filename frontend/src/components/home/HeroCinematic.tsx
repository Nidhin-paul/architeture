'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue } from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import BuildingScene from '../3d/BuildingScene';
import { Project } from '../../types';
import { fallbackProjects } from '../../lib/api';

interface HeroCinematicProps {
  projects?: Project[];
}

interface ProjectSlideProps {
  project: Project;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}

function ProjectGallerySlide({ project, index, total, scrollYProgress }: ProjectSlideProps) {
  const step = 0.56 / total;
  const start = 0.36 + index * step;
  const end = start + step;
  const pad = Math.min(0.02, step * 0.25);

  const opacity = useTransform(
    scrollYProgress,
    [start - pad, start + pad, end - pad, end + pad],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [start - pad, start + pad, end - pad, end + pad],
    [40, 0, 0, -40]
  );

  const scale = useTransform(
    scrollYProgress,
    [start - pad, start + pad, end - pad, end + pad],
    [0.96, 1, 1, 1.03]
  );

  const formattedIndex = (index + 1).toString().padStart(2, '0');
  const formattedTotal = total.toString().padStart(2, '0');

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="absolute inset-0 flex items-center justify-center p-6 md:p-12 lg:p-16 pointer-events-none"
    >
      <div className="relative w-full max-w-6xl h-[70vh] sm:h-[72vh] max-h-[720px] rounded-sm overflow-hidden border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.6)] flex flex-col justify-between p-6 sm:p-10 lg:p-12">
        {/* Project Background Image */}
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          priority={index < 2}
          className="object-cover object-center"
        />
        {/* Vignette Overlay for Crisp Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/50" />

        {/* Top Meta Bar */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1.5 bg-black/60 backdrop-blur-md border border-[#E5C378]/40 text-[#E5C378] text-[10px] sm:text-xs uppercase tracking-[0.28em] font-medium">
              EXHIBITION PLATE {formattedIndex} / {formattedTotal}
            </span>
            <span className="hidden sm:inline-block px-3 py-1 bg-white/10 backdrop-blur-md text-white text-[10px] uppercase tracking-[0.22em] font-light border border-white/20">
              {project.category}
            </span>
          </div>

          <span className="font-serif text-3xl sm:text-4xl text-[#E5C378] font-light drop-shadow">
            {formattedIndex}
          </span>
        </div>

        {/* Bottom Project Specifications & Link */}
        <div className="relative z-10 max-w-2xl space-y-3 pointer-events-auto">
          <div className="text-[10px] sm:text-xs uppercase tracking-[0.26em] text-white/80 flex flex-wrap items-center gap-2 sm:gap-3 drop-shadow">
            <span>{project.location}</span>
            <span>·</span>
            <span>{project.year}</span>
            {project.area && (
              <>
                <span>·</span>
                <span>{project.area}</span>
              </>
            )}
          </div>

          <h3 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-light leading-tight drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
            {project.title}
          </h3>

          <p className="text-white/85 text-xs sm:text-sm md:text-base font-light line-clamp-2 sm:line-clamp-3 leading-relaxed max-w-xl drop-shadow">
            {project.description}
          </p>

          <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-4">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-[#181614] hover:bg-[#E5C378] hover:text-[#181614] transition-all duration-300 text-xs uppercase tracking-[0.24em] font-medium shadow-2xl group"
            >
              <span>Explore Case Study</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            <span className="text-[10px] uppercase tracking-[0.22em] text-white/70 hidden md:inline-block">
              Scroll down for next project ↓
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function HeroCinematic({ projects = fallbackProjects }: HeroCinematicProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const items = projects && projects.length > 0 ? projects : fallbackProjects;
  const totalProjects = items.length;

  // 1. Framer Motion Scroll Pipeline across 520vh
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Relay progress to Three.js BuildingScene & state
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setScrollProgress(latest);
  });

  // 2. Stage 1: Initial Editorial Hero Typography (0% -> 10%)
  const textOpacity = useTransform(scrollYProgress, [0, 0.07, 0.10], [1, 0.4, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.10], [0, -50]);
  const textScale = useTransform(scrollYProgress, [0, 0.10], [1, 0.96]);

  // 3. Stage 2: Camera Zoom to Building Entrance (8% -> 25%)
  const buildingScale = useTransform(scrollYProgress, [0.06, 0.25], [1.0, 3.2]);
  const buildingOpacity = useTransform(scrollYProgress, [0.22, 0.32], [1, 0]);

  // 4. Stage 3: Entrance Portal Close-Up (18% -> 36%)
  const entranceOpacity = useTransform(
    scrollYProgress,
    [0.16, 0.22, 0.32, 0.36],
    [0, 1, 1, 0]
  );
  const entranceScale = useTransform(scrollYProgress, [0.18, 0.36], [1.0, 1.4]);

  // 5. Stage 4: Physical 2.5D Double Doors Pivot (24% -> 35%)
  const leftDoorRotateY = useTransform(scrollYProgress, [0.24, 0.34], [0, -84]);
  const rightDoorRotateY = useTransform(scrollYProgress, [0.24, 0.34], [0, 84]);
  const doorsOpacity = useTransform(scrollYProgress, [0.22, 0.25, 0.33, 0.36], [0, 1, 1, 0]);

  // 6. Stage 5: Interior Space Reveal & Second Window (32% -> 96%)
  const interiorOpacity = useTransform(
    scrollYProgress,
    [0.30, 0.36, 0.94, 0.98],
    [0, 1, 1, 0]
  );
  const interiorScale = useTransform(scrollYProgress, [0.30, 0.42], [1.12, 1.0]);

  // 7. Telemetry HUD (Active during zoom & entrance 12% -> 34%)
  const hudOpacity = useTransform(
    scrollYProgress,
    [0.10, 0.16, 0.30, 0.34],
    [0, 1, 1, 0]
  );

  // Active project calculation for gallery HUD
  const isInsideGallery = scrollProgress >= 0.35 && scrollProgress <= 0.95;
  const galleryProgress = Math.max(0, Math.min(1, (scrollProgress - 0.36) / 0.56));
  const activeIndex = Math.min(totalProjects - 1, Math.floor(galleryProgress * totalProjects));

  // Navigation handler to smoothly scroll to any project
  const scrollToProject = (index: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const containerTop = scrollTop + rect.top;
    const scrollableDistance = container.offsetHeight - window.innerHeight;

    const step = 0.56 / totalProjects;
    const targetProgress = 0.36 + index * step + step * 0.3;
    const targetY = containerTop + targetProgress * scrollableDistance;

    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  };

  return (
    <div ref={containerRef} className="relative w-full h-[520vh] bg-[#F9F8F6] select-none">
      {/* Sticky Fullscreen Viewport Frame */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Layer 1: Three.js Realtime 3D Scene */}
        <div className="absolute inset-0 z-0 opacity-90">
          <BuildingScene scrollProgress={scrollProgress} />
        </div>

        {/* Layer 2: Main 8K Architectural Building (Zooms into the entrance) */}
        <motion.div
          style={{
            scale: buildingScale,
            opacity: buildingOpacity,
            transformOrigin: '38% 56%',
          }}
          className="absolute inset-0 z-10 pointer-events-none will-change-transform"
        >
          <Image
            src="/images/hero/hero-building.jpg"
            alt="Atelier Vanguard Architectural Pavilion"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </motion.div>

        {/* Layer 3: Entrance Portal Close-Up */}
        <motion.div
          style={{
            opacity: entranceOpacity,
            scale: entranceScale,
          }}
          className="absolute inset-0 z-20 pointer-events-none will-change-transform overflow-hidden"
        >
          <Image
            src="/images/hero/hero-entrance.jpg"
            alt="Building Entrance Portal"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/25" />

          {/* 2.5D Physical Double Doors Pivot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[36vw] max-w-[440px] h-[60vh] flex [perspective:1000px]">
              {/* Left Door */}
              <motion.div
                style={{
                  rotateY: leftDoorRotateY,
                  opacity: doorsOpacity,
                  transformOrigin: 'left center',
                }}
                className="w-1/2 h-full bg-gradient-to-r from-[#9E7D47] via-[#B38E54] to-[#C5A880] border-r border-[#7C6237]/60 shadow-2xl will-change-transform relative"
              >
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-32 bg-[#EAD7B8] rounded-full shadow-lg" />
              </motion.div>

              {/* Right Door */}
              <motion.div
                style={{
                  rotateY: rightDoorRotateY,
                  opacity: doorsOpacity,
                  transformOrigin: 'right center',
                }}
                className="w-1/2 h-full bg-gradient-to-l from-[#9E7D47] via-[#B38E54] to-[#C5A880] border-l border-[#7C6237]/60 shadow-2xl will-change-transform relative"
              >
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-32 bg-[#EAD7B8] rounded-full shadow-lg" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Layer 4: Interior Space Reveal & Second Window (One by One Projects Showcase) */}
        <motion.div
          style={{
            opacity: interiorOpacity,
            scale: interiorScale,
          }}
          className="absolute inset-0 z-25 will-change-transform overflow-hidden"
        >
          {/* Interior Gallery Backdrop */}
          <Image
            src="/images/hero/hero-interior.jpg"
            alt="Interior Architectural Gallery"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/85" />

          {/* Projects Revealed One by One while Scrolling */}
          <div className="absolute inset-0">
            {items.map((project, idx) => (
              <ProjectGallerySlide
                key={project.slug || idx}
                project={project}
                index={idx}
                total={totalProjects}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>

          {/* Second Window HUD: Gallery Navigation & Progress Indicators */}
          {isInsideGallery && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute bottom-6 md:bottom-8 inset-x-6 md:inset-x-12 z-30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs pointer-events-auto"
            >
              {/* Left Brand Badge */}
              <div className="hidden sm:flex items-center gap-3 text-white/80">
                <span className="text-[10px] uppercase tracking-[0.28em] text-[#E5C378] font-medium">
                  ARCHITECTURAL MONOGRAPH
                </span>
                <span className="text-white/40">·</span>
                <span className="text-[10px] uppercase tracking-[0.2em]">
                  CONTINUOUS FILM EXHIBITION
                </span>
              </div>

              {/* Center: Numbered Pills (Clickable to jump) */}
              <div className="flex items-center gap-2 p-1.5 bg-black/60 backdrop-blur-md border border-white/20 rounded-full shadow-xl">
                <button
                  onClick={() => scrollToProject(Math.max(0, activeIndex - 1))}
                  disabled={activeIndex === 0}
                  className="p-1.5 rounded-full text-white/70 hover:text-white disabled:opacity-30 cursor-pointer"
                  aria-label="Previous Project"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {items.map((_, i) => {
                  const isActive = activeIndex === i;
                  return (
                    <button
                      key={i}
                      onClick={() => scrollToProject(i)}
                      className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#E5C378] text-[#181614] font-bold shadow-md scale-105'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {(i + 1).toString().padStart(2, '0')}
                    </button>
                  );
                })}

                <button
                  onClick={() => scrollToProject(Math.min(totalProjects - 1, activeIndex + 1))}
                  disabled={activeIndex === totalProjects - 1}
                  className="p-1.5 rounded-full text-white/70 hover:text-white disabled:opacity-30 cursor-pointer"
                  aria-label="Next Project"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Right: Quick Monograph Link */}
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white hover:text-[#181614] backdrop-blur-md border border-white/30 text-white transition-all duration-300 text-[10px] uppercase tracking-[0.22em] font-medium"
                >
                  <span>All Commissions ({totalProjects})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Layer 5: Initial Editorial Hero Typography (Active ONLY at start, unmounts cleanly) */}
        {scrollProgress < 0.12 && (
          <motion.div
            style={{
              opacity: textOpacity,
              y: textY,
              scale: textScale,
            }}
            className="absolute inset-0 z-30 flex flex-col justify-between px-6 md:px-12 lg:px-20 pt-24 pb-6 md:pb-10 pointer-events-none"
          >
            {/* Top Tagline */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] md:text-xs tracking-[0.32em] uppercase text-[#E5C378] font-medium drop-shadow-md">
                Architecture That Defines
              </span>
              <span className="text-[10px] md:text-xs tracking-[0.26em] uppercase text-white/80 hidden sm:inline-block drop-shadow-md">
                Volume · Materiality · Void
              </span>
            </div>

            {/* Main Editorial Hero Headings & CTAs */}
            <div className="max-w-3xl my-auto space-y-3 sm:space-y-4">
              <h1 className="font-serif font-light text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.02] tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]">
                ARCHITECTURE
                <br />
                <span className="editorial-italic font-normal text-[#E5C378] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                  THAT INSPIRES.
                </span>
                <br />
                SPACES THAT LIVE.
              </h1>

              <p className="text-white/90 text-xs sm:text-sm md:text-base tracking-[0.18em] uppercase max-w-xl font-light leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                Bespoke brutalist residences, monumental cultural beacons, and transcendent spatial forms.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2 sm:pt-4 pointer-events-auto">
                <button
                  onClick={() => scrollToProject(0)}
                  className="inline-flex items-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 bg-white text-[#181614] hover:bg-[#E5C378] hover:text-[#181614] transition-all duration-300 text-xs uppercase tracking-[0.24em] font-medium group shadow-2xl cursor-pointer"
                >
                  <span>Explore Projects</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="#services"
                  className="inline-flex items-center gap-3 px-6 sm:px-7 py-3.5 sm:py-4 border border-white/40 text-white hover:bg-white hover:text-[#181614] transition-all duration-300 text-xs uppercase tracking-[0.24em] font-medium bg-black/25 backdrop-blur-md shadow-xl"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Watch Showreel</span>
                </a>
              </div>
            </div>

            {/* Bottom Scroll Prompt */}
            <div className="flex flex-col items-center justify-center gap-2 pt-2">
              <span className="text-[9px] md:text-[10px] tracking-[0.35em] uppercase text-white/80 font-medium drop-shadow-md">
                Scroll To Step Through The Doors
              </span>
              <div className="w-7 h-7 rounded-full border border-white/40 flex items-center justify-center text-white animate-bounce bg-black/20 backdrop-blur-sm shadow-md">
                <ArrowDown className="w-3 h-3" />
              </div>
            </div>
          </motion.div>
        )}

        {/* Layer 6: Architectural Telemetry HUD (During Zoom to Entrance) */}
        <motion.div
          style={{ opacity: hudOpacity }}
          className="absolute inset-x-8 md:inset-x-20 bottom-12 z-30 flex justify-between items-end text-[10px] font-mono tracking-widest text-white/80 uppercase pointer-events-none drop-shadow-md"
        >
          <div className="space-y-1">
            <p className="text-[#E5C378] font-sans font-medium text-xs tracking-[0.22em]">
              MONOLITH SANCTUARY · ENTRANCE PORTAL
            </p>
            <p>LAT: 9.9312° N · LON: 76.2673° E</p>
            <p>MATERIAL: LIMESTONE TRAVERTINE &amp; CHAMPAGNE BRONZE</p>
          </div>
          <div className="text-right space-y-1">
            <p className="text-white font-sans font-medium tracking-[0.2em]">
              DOORS PIVOTING OPEN
            </p>
            <p className="text-[#E5C378] font-mono">
              STEPPING INTO INTERIOR GALLERY →
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
