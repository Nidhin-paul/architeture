import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { fetchProjectBySlug } from '../../../lib/api';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const { project, nextProject } = await fetchProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="bg-[#F9F8F6] text-[#141414] min-h-screen">
      {/* 1. Fullscreen Architectural Hero */}
      <section className="relative w-full h-[90vh] overflow-hidden border-b border-[#E2DDD5]">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/80 via-[#141414]/20 to-transparent" />

        {/* Back Link */}
        <div className="absolute top-32 left-6 md:left-16 z-20">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md border border-[#E2DDD5] text-xs uppercase tracking-widest text-[#141414] hover:text-bronze transition-colors shadow-sm font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Projects</span>
          </Link>
        </div>

        {/* Hero Title and Meta Overlay */}
        <div className="absolute bottom-12 left-6 md:left-16 right-6 md:right-16 z-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="px-3.5 py-1 bg-bronze text-white text-[10px] uppercase tracking-widest font-medium shadow-sm">
              {project.category}
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-white tracking-tight drop-shadow-md">
              {project.title}
            </h1>
          </div>

          <div className="text-xs uppercase tracking-[0.22em] text-white/90 space-y-1 drop-shadow-sm font-light">
            <p>LOCATION: {project.location}</p>
            <p>YEAR: {project.year}</p>
            <p>SCALE: {project.area}</p>
          </div>
        </div>
      </section>

      {/* 2. Narrative & Specifications */}
      <section className="py-24 border-b border-[#E2DDD5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Narrative Story */}
          <div className="lg:col-span-8 space-y-8">
            <span className="text-xs uppercase tracking-[0.3em] text-bronze block font-medium">
              Architectural Statement
            </span>
            <p className="font-serif text-2xl md:text-4xl text-[#141414] font-light leading-relaxed">
              {project.description}
            </p>
            <div className="text-[#6B655D] text-sm md:text-base font-light leading-relaxed space-y-4 pt-4">
              <p>{project.story || project.description}</p>
              <p>
                Every aperture is calibrated to respond to daylight variations throughout the solar cycle, casting shadow geometries across brushed natural materials and cool obsidian water features.
              </p>
            </div>
          </div>

          {/* Specifications Table */}
          <div className="lg:col-span-4 border-l border-[#E2DDD5] pl-8 space-y-8">
            <span className="text-xs uppercase tracking-[0.3em] text-bronze block font-medium">
              Project Data
            </span>
            <div className="space-y-6 text-xs uppercase tracking-widest divide-y divide-[#E2DDD5]">
              <div className="pt-4">
                <span className="text-[#7A746B] block text-[10px] mb-1">Commission</span>
                <span className="text-[#141414] font-medium">Private Client</span>
              </div>
              <div className="pt-4">
                <span className="text-[#7A746B] block text-[10px] mb-1">Location</span>
                <span className="text-[#141414] font-medium">{project.location}</span>
              </div>
              <div className="pt-4">
                <span className="text-[#7A746B] block text-[10px] mb-1">Year Completed</span>
                <span className="text-[#141414] font-medium">{project.year}</span>
              </div>
              <div className="pt-4">
                <span className="text-[#7A746B] block text-[10px] mb-1">Total Built Area</span>
                <span className="text-[#141414] font-medium">{project.area}</span>
              </div>
              <div className="pt-4">
                <span className="text-[#7A746B] block text-[10px] mb-1">Services Provided</span>
                <ul className="text-[#141414] space-y-1 pt-1 lowercase capitalize font-medium">
                  {project.services?.map((svc, i) => (
                    <li key={i}>· {svc}</li>
                  )) || <li>· Architecture</li>}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Spatial Gallery */}
      <section className="py-24 border-b border-[#E2DDD5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          <div className="flex justify-between items-end">
            <span className="text-xs uppercase tracking-[0.3em] text-bronze font-medium">
              Spatial Documentation
            </span>
            <span className="text-xs uppercase tracking-widest text-[#7A746B]">
              Plates 01 — 03
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.gallery && project.gallery.length > 0 ? (
              project.gallery.map((imgUrl, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden border border-[#E2DDD5] shadow-sm ${
                    i === 0 ? 'md:col-span-2 h-[550px]' : 'h-[420px]'
                  }`}
                >
                  <Image
                    src={imgUrl}
                    alt={`${project.title} photographic documentation ${i + 1}`}
                    fill
                    className="object-cover object-center hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ))
            ) : (
              <div className="relative h-[480px] md:col-span-2 overflow-hidden border border-[#E2DDD5] shadow-sm">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover object-center"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. Next Project Banner */}
      {nextProject && (
        <section className="py-32 bg-[#F2EFE9] relative overflow-hidden group">
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-bronze block mb-4 font-medium">
                Next Monograph Commission →
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl font-light text-[#141414] group-hover:text-bronze transition-colors">
                {nextProject.title}
              </h2>
              <p className="text-[#7A746B] text-xs uppercase tracking-widest mt-2">
                {nextProject.location}
              </p>
            </div>

            <Link
              href={`/projects/${nextProject.slug}`}
              className="inline-flex items-center gap-4 px-8 py-5 bg-[#141414] text-white hover:bg-bronze hover:text-white transition-all duration-300 text-xs uppercase tracking-[0.2em] font-medium shadow-md"
            >
              <span>View Case Study</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}
    </article>
  );
}
