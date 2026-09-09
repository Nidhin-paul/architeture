import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function AboutPage() {
  const leadership = [
    {
      name: 'Aditya Nambiar',
      role: 'PRINCIPAL ARCHITECT & FOUNDING PARTNER',
      bio: 'Trained at the Architectural Association London and CEPT. Directs the studio’s brutalist monolithic portfolio across South Asia and Europe.',
    },
    {
      name: 'Helena Bergström',
      role: 'DIRECTOR OF SPATIAL DESIGN & MATERIAL RESEARCH',
      bio: 'Specializes in thermodynamic massing, raw stone extraction, and acoustic timber joinery based in our Zurich design laboratory.',
    },
  ];

  const awards = [
    { year: '2026', title: 'AIA International Architecture Award', project: 'The Monolith Residence' },
    { year: '2025', title: 'Prix Versailles World Architecture Selection', project: 'Aura Cultural Centre' },
    { year: '2024', title: 'World Architecture Festival (WAF) Finalist', project: 'Kyoto Canopy Villa' },
    { year: '2023', title: 'Mies Crown Hall Americas Prize Nominee', project: 'Vanguard Tower' },
  ];

  return (
    <div className="pt-36 pb-32 bg-[#F9F8F6] min-h-screen text-[#141414]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-32">
        {/* Hero Section */}
        <div className="border-b border-[#E2DDD5] pb-20 space-y-8">
          <span className="text-xs uppercase tracking-[0.3em] text-bronze block font-medium">
            Studio Ethos · Est. 2011
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-9xl font-light tracking-tight leading-none text-[#141414]">
            WE DESIGN
            <br />
            SPACES THAT
            <br />
            <span className="italic text-bronze font-normal">ENDURE.</span>
          </h1>
          <p className="text-[#6B655D] text-sm md:text-lg font-light max-w-2xl leading-relaxed pt-4">
            Architecture is more than the buildings we construct. It is the orchestration of silence, natural illumination, tactile mass, and the passage of human time.
          </p>
        </div>

        {/* Large Editorial Visual */}
        <div className="relative w-full h-[65vh] overflow-hidden border border-[#E2DDD5] shadow-sm">
          <Image
            src="/images/hero/hero-building.jpg"
            alt="Studio Architectural Philosophy"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#141414]/10" />
        </div>

        {/* Studio Manifesto */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start border-b border-[#E2DDD5] pb-24">
          <div className="lg:col-span-4">
            <span className="text-xs uppercase tracking-[0.3em] text-bronze block mb-4 font-medium">
              Manifesto
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-[#141414] leading-tight">
              THE HONESTY
              <br />
              OF MASS.
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-8 text-[#6B655D] text-base md:text-lg font-light leading-relaxed">
            <p className="text-[#141414] font-serif text-2xl md:text-3xl leading-snug">
              &ldquo;We do not decorate surfaces. We carve voids out of monumental solids, letting Kerala monsoon winds and Alpine solar angles illuminate real life.&rdquo;
            </p>
            <p>
              Founded in 2011, Atelier Vanguard has operated as an intimate collaborative collective rather than an industrial corporate architecture firm. We limit our active portfolio to six international commissions annually to ensure our founding partners directly craft every detail from preliminary excavation to final bronze hardware.
            </p>
            <p>
              Our dual ateliers in Kochi and Zurich bridge regional vernacular sensitivity with Swiss technical precision, proving that radical modernism can breathe in complete harmony with surrounding nature.
            </p>
          </div>
        </div>

        {/* Leadership */}
        <div className="space-y-16 border-b border-[#E2DDD5] pb-24">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-bronze block mb-2 font-medium">
                Leadership
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-light text-[#141414]">
                DIRECTORS &amp; PARTNERS
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {leadership.map((leader, i) => (
              <div key={i} className="space-y-4 border-l border-[#E2DDD5] pl-6">
                <span className="text-[10px] uppercase tracking-widest text-bronze font-medium">
                  {leader.role}
                </span>
                <h3 className="font-serif text-3xl font-light text-[#141414]">
                  {leader.name}
                </h3>
                <p className="text-[#6B655D] text-sm font-light leading-relaxed">
                  {leader.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Accolades & Monograph Recognition */}
        <div className="space-y-12">
          <div className="flex justify-between items-end">
            <span className="text-xs uppercase tracking-[0.3em] text-bronze font-medium">
              Accolades &amp; Recognition
            </span>
            <span className="text-xs uppercase tracking-widest text-[#7A746B]">
              2023 — 2026
            </span>
          </div>

          <div className="divide-y divide-[#E2DDD5]">
            {awards.map((award, idx) => (
              <div
                key={idx}
                className="py-6 flex flex-col sm:flex-row sm:items-center justify-between text-xs tracking-wider gap-2 group"
              >
                <div className="flex items-center gap-6">
                  <span className="font-mono text-bronze font-medium">{award.year}</span>
                  <span className="text-[#141414] group-hover:text-bronze transition-colors text-sm font-serif">
                    {award.title}
                  </span>
                </div>
                <span className="text-[#7A746B] uppercase text-[11px]">{award.project}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Call To Action */}
        <div className="p-12 md:p-20 bg-[#F2EFE9] border border-[#E2DDD5] flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left shadow-sm">
          <div>
            <h3 className="font-serif text-3xl md:text-5xl font-light text-[#141414] mb-2">
              COMMISSION A SANCTUARY
            </h3>
            <p className="text-[#7A746B] text-xs uppercase tracking-widest">
              Direct consultation with our architectural directors.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-8 py-4 bg-bronze text-white font-medium uppercase tracking-widest text-xs inline-flex items-center gap-3 hover:bg-[#141414] transition-colors shadow-sm"
          >
            <span>Start A Conversation</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
