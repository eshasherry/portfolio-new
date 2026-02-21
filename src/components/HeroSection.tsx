import React from 'react';
import { personalInfo } from '../data/portfolioData';
import ScrollReveal from './common/ScrollReveal';
import './HeroSection.css';

export default function HeroSection() {
  return (
    <section id="hero" className="hero">
      {/* Floating decorative circles */}
      <div className="hero__circle hero__circle--1" aria-hidden="true" />
      <div className="hero__circle hero__circle--2" aria-hidden="true" />
      <div className="hero__circle hero__circle--3" aria-hidden="true" />

      <div className="hero__content">
        <ScrollReveal>
          <span className="hero__badge">
            {personalInfo.title} @ {personalInfo.company}
          </span>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h1 className="hero__name">
            {personalInfo.name.split(' ').map((word, i) => (
              <span key={i} className={i === 1 ? 'hero__name--accent' : ''}>
                {word}{' '}
              </span>
            ))}
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="hero__tagline">{personalInfo.tagline}</p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="hero__ctas">
            <a href="#projects" className="hero__cta hero__cta--primary">
              View Projects
            </a>
            <a href="#contact" className="hero__cta hero__cta--secondary">
              Get in Touch
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
