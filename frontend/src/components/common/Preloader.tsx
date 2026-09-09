'use client';

import { useState, useEffect, useCallback } from 'react';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  const handleEnter = useCallback(() => {
    setHasEntered(true);
    try {
      sessionStorage.setItem('atelier_entered', 'true');
    } catch {}
  }, []);

  useEffect(() => {
    try {
      if (sessionStorage.getItem('atelier_entered') === 'true') {
        setHasEntered(true);
        return;
      }
    } catch {}

    // Increment progress to 100%
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsLoaded(true);
          // Automatically enter after a short delay so user is never trapped
          setTimeout(handleEnter, 600);
          return 100;
        }
        const step = Math.floor(Math.random() * 18) + 12;
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setIsLoaded(true);
          setTimeout(handleEnter, 600);
          return 100;
        }
        return next;
      });
    }, 45);

    // Dismiss preloader if user scrolls or presses a key
    const handleUserAction = () => {
      handleEnter();
    };

    window.addEventListener('wheel', handleUserAction, { passive: true, once: true });
    window.addEventListener('touchmove', handleUserAction, { passive: true, once: true });
    window.addEventListener('keydown', handleUserAction, { once: true });

    return () => {
      clearInterval(timer);
      window.removeEventListener('wheel', handleUserAction);
      window.removeEventListener('touchmove', handleUserAction);
      window.removeEventListener('keydown', handleUserAction);
    };
  }, [handleEnter]);

  if (hasEntered) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-[#F9F8F6] text-[#141414] flex flex-col justify-between p-8 md:p-16 select-none transition-all duration-700 ease-in-out ${
        isLoaded ? 'opacity-0 pointer-events-none -translate-y-8' : 'opacity-100'
      }`}
    >
      {/* Top Brand Tag */}
      <div className="flex justify-between items-start text-xs tracking-widest uppercase text-[#7A746B]">
        <span className="font-serif italic text-[#141414] text-base tracking-normal font-medium">
          Atelier Vanguard
        </span>
        <span>Est. 2011 · Architectural Studio</span>
      </div>

      {/* Center Monumental Counter */}
      <div className="flex flex-col items-center justify-center my-auto text-center">
        <span className="text-xs uppercase tracking-widest text-bronze mb-4 font-mono font-medium">
          Synchronizing Spatial Archive
        </span>
        <div className="font-serif text-7xl md:text-9xl font-light tracking-tight text-[#141414]">
          {progress.toString().padStart(2, '0')}%
        </div>
        <div className="w-56 h-[1.5px] bg-[#E2DDD5] mt-8 relative overflow-hidden">
          <div
            className="h-full bg-bronze transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Bottom Action / Readiness */}
      <div className="flex justify-between items-end text-xs tracking-widest uppercase">
        <div className="text-[#7A746B] hidden sm:block">
          Light · Concrete · Geometry · Reflection
        </div>
        <div>
          {isLoaded ? (
            <button
              onClick={handleEnter}
              className="px-6 py-3 border border-bronze bg-bronze text-white hover:bg-[#141414] hover:border-[#141414] transition-all duration-300 font-sans tracking-widest text-xs flex items-center gap-2 group cursor-pointer shadow-sm"
            >
              <span>ENTER MONOGRAPH</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          ) : (
            <span className="text-[#7A746B] font-mono animate-pulse">
              CALIBRATING CAMERA [{progress}%]
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
