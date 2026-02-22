import React from 'react';
import { projects, personalInfo } from '../data/portfolioData';
import BentoCard from './common/BentoCard';
import SectionWrapper from './common/SectionWrapper';
import ScrollReveal from './common/ScrollReveal';

export default function ProjectsSection() {
  return (
    <SectionWrapper id="projects" title="Projects">
      <div className="grid grid-cols-4 grid-rows-[auto_auto_auto] gap-6 max-md:grid-cols-1 max-md:grid-rows-none">
        {/* Featured: AI Doc Automation — 2×2 */}
        <ScrollReveal className="col-[1/3] row-[1/3] max-md:col-auto max-md:row-auto">
          <BentoCard variant="highlight" className="h-full flex flex-col p-12">
            <span className="inline-block py-1 px-3 bg-gradient-to-br from-accent to-primary text-white rounded-pill text-xs font-semibold uppercase tracking-wide mb-4 w-fit">
              Featured
            </span>
            <h3 className="text-xl font-bold mb-2">{projects[0].title}</h3>
            <p className="text-sm text-accent font-medium mb-4">{projects[0].company}</p>
            <p className="text-sm text-text-light leading-[1.7] mb-4">{projects[0].description}</p>
            <ul className="list-arrows mb-6 flex-1">
              {projects[0].highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 mt-auto">
              {projects[0].tags.map((t) => (
                <span key={t} className="py-1 px-3 bg-[rgba(255,176,136,0.15)] border border-[rgba(255,176,136,0.2)] rounded-pill text-xs text-text-main font-medium">{t}</span>
              ))}
            </div>
          </BentoCard>
        </ScrollReveal>

        {/* Collections AI — 2×2 */}
        <ScrollReveal delay={100} className="col-[3/5] row-[1/3] max-md:col-auto max-md:row-auto">
          <BentoCard variant="accent" className="h-full flex flex-col p-12">
            <h3 className="text-xl font-bold mb-2">{projects[1].title}</h3>
            <p className="text-sm text-accent font-medium mb-4">{projects[1].company}</p>
            <p className="text-sm text-text-light leading-[1.7] mb-4">{projects[1].description}</p>
            <ul className="list-arrows mb-6 flex-1">
              {projects[1].highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 mt-auto">
              {projects[1].tags.map((t) => (
                <span key={t} className="py-1 px-3 bg-[rgba(255,176,136,0.15)] border border-[rgba(255,176,136,0.2)] rounded-pill text-xs text-text-main font-medium">{t}</span>
              ))}
            </div>
          </BentoCard>
        </ScrollReveal>

        {/* Doc Clustering — 3×1 */}
        <ScrollReveal delay={200} className="col-[1/4] row-[3] max-md:col-auto max-md:row-auto">
          <BentoCard variant="golden" className="h-full flex flex-col">
            <h3 className="text-xl font-bold mb-2">{projects[2].title}</h3>
            <p className="text-sm text-accent font-medium mb-4">{projects[2].company}</p>
            <p className="text-sm text-text-light leading-[1.7] mb-4">{projects[2].description}</p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {projects[2].tags.map((t) => (
                <span key={t} className="py-1 px-3 bg-[rgba(255,176,136,0.15)] border border-[rgba(255,176,136,0.2)] rounded-pill text-xs text-text-main font-medium">{t}</span>
              ))}
            </div>
          </BentoCard>
        </ScrollReveal>

        {/* GitHub CTA — 1×1 */}
        <ScrollReveal delay={300} className="col-[4] row-[3] max-md:col-auto max-md:row-auto">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full"
          >
            <BentoCard className="h-full flex flex-col items-center justify-center text-center gap-3 min-h-[140px]">
              <svg className="w-9 h-9 text-text-main mb-2" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="font-semibold text-sm">View GitHub</span>
            </BentoCard>
          </a>
        </ScrollReveal>
      </div>
    </SectionWrapper>
  );
}
