'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../../types';
import { fallbackProjects } from '../../lib/api';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [loading, setLoading] = useState<boolean>(true);

  const categories = ['All', 'Residential', 'Commercial', 'Cultural', 'Hospitality'];

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const url =
          activeCategory === 'All'
            ? 'http://localhost:5000/api/projects'
            : `http://localhost:5000/api/projects?category=${activeCategory}`;
        const res = await fetch(url);
        if (res.ok) {
          const json = await res.json();
          setProjects(json.data || fallbackProjects);
        } else {
          setProjects(
            activeCategory === 'All'
              ? fallbackProjects
              : fallbackProjects.filter((p) => p.category === activeCategory)
          );
        }
      } catch (err) {
        setProjects(
          activeCategory === 'All'
            ? fallbackProjects
            : fallbackProjects.filter((p) => p.category === activeCategory)
        );
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [activeCategory]);

  return (
    <div className="pt-36 pb-32 bg-[#F9F8F6] min-h-screen text-[#141414]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Page Header */}
        <div className="border-b border-[#E2DDD5] pb-16 mb-12">
          <span className="text-[10px] uppercase tracking-[0.32em] text-[#9E7D47] font-light block mb-4">
            01 / MONOGRAPH ARCHIVE
          </span>
          <h1 className="font-serif text-5xl md:text-8xl font-light tracking-tight mb-6 text-[#141414]">
            SELECTED
            <br />
            COMMISSIONS
          </h1>
          <p className="text-[#6B655D] text-xs md:text-sm font-light max-w-xl leading-relaxed">
            A chronological survey of monumental built forms, custom private estates, and civic masterplans across six countries.
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-2.5 pt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 text-[10px] uppercase tracking-[0.22em] transition-all duration-300 border ${
                  activeCategory === cat
                    ? 'border-[#141414] text-white bg-[#141414] font-normal'
                    : 'border-[#E2DDD5] text-[#7A746B] hover:border-[#141414] hover:text-[#141414] bg-white/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        {loading ? (
          <div className="py-24 text-center text-[#8C8478] tracking-[0.28em] uppercase text-[10px] font-light">
            Retrieving Architectural Archive...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {projects.map((item, index) => (
              <Link
                key={item.slug || index}
                href={`/projects/${item.slug}`}
                className="group block space-y-5"
                data-cursor="project"
              >
                {/* Visual */}
                <div className="relative h-[400px] lg:h-[480px] overflow-hidden border border-[#E2DDD5] bg-[#EAE6DF] hover:border-[#141414]/30 transition-all duration-500">
                  <Image
                    src={item.coverImage}
                    alt={item.title}
                    fill
                    className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700"
                  />
                  <div className="absolute top-5 left-5 px-3 py-1 bg-[#F9F8F6]/95 backdrop-blur-md text-[9px] uppercase tracking-[0.25em] text-[#9E7D47] font-light border border-[#E2DDD5]">
                    {item.category}
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.24em] text-[#8C8478] font-light">
                    <span>{item.location}</span>
                    <span>{item.year}</span>
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl font-light text-[#141414] group-hover:text-[#9E7D47] transition-colors flex items-center justify-between">
                    <span>{item.title}</span>
                    <ArrowUpRight strokeWidth={1.25} className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-[#9E7D47]" />
                  </h3>
                  <p className="text-[#6B655D] text-xs sm:text-sm font-light line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
