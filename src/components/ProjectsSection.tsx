import React from 'react';
import { projects, personalInfo } from '../data/portfolioData';
import BentoCard from './common/BentoCard';
import SectionWrapper from './common/SectionWrapper';
import ScrollReveal from './common/ScrollReveal';
import './ProjectsSection.css';

export default function ProjectsSection() {
  return (
    <SectionWrapper id="projects" title="Projects">
      <div className="projects__grid">
        {/* Featured: AI Doc Automation — 2×2 */}
        <ScrollReveal className="projects__featured">
          <BentoCard variant="highlight" className="projects__card projects__card--featured">
            <span className="projects__tag-featured">Featured</span>
            <h3 className="projects__title">{projects[0].title}</h3>
            <p className="projects__company">{projects[0].company}</p>
            <p className="projects__desc">{projects[0].description}</p>
            <ul className="projects__highlights">
              {projects[0].highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <div className="projects__tags">
              {projects[0].tags.map((t) => (
                <span key={t} className="projects__pill">{t}</span>
              ))}
            </div>
          </BentoCard>
        </ScrollReveal>

        {/* Collections AI — 2×2 */}
        <ScrollReveal delay={100} className="projects__collections">
          <BentoCard variant="accent" className="projects__card projects__card--tall">
            <h3 className="projects__title">{projects[1].title}</h3>
            <p className="projects__company">{projects[1].company}</p>
            <p className="projects__desc">{projects[1].description}</p>
            <ul className="projects__highlights">
              {projects[1].highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <div className="projects__tags">
              {projects[1].tags.map((t) => (
                <span key={t} className="projects__pill">{t}</span>
              ))}
            </div>
          </BentoCard>
        </ScrollReveal>

        {/* Doc Clustering — 3×1 */}
        <ScrollReveal delay={200} className="projects__clustering">
          <BentoCard variant="golden" className="projects__card">
            <h3 className="projects__title">{projects[2].title}</h3>
            <p className="projects__company">{projects[2].company}</p>
            <p className="projects__desc">{projects[2].description}</p>
            <div className="projects__tags">
              {projects[2].tags.map((t) => (
                <span key={t} className="projects__pill">{t}</span>
              ))}
            </div>
          </BentoCard>
        </ScrollReveal>

        {/* GitHub CTA — 1×1 */}
        <ScrollReveal delay={300} className="projects__github">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="projects__github-link"
          >
            <BentoCard className="projects__card projects__card--cta">
              <svg className="projects__github-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="projects__github-text">View GitHub</span>
            </BentoCard>
          </a>
        </ScrollReveal>
      </div>
    </SectionWrapper>
  );
}
