import React from 'react';
import { personalInfo, socialLinks } from '../data/portfolioData';
import BentoCard from './common/BentoCard';
import SectionWrapper from './common/SectionWrapper';
import ScrollReveal from './common/ScrollReveal';
import './ContactSection.css';

const iconSvgs: Record<string, React.ReactNode> = {
  linkedin: (
    <img src="/linkedin.png" alt="" aria-hidden="true" />
  ),
  github: (
    <img src="/github.png" alt="" aria-hidden="true" />
  ),
  email: (
    <img src="/email.png" alt="" aria-hidden="true" />
  ),
};

export default function ContactSection() {
  return (
    <SectionWrapper id="contact" title="Get in Touch">
      <div className="contact__grid">
        {/* CTA Card */}
        <ScrollReveal className="contact__cta-area">
          <BentoCard className="contact__cta-card">
            <h3 className="contact__cta-title">Let's Build Something Amazing</h3>
            <p className="contact__cta-text">
              Whether you're looking for an AI/ML specialist, a technical lead,
              or just want to connect — I'd love to hear from you.
            </p>
            <a
              href={`mailto:${personalInfo.email}`}
              className="contact__cta-button"
            >
              Say Hello
            </a>
          </BentoCard>
        </ScrollReveal>

        {/* Resume Download */}
        <ScrollReveal delay={100} className="contact__resume-area">
          <a
            href={personalInfo.resumeUrl}
            download="EshaSherryResume.pdf"
            className="contact__resume-link"
          >
            <BentoCard variant="accent" className="contact__resume-card">
              <svg className="contact__resume-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              <span className="contact__resume-text">Download Resume</span>
              <span className="contact__resume-format">PDF · 134 KB</span>
            </BentoCard>
          </a>
        </ScrollReveal>

        {/* Social Links */}
        <div className="contact__socials">
          {socialLinks.map((link, i) => (
            <ScrollReveal key={link.name} delay={200 + i * 80}>
              <a
                href={link.url}
                target={link.icon !== 'email' ? '_blank' : undefined}
                rel={link.icon !== 'email' ? 'noopener noreferrer' : undefined}
                aria-label={link.name}
              >
                <BentoCard className="contact__social-card">
                  <span className="contact__social-icon">
                    {iconSvgs[link.icon]}
                  </span>
                  <span className="contact__social-name">{link.name}</span>
                </BentoCard>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
