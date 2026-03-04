import React from 'react';
import { personalInfo, socialLinks, contactTagline } from '../data/portfolioData';
import BentoCard from './common/BentoCard';
import SectionWrapper from './common/SectionWrapper';
import ScrollReveal from './common/ScrollReveal';

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
      <p className="text-text-light text-lg text-center mb-10">{contactTagline}</p>

      <div className="grid grid-cols-4 gap-6 max-md:grid-cols-2">
        {/* Social Links */}
        {socialLinks.map((link, i) => (
          <ScrollReveal key={link.name} delay={i * 80}>
            <a
              href={link.url}
              target={link.icon !== 'email' ? '_blank' : undefined}
              rel={link.icon !== 'email' ? 'noopener noreferrer' : undefined}
              aria-label={link.name}
              className="block h-full"
            >
              <BentoCard className="h-full flex flex-col items-center justify-center text-center gap-3 cursor-pointer">
                <span className="w-9 h-9 shrink-0 flex [&>img]:w-full [&>img]:h-full [&>img]:object-contain [&>img]:rounded-[6px]">
                  {iconSvgs[link.icon]}
                </span>
                <span className="text-sm font-semibold">{link.name}</span>
              </BentoCard>
            </a>
          </ScrollReveal>
        ))}

        {/* Resume Download */}
        <ScrollReveal delay={socialLinks.length * 80}>
          <a
            href={personalInfo.resumeUrl}
            download="EshaSherryResume.pdf"
            className="block h-full"
          >
            <BentoCard variant="accent" className="h-full flex flex-col items-center justify-center text-center gap-3 cursor-pointer">
              <svg className="w-9 h-9 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              <span className="font-semibold text-sm">Download Resume</span>
              <span className="text-xs text-text-light">PDF · 134 KB</span>
            </BentoCard>
          </a>
        </ScrollReveal>
      </div>
    </SectionWrapper>
  );
}
