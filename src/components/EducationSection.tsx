import React from 'react';
import { education, certifications } from '../data/portfolioData';
import BentoCard from './common/BentoCard';
import SectionWrapper from './common/SectionWrapper';
import ScrollReveal from './common/ScrollReveal';

export default function EducationSection() {
  return (
    <SectionWrapper id="education" title="Education & Certifications">
      <div className="grid grid-cols-2 gap-6 items-start max-md:grid-cols-1">
        <ScrollReveal>
          <BentoCard className="h-full">
            <h3 className="text-xl font-bold mb-6 text-text-main">Education</h3>
            {education.map((edu, i) => (
              <div key={edu.school} className={`${i < education.length - 1 ? 'mb-8' : ''}`}>
                <div className="flex justify-between items-baseline gap-4 mb-1">
                  <h4 className="text-base font-semibold">{edu.school}</h4>
                  <span className="text-sm text-accent font-semibold whitespace-nowrap">{edu.year}</span>
                </div>
                <p className="text-sm text-text-light mb-0.5">{edu.degree}</p>
                <p className="text-xs text-text-light mb-2">{edu.location}</p>
                {edu.coursework && (
                  <p className="text-sm text-text-light leading-relaxed mt-2">
                    <strong className="text-text-main font-semibold">Coursework:</strong> {edu.coursework}
                  </p>
                )}
                {edu.capstone && (
                  <p className="text-sm text-text-light leading-relaxed mt-2">
                    <strong className="text-text-main font-semibold">Capstone:</strong> {edu.capstone}
                  </p>
                )}
              </div>
            ))}
          </BentoCard>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <BentoCard variant="golden" className="h-full">
            <h3 className="text-xl font-bold mb-6 text-text-main">Certifications</h3>
            <div className="flex flex-col gap-4">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className={`flex items-start gap-3 p-3 px-4 rounded-md transition-colors duration-200
                    ${cert.highlighted
                      ? 'bg-[rgba(255,176,136,0.15)] border border-[rgba(255,176,136,0.2)]'
                      : 'bg-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.5)]'
                    }`}
                >
                  {cert.highlighted && (
                    <span className="text-secondary shrink-0 mt-0.5">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </span>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-text-main">{cert.name}</p>
                    <p className="text-xs text-text-light">{cert.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>
        </ScrollReveal>
      </div>
    </SectionWrapper>
  );
}
