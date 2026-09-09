import HeroCinematic from '../components/home/HeroCinematic';
import PhilosophySection from '../components/home/PhilosophySection';
import StatsSection from '../components/home/StatsSection';
import ServicesSection from '../components/home/ServicesSection';
import JournalSection from '../components/home/JournalSection';
import { fetchProjects } from '../lib/api';

export const revalidate = 60; // ISR revalidation

export default async function HomePage() {
  const projects = await fetchProjects();

  return (
    <div className="w-full relative">
      {/* 1. Cinematic Architectural Journey Hero with Interior One-by-One Project Reveal */}
      <HeroCinematic projects={projects} />

      {/* 3. Architectural Philosophy (01 VISION, 02 PRECISION, 03 PURPOSE) */}
      <PhilosophySection />

      {/* 4. Counting Statistics */}
      <StatsSection />

      {/* 5. Services & Practices with Hover Image Reveals */}
      <ServicesSection />

      {/* 6. Dispatches & Journal */}
      <JournalSection />
    </div>
  );
}
