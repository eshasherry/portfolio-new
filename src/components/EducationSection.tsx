import React from 'react';
import { education, certifications } from '../data/portfolioData';
import BentoCard from './common/BentoCard';
import SectionWrapper from './common/SectionWrapper';
import ScrollReveal from './common/ScrollReveal';
import './EducationSection.css';

export default function EducationSection() {
  return (
    <SectionWrapper id="education" title="Education & Certifications">
      <div className="education__grid">
        <ScrollReveal className="education__degrees">
          <BentoCard className="education__card">
            <h3 className="education__heading">Education</h3>
            {education.map((edu) => (
              <div key={edu.school} className="education__entry">
                <div className="education__entry-header">
                  <h4 className="education__school">{edu.school}</h4>
                  <span className="education__year">{edu.year}</span>
                </div>
                <p className="education__degree">{edu.degree}</p>
                <p className="education__location">{edu.location}</p>
                {edu.coursework && (
                  <p className="education__coursework">
                    <strong>Coursework:</strong> {edu.coursework}
                  </p>
                )}
                {edu.capstone && (
                  <p className="education__coursework">
                    <strong>Capstone:</strong> {edu.capstone}
                  </p>
                )}
              </div>
            ))}
          </BentoCard>
        </ScrollReveal>

        <ScrollReveal delay={100} className="education__certs">
          <BentoCard variant="golden" className="education__card">
            <h3 className="education__heading">Certifications</h3>
            <div className="education__cert-list">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className={`education__cert ${cert.highlighted ? 'education__cert--highlighted' : ''}`}
                >
                  {cert.highlighted && (
                    <span className="education__cert-badge">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </span>
                  )}
                  <div>
                    <p className="education__cert-name">{cert.name}</p>
                    <p className="education__cert-issuer">{cert.issuer}</p>
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
