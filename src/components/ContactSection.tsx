import React from 'react';
import { personalInfo, socialLinks } from '../data/portfolioData';
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
      <div className="grid grid-cols-[1fr_200px_200px] gap-6 items-start max-md:grid-cols-1">
        {/* CTA Card */}
        <ScrollReveal className="row-start-1">
          <BentoCard className="h-full flex flex-col">
            <h3 className="text-2xl font-bold mb-4">Let's Build Something Amazing</h3>
            <p className="text-base text-text-light leading-[1.7] mb-8 flex-1">
              Whether you're looking for an AI/ML specialist, a technical lead,
              or just want to connect — I'd love to hear from you.
            </p>
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-block py-3 px-12 bg-gradient-to-br from-accent to-primary text-white rounded-pill font-semibold text-base transition-all duration-300 text-center shadow-[0_4px_16px_rgba(255,123,123,0.3)] w-fit hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(255,123,123,0.4)]"
            >
              Say Hello
            </a>
          </BentoCard>
        </ScrollReveal>

        {/* Resume Download */}
        <ScrollReveal delay={100} className="row-start-1">
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

        {/* Social Links */}
        <div className="flex flex-col gap-6 row-start-1 max-md:flex-row max-[480px]:flex-col">
          {socialLinks.map((link, i) => (
            <ScrollReveal key={link.name} delay={200 + i * 80}>
              <a
                href={link.url}
                target={link.icon !== 'email' ? '_blank' : undefined}
                rel={link.icon !== 'email' ? 'noopener noreferrer' : undefined}
                aria-label={link.name}
              >
                <BentoCard className="flex items-center gap-3 p-4 px-6 cursor-pointer max-md:flex-1 max-md:justify-center max-md:px-4">
                  <span className="w-6 h-6 shrink-0 flex [&>img]:w-full [&>img]:h-full [&>img]:object-contain [&>img]:rounded-[6px] has-[img]:w-9 has-[img]:h-9">
                    {iconSvgs[link.icon]}
                  </span>
                  <span className="text-sm font-semibold">{link.name}</span>
                </BentoCard>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
