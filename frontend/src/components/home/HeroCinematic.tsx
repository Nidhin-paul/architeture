'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Project } from '../../types';
import { fallbackProjects } from '../../lib/api';

const START_FRAME = 29;
const TOTAL_FRAMES = 107;
const FRAME_107_PROGRESS = 0.52;

const getFramePath = (index: number) => {
  const padded = String(Math.min(TOTAL_FRAMES, Math.max(START_FRAME, index))).padStart(4, '0');
  return `/frames/frame_${padded}.jpg`;
};

interface HeroCinematicProps {
  projects?: Project[];
}

export default function HeroCinematic({ projects: propProjects }: HeroCinematicProps) {
  const allProjects = propProjects && propProjects.length > 0 ? propProjects : fallbackProjects;
  const showcaseProjects = allProjects.slice(0, 4);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES + 1).fill(null));
  const currentFrameRef = useRef<number>(START_FRAME);
  const animFrameIdRef = useRef<number | null>(null);

  const [loadedCount, setLoadedCount] = useState(0);
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleWindowScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    handleWindowScroll();
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  // Framer Motion Scroll Pipeline across 360vh for smooth, unhurried pacing
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth canvas frame drawing with cover aspect ratio for full-width edge-to-edge display
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const clampedIndex = Math.min(TOTAL_FRAMES, Math.max(START_FRAME, frameIndex));
    let img = imagesRef.current[clampedIndex];
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset <= (TOTAL_FRAMES - START_FRAME); offset++) {
        const prev = imagesRef.current[Math.max(START_FRAME, clampedIndex - offset)];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
        const next = imagesRef.current[Math.min(TOTAL_FRAMES, clampedIndex + offset)];
        if (next && next.complete && next.naturalWidth > 0) {
          img = next;
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalWidth ? img.naturalHeight : 0;

    if (canvasWidth === 0 || canvasHeight === 0 || imgWidth === 0 || imgHeight === 0) return;

    // Full-width cover fit with slight 4% bleed to comfortably conceal any edge watermarks
    const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight) * 1.04;
    const renderWidth = imgWidth * scale;
    const renderHeight = imgHeight * scale;
    const offsetX = (canvasWidth - renderWidth) / 2;
    const offsetY = (canvasHeight - renderHeight) / 2;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
  }, []);

  const queueRender = useCallback((frameIndex: number) => {
    currentFrameRef.current = frameIndex;
    if (animFrameIdRef.current !== null) return;

    animFrameIdRef.current = requestAnimationFrame(() => {
      drawFrame(currentFrameRef.current);
      animFrameIdRef.current = null;
    });
  }, [drawFrame]);

  const updateCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const targetWidth = Math.round(width * dpr);
    const targetHeight = Math.round(height * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }
    queueRender(currentFrameRef.current);
  }, [queueRender]);

  // Preload video sequence from START_FRAME (29) up to frame 107
  useEffect(() => {
    updateCanvasDimensions();
    window.addEventListener('resize', updateCanvasDimensions, { passive: true });

    const pendingImgs: HTMLImageElement[] = [];

    const firstImg = new window.Image();
    firstImg.src = getFramePath(START_FRAME);
    firstImg.onload = () => {
      imagesRef.current[START_FRAME] = firstImg;
      setLoadedCount(1);
      setFirstFrameLoaded(true);
      queueRender(START_FRAME);
    };
    firstImg.onerror = () => {
      // Gracefully ignore loading error
    };
    pendingImgs.push(firstImg);

    for (let i = START_FRAME + 1; i <= TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = getFramePath(i);
      img.onload = () => {
        imagesRef.current[i] = img;
        setLoadedCount((prev) => prev + 1);
        if (currentFrameRef.current === i) {
          queueRender(i);
        }
      };
      img.onerror = () => {
        // Gracefully ignore loading error
      };
      pendingImgs.push(img);
    }

    return () => {
      window.removeEventListener('resize', updateCanvasDimensions);
      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      pendingImgs.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [updateCanvasDimensions, queueRender]);

  // Sync scroll with frame index & project cycling
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    // Scrub through entrance frames from START_FRAME to TOTAL_FRAMES
    const normalizedProgress = Math.min(1, latest / FRAME_107_PROGRESS);
    const targetFrame = latest >= FRAME_107_PROGRESS
      ? TOTAL_FRAMES
      : Math.min(TOTAL_FRAMES, Math.max(START_FRAME, Math.round(START_FRAME + normalizedProgress * (TOTAL_FRAMES - START_FRAME))));
    queueRender(targetFrame);
    setIsScrolled(latest > 0.005 || (typeof window !== 'undefined' && window.scrollY > 15));

    if (latest >= FRAME_107_PROGRESS) {
      const remaining = (latest - FRAME_107_PROGRESS) / (1 - FRAME_107_PROGRESS);
      const projectIdx = Math.min(
        showcaseProjects.length - 1,
        Math.floor(remaining * showcaseProjects.length)
      );
      setSelectedProjectIndex(projectIdx);
    }
  });

  // Minimalist scroll transforms
  // Initial title disappears immediately upon scrolling (0% to 2%)
  const initialTextOpacity = useTransform(scrollYProgress, [0, 0.015, 0.025], [1, 0.2, 0], { clamp: true });
  const initialTextY = useTransform(scrollYProgress, [0, 0.025], [0, -20], { clamp: true });

  // Video canvas fades completely to 0 at frame 107 entrance and stays strictly 0
  const canvasOpacity = useTransform(
    scrollYProgress,
    [0, FRAME_107_PROGRESS - 0.04, FRAME_107_PROGRESS + 0.02, 1.0],
    [1, 1, 0, 0],
    { clamp: true }
  );

  // Full-screen project view appears and stays 100% solid opaque (no translucent drop at 0.98-1.0)
  const projectsOpacity = useTransform(
    scrollYProgress,
    [FRAME_107_PROGRESS - 0.03, FRAME_107_PROGRESS + 0.04, 1.0],
    [0, 1, 1],
    { clamp: true }
  );
  const projectsZoom = useTransform(
    scrollYProgress,
    [FRAME_107_PROGRESS, FRAME_107_PROGRESS + 0.12, 1.0],
    [0.94, 1.0, 1.02],
    { clamp: true }
  );

  // 1px hairline scrub bar width
  const scrubBarWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const scrollToProjects = () => {
    const el = document.getElementById('selected-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentProject = showcaseProjects[selectedProjectIndex] || showcaseProjects[0];

  return (
    <div ref={containerRef} id="hero-section" className="relative w-full h-[360vh] bg-[#0E0D0C] select-none">
      {/* Sticky Fullscreen Viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Layer 1: Minimal Canvas Video (Fades away cleanly at frame 107) */}
        <motion.div
          style={{ opacity: canvasOpacity }}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover transition-opacity duration-700"
            style={{ opacity: firstFrameLoaded ? 1 : 0 }}
          />
          {/* Subtle natural film tone */}
          <div className="absolute inset-0 bg-black/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent" />
        </motion.div>

        {/* Minimal Initial Hero Typography (Quiet, poetic, uncluttered) */}
        {!isScrolled && (
          <motion.div
            style={{
              opacity: initialTextOpacity,
              y: initialTextY,
            }}
            className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16 md:py-20 pointer-events-none transition-opacity duration-200"
          >
            <div className="max-w-5xl space-y-3">
              <h1 className="font-serif font-light text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-white tracking-tight leading-[1.05] whitespace-nowrap">
                Silence in <span className="editorial-italic font-normal text-[#E2D6C3]">Structure.</span>
              </h1>
              <p className="text-white/60 text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-light">
                Monolithic residences &amp; enduring spatial form
              </p>
            </div>
          </motion.div>
        )}

        {/* Layer 2: Minimal Full-Screen Projects (After Frame 107) */}
        <motion.div
          style={{
            opacity: projectsOpacity,
            scale: projectsZoom,
          }}
          className="absolute inset-0 z-30 w-full h-full bg-[#0D0C0B] text-white flex flex-col justify-end overflow-hidden pointer-events-auto"
        >
          {/* Full-Bleed Project Background Image with Smooth Crossfade */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject.slug}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                className="relative w-full h-full"
              >
                <NextImage
                  src={currentProject.coverImage}
                  alt={currentProject.title}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-center"
                />
                {/* Minimalist Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0C0B] via-[#0D0C0B]/40 to-[#0D0C0B]/60" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0D0C0B]/85 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Minimal Main Editorial Content (Bottom Left) */}
          <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 pb-16 md:pb-24 max-w-4xl space-y-4 sm:space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                className="space-y-4 sm:space-y-5"
              >
                <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-white font-light tracking-tight leading-[1.04]">
                  {currentProject.title}
                </h2>

                <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed tracking-wide max-w-xl">
                  {currentProject.description}
                </p>

                <div className="pt-2">
                  <Link
                    href={`/projects/${currentProject.slug}`}
                    className="inline-block text-white hover:text-[#E2D6C3] transition-colors underline underline-offset-8 text-xs uppercase tracking-[0.25em] font-light"
                  >
                    View Project →
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Removed bottom scrub bar */}
      </div>
    </div>
  );
}
