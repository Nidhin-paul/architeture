'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitContactForm } from '../../lib/api';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: 'Private Residential Estate',
    budget: '$1,000,000 — $5,000,000',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setFeedbackMessage('');

    const res = await submitContactForm(formData);

    if (res.success) {
      setStatus('success');
      setFeedbackMessage(res.message);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: 'Private Residential Estate',
        budget: '$1,000,000 — $5,000,000',
        message: '',
      });
    } else {
      setStatus('error');
      setFeedbackMessage(res.message);
    }
  };

  return (
    <div className="pt-36 pb-32 bg-[#F9F8F6] min-h-screen text-[#141414] relative">
      {/* Background Architectural Ambience */}
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-[70vh] opacity-10 pointer-events-none overflow-hidden">
        <Image
          src="/images/hero/hero-entrance.jpg"
          alt="Architectural portal"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#F9F8F6]/80 to-[#F9F8F6]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-24">
        {/* Header */}
        <div className="border-b border-[#E2DDD5] pb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-bronze block mb-4 font-medium">
            Commission Inquiry
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight text-[#141414]">
            LET&apos;S BUILD
            <br />
            SOMETHING
            <br />
            <span className="italic text-bronze font-normal">MEANINGFUL.</span>
          </h1>
        </div>

        {/* Form & Coordinates Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left: Manifesto & Coordinates */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-4">
              <h2 className="font-serif text-3xl md:text-5xl font-light text-[#141414] leading-tight">
                LET&apos;S
                <br />
                CREATE
                <br />
                TOGETHER.
              </h2>
              <p className="text-[#6B655D] text-sm font-light leading-relaxed max-w-md pt-2">
                We engage in conversations with clients who seek architectural permanence, deep site harmony, and uncompromising structural integrity.
              </p>
            </div>

            {/* Studio Coordinates */}
            <div className="space-y-6 border-t border-[#E2DDD5] pt-8 text-xs tracking-wider">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-bronze font-medium block mb-1">
                  Direct Line
                </span>
                <a
                  href="tel:+914842215090"
                  className="text-[#141414] hover:text-bronze transition-colors text-sm"
                >
                  +91 (484) 221-5090
                </a>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-widest text-bronze font-medium block mb-1">
                  Electronic Mail
                </span>
                <a
                  href="mailto:commissions@ateliervanguard.com"
                  className="text-[#141414] hover:text-bronze transition-colors text-sm underline underline-offset-4"
                >
                  commissions@ateliervanguard.com
                </a>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-widest text-bronze font-medium block mb-1">
                  Ateliers
                </span>
                <p className="text-[#6B655D] leading-relaxed">
                  Kochi · Waterfront 14, Fort Kochi, Kerala
                  <br />
                  Zurich · Limmatquai 72, 8001 Zürich
                </p>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 bg-white/80 border border-[#E2DDD5] p-8 sm:p-12 backdrop-blur-md shadow-lg">
            {status === 'success' && (
              <div className="p-6 mb-8 bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs tracking-wider space-y-1">
                  <strong className="block text-emerald-700 uppercase">Inquiry Registered</strong>
                  <p>{feedbackMessage}</p>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="p-6 mb-8 bg-red-50 border border-red-200 text-red-900 flex items-start gap-4">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div className="text-xs tracking-wider space-y-1">
                  <strong className="block uppercase text-red-600">Submission Error</strong>
                  <p>{feedbackMessage}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 text-xs uppercase tracking-widest">
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-[#7A746B] block text-[10px]">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="E.g. Elena Rostova"
                    className="w-full px-4 py-3.5 bg-[#F9F8F6] border border-[#E2DDD5] focus:border-bronze focus:outline-none text-[#141414] text-xs placeholder:text-[#7A746B]/40 transition-colors rounded-none"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-[#7A746B] block text-[10px]">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="elena@rostova.com"
                    className="w-full px-4 py-3.5 bg-[#F9F8F6] border border-[#E2DDD5] focus:border-bronze focus:outline-none text-[#141414] text-xs placeholder:text-[#7A746B]/40 transition-colors rounded-none"
                  />
                </div>
              </div>

              {/* Row 2: Phone & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-[#7A746B] block text-[10px]">
                    Phone / Signal
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3.5 bg-[#F9F8F6] border border-[#E2DDD5] focus:border-bronze focus:outline-none text-[#141414] text-xs placeholder:text-[#7A746B]/40 transition-colors rounded-none"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="company" className="text-[#7A746B] block text-[10px]">
                    Entity / Family Office
                  </label>
                  <input
                    id="company"
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Private Commission"
                    className="w-full px-4 py-3.5 bg-[#F9F8F6] border border-[#E2DDD5] focus:border-bronze focus:outline-none text-[#141414] text-xs placeholder:text-[#7A746B]/40 transition-colors rounded-none"
                  />
                </div>
              </div>

              {/* Row 3: Project Type & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="projectType" className="text-[#7A746B] block text-[10px]">
                    Project Typology
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 bg-[#F9F8F6] border border-[#E2DDD5] focus:border-bronze focus:outline-none text-[#141414] text-xs transition-colors rounded-none cursor-pointer"
                  >
                    <option value="Private Residential Estate">Private Residential Estate</option>
                    <option value="Cultural / Museum Pavilion">Cultural / Museum Pavilion</option>
                    <option value="Commercial Landmark Tower">Commercial Landmark Tower</option>
                    <option value="Boutique Luxury Hospitality">Boutique Luxury Hospitality</option>
                    <option value="Masterplan & Landscape">Masterplan &amp; Landscape</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="budget" className="text-[#7A746B] block text-[10px]">
                    Anticipated Budget (USD)
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 bg-[#F9F8F6] border border-[#E2DDD5] focus:border-bronze focus:outline-none text-[#141414] text-xs transition-colors rounded-none cursor-pointer"
                  >
                    <option value="$1,000,000 — $3,000,000">$1,000,000 — $3,000,000</option>
                    <option value="$3,000,000 — $7,000,000">$3,000,000 — $7,000,000</option>
                    <option value="$7,000,000 — $15,000,000">$7,000,000 — $15,000,000</option>
                    <option value="Over $15,000,000">Over $15,000,000</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Message */}
              <div className="space-y-2">
                <label htmlFor="message" className="text-[#7A746B] block text-[10px]">
                  Site Context &amp; Commission Intent *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your site topography, desired built scale, architectural aspirations, and project timeline..."
                  className="w-full px-4 py-3.5 bg-[#F9F8F6] border border-[#E2DDD5] focus:border-bronze focus:outline-none text-[#141414] text-xs placeholder:text-[#7A746B]/40 transition-colors rounded-none resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-5 bg-[#141414] text-white hover:bg-bronze hover:text-white transition-all duration-300 font-medium tracking-[0.25em] text-xs flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer group shadow-md"
              >
                <span>
                  {status === 'loading' ? 'TRANSMITTING INQUIRY...' : 'START A CONVERSATION'}
                </span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
