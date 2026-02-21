import React from 'react';
import { experiences } from '../data/portfolioData';
import BentoCard from './common/BentoCard';
import SectionWrapper from './common/SectionWrapper';
import ScrollReveal from './common/ScrollReveal';
import './ExperienceSection.css';

export default function ExperienceSection() {
  return (
    <SectionWrapper id="experience" title="Experience">
      <div className="experience__grid">
        <ScrollReveal className="experience__timeline-label">
          <BentoCard variant="golden" className="experience__label-card">
            <span className="experience__years">8+</span>
            <span className="experience__years-text">Years of<br />Experience</span>
          </BentoCard>
        </ScrollReveal>

        {experiences.map((exp, i) => (
          <ScrollReveal key={exp.company} delay={i * 100} className="experience__item">
            <BentoCard
              variant={exp.current ? 'highlight' : 'default'}
              className="experience__card"
            >
              {exp.current && <span className="experience__current">Current</span>}
              <h3 className="experience__role">{exp.role}</h3>
              <p className="experience__company">{exp.company}</p>
              <p className="experience__meta">
                {exp.period} · {exp.location}
              </p>
              <ul className="experience__highlights">
                {exp.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </BentoCard>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
