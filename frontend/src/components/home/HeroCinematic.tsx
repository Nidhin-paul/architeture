'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ArrowDown, ArrowRight, Play } from 'lucide-react';
import BuildingScene from '../3d/BuildingScene';

export default function HeroCinematic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Framer Motion Scroll Pipeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Relay progress to Three.js BuildingScene
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setScrollProgress(latest);
  });

  // 1. Initial Editorial Hero Typography (0% -> 20%)
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -80]);
  const textScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  // 2. Building Zoom into Entrance Portal (0% -> 65%)
  const buildingScale = useTransform(scrollYProgress, [0, 0.65], [1, 3.0]);
  const buildingOpacity = useTransform(scrollYProgress, [0.65, 0.82], [1, 0.2]);

  // 3. Entrance Portal Close-Up (fades in 32% -> 88%)
  const entranceOpacity = useTransform(
    scrollYProgress,
    [0.32, 0.48, 0.78, 0.88],
    [0, 1, 1, 0]
  );
  const entranceScale = useTransform(scrollYProgress, [0.32, 0.85], [1, 1.35]);

  // 4. Physical 2.5D Double Doors Pivot (52% -> 82%)
  const leftDoorRotateY = useTransform(scrollYProgress, [0.52, 0.8], [0, -78]);
  const rightDoorRotateY = useTransform(scrollYProgress, [0.52, 0.8], [0, 78]);
  const doorsOpacity = useTransform(scrollYProgress, [0.52, 0.8, 0.86], [1, 0.9, 0]);

  // 5. Interior Space Reveal (glides in 68% -> 100%)
  const interiorOpacity = useTransform(scrollYProgress, [0.68, 0.85], [0, 1]);
  const interiorScale = useTransform(scrollYProgress, [0.68, 1], [1.15, 1.0]);

  // 6. Telemetry HUD (active between 22% -> 88%)
  const hudOpacity = useTransform(
    scrollYProgress,
    [0.22, 0.32, 0.82, 0.9],
    [0, 1, 1, 0]
  );

  return (
    <div ref={containerRef} className="relative w-full h-[260vh] bg-[#F9F8F6] select-none">
      {/* Sticky Fullscreen Frame */}
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#F9F8F6]/80 via-transparent to-[#F9F8F6]/30 opacity-60" />
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
          <div className="absolute inset-0 bg-[#F9F8F6]/10" />

          {/* 2.5D Physical Double Doors Overlay */}
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

        {/* Layer 4: Interior Space Reveal (Camera enters building) */}
        <motion.div
          style={{
            opacity: interiorOpacity,
            scale: interiorScale,
          }}
          className="absolute inset-0 z-25 pointer-events-none will-change-transform overflow-hidden"
        >
          <Image
            src="/images/hero/hero-interior.jpg"
            alt="Interior Architectural Gallery"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F9F8F6]/30 via-transparent to-[#F9F8F6]/85" />

          {/* Interior Welcome Badge right before project reveal */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 pointer-events-none">
            <span className="px-5 py-2 bg-white/90 backdrop-blur-md border border-[#E2DDD5] text-bronze text-[10px] uppercase tracking-[0.3em] mb-4 shadow-lg font-medium">
              Threshold Passed · Interior Monograph Revealed
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#141414] font-light max-w-xl">
              DISCOVERING WORKS FROM WITHIN
            </h2>
            <a
              href="#projects-showcase"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white hover:text-white mt-6 px-7 py-3.5 bg-[#141414] hover:bg-bronze transition-all duration-300 pointer-events-auto cursor-pointer group shadow-xl font-medium"
            >
              <span>Explore Projects</span>
              <ArrowDown className="w-3.5 h-3.5 text-bronze group-hover:translate-y-1 transition-transform group-hover:text-white" />
            </a>
          </div>
        </motion.div>

        {/* Layer 5: Initial Editorial Hero Typography (0% -> 20%) */}
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
              <a
                href="#projects-showcase"
                className="inline-flex items-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 bg-white text-[#181614] hover:bg-[#E5C378] hover:text-[#181614] transition-all duration-300 text-xs uppercase tracking-[0.24em] font-medium group shadow-2xl"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
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
              Scroll To Explore The Architecture
            </span>
            <div className="w-7 h-7 rounded-full border border-white/40 flex items-center justify-center text-white animate-bounce bg-black/20 backdrop-blur-sm shadow-md">
              <ArrowDown className="w-3 h-3" />
            </div>
          </div>
        </motion.div>

        {/* Layer 6: Architectural Telemetry HUD */}
        <motion.div
          style={{ opacity: hudOpacity }}
          className="absolute inset-x-8 md:inset-x-20 bottom-12 z-30 flex justify-between items-end text-[10px] font-mono tracking-widest text-stoneCaption uppercase pointer-events-none"
        >
          <div className="space-y-1">
            <p className="text-bronze font-sans font-medium text-xs tracking-[0.22em]">
              MONOLITH SANCTUARY · PORTAL 01
            </p>
            <p>LAT: 9.9312° N · LON: 76.2673° E</p>
            <p>MATERIAL: LIMESTONE TRAVERTINE &amp; CHAMPAGNE BRONZE</p>
          </div>
          <div className="text-right space-y-1">
            <p className="text-ink font-sans font-medium tracking-[0.2em]">
              {scrollProgress > 0.55 ? 'THRESHOLD CLEARED · DOORS OPENING' : 'APPROACHING THRESHOLD'}
            </p>
            <p className="text-bronze font-mono">
              {scrollProgress > 0.75 ? 'ENTERING INTERIOR ARCHIVE →' : 'CONTINUE SCROLLING'}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
