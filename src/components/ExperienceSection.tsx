import React from 'react';
import { experiences } from '../data/portfolioData';
import BentoCard from './common/BentoCard';
import SectionWrapper from './common/SectionWrapper';
import ScrollReveal from './common/ScrollReveal';

export default function ExperienceSection() {
  return (
    <SectionWrapper id="experience" title="Experience">
      <div className="grid grid-cols-[200px_repeat(3,1fr)] gap-6 items-start max-lg:grid-cols-2 max-md:grid-cols-1">
        <ScrollReveal className="max-lg:col-span-full">
          <BentoCard variant="golden" className="text-center py-12 px-6 flex flex-col items-center justify-center max-lg:flex-row max-lg:gap-4 max-lg:py-6">
            <span className="text-[2.5rem] font-bold text-text-main leading-none">8+</span>
            <span className="text-sm text-text-light mt-2 leading-snug max-lg:mt-0">Years of<br />Experience</span>
          </BentoCard>
        </ScrollReveal>

        {experiences.map((exp, i) => (
          <ScrollReveal key={exp.company} delay={i * 100}>
            <BentoCard
              variant={exp.current ? 'highlight' : 'default'}
              className="h-full flex flex-col"
            >
              {exp.current && (
                <span className="inline-block py-[3px] px-2.5 bg-gradient-to-br from-accent to-primary text-white rounded-pill text-xs font-semibold mb-3 w-fit">
                  Current
                </span>
              )}
              <h3 className="text-lg font-bold mb-1">{exp.role}</h3>
              <p className="text-base text-accent font-semibold mb-2">{exp.company}</p>
              <p className="text-sm text-text-light mb-4">
                {exp.period} · {exp.location}
              </p>
              <ul className="list-arrows flex-1">
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
