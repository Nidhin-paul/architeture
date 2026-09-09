'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorType, setCursorType] = useState<'default' | 'project' | 'link'>('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only activate on devices with fine pointer (desktop)
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const render = () => {
      currentX += (targetX - currentX) * 0.22;
      currentY += (targetY - currentY) * 0.22;
      if (cursor) {
        cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    const checkHoverables = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectEl = target.closest('[data-cursor="project"]');
      const linkEl = target.closest('a, button, [data-cursor="pointer"]');

      if (projectEl) {
        setCursorType('project');
      } else if (linkEl) {
        setCursorType('link');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', checkHoverables);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', checkHoverables);
    };
  }, [isVisible]);

  return (
    <div
      ref={cursorRef}
      className={`fixed pointer-events-none z-[99999] top-0 left-0 mix-blend-difference hidden md:flex items-center justify-center transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`rounded-full transition-all duration-300 flex items-center justify-center ${
          cursorType === 'project'
            ? 'w-16 h-16 bg-warmWhite text-carbon text-[9px] font-sans font-bold uppercase tracking-widest scale-100'
            : cursorType === 'link'
            ? 'w-10 h-10 border border-warmWhite/80 bg-transparent'
            : 'w-3 h-3 bg-warmWhite rounded-full'
        }`}
      >
        {cursorType === 'project' && <span>VIEW ↗</span>}
      </div>
    </div>
  );
}
