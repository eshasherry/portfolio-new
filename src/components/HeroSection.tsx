import React from 'react';
import { personalInfo } from '../data/portfolioData';
import ScrollReveal from './common/ScrollReveal';
import './HeroSection.css';

export default function HeroSection() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center text-center py-24 px-8 relative overflow-hidden max-md:min-h-[calc(100vh-var(--nav-height))] max-md:py-16 max-md:px-4">
      {/* Floating decorative circles */}
      <div className="hero__circle hero__circle--1" aria-hidden="true" />
      <div className="hero__circle hero__circle--2" aria-hidden="true" />
      <div className="hero__circle hero__circle--3" aria-hidden="true" />

      <div className="max-w-[720px] relative z-[2]">
        <ScrollReveal>
          <span className="inline-block py-2 px-6 bg-glass-bg backdrop-blur-glass border border-glass-border rounded-pill text-sm font-medium text-text-light mb-8">
            {personalInfo.title} @ {personalInfo.company}
          </span>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h1 className="text-[clamp(2.5rem,8vw,3.5rem)] font-bold leading-[1.1] mb-6 tracking-tight">
            {personalInfo.name.split(' ').map((word, i) => (
              <span key={i} className={i === 1 ? 'hero__name--accent' : ''}>
                {word}{' '}
              </span>
            ))}
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="text-lg text-text-light leading-[1.7] mb-12 max-w-[560px] mx-auto">{personalInfo.tagline}</p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#projects" className="hero__cta--primary py-3 px-8 rounded-pill text-base font-semibold transition-all duration-300 bg-glass-bg backdrop-blur-glass border border-glass-border shadow-glass text-text-main relative overflow-hidden hover:-translate-y-0.5 hover:shadow-glass-hover hover:bg-white/70">
              View Projects
            </a>
            <a href="#contact" className="py-3 px-8 rounded-pill text-base font-semibold transition-all duration-300 bg-glass-bg backdrop-blur-glass border border-glass-border text-text-main hover:-translate-y-0.5 hover:bg-white/70">
              Get in Touch
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
