'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';

function Counter({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView || !nodeRef.current) return;

    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(value) {
        if (nodeRef.current) {
          nodeRef.current.textContent = Math.round(value).toString();
        }
      },
    });

    return () => controls.stop();
  }, [from, to, duration, inView]);

  return <span ref={nodeRef}>{from}</span>;
}

export default function StatsSection() {
  const stats = [
    { target: 15, suffix: '+', label: 'Years of Practice' },
    { target: 120, suffix: '+', label: 'Built Commissions' },
    { target: 80, suffix: '+', label: 'Artisans & Architects' },
    { target: 12, suffix: '', label: 'Global Territories' },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#F2EFE9] text-[#141414] border-t border-b border-[#E2DDD5]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-2 border-l border-[#E2DDD5] pl-6"
            >
              <div className="font-serif text-5xl md:text-6xl lg:text-7xl font-light text-[#141414] flex items-baseline tracking-tight">
                <Counter from={0} to={stat.target} duration={2.2} />
                {stat.suffix && (
                  <span className="text-[#9E7D47] text-2xl md:text-4xl ml-1 font-serif font-light">{stat.suffix}</span>
                )}
              </div>
              <p className="text-[9px] md:text-[10px] uppercase tracking-[0.28em] text-[#8C8478] font-light">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
