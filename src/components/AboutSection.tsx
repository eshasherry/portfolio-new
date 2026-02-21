import React from 'react';
import { personalInfo, stats } from '../data/portfolioData';
import BentoCard from './common/BentoCard';
import SectionWrapper from './common/SectionWrapper';
import ScrollReveal from './common/ScrollReveal';
import './AboutSection.css';

export default function AboutSection() {
  return (
    <SectionWrapper id="about" title="About Me">
      <div className="about__grid">
        <ScrollReveal className="about__text-area">
          <BentoCard className="about__text-card">
            <p className="about__text">
              Hi! I'm <strong>{personalInfo.name}</strong>, a{' '}
              <strong>Technical Lead</strong> at{' '}
              <strong>{personalInfo.company}</strong> specializing in{' '}
              <strong>AI/ML solutions</strong> that drive real business impact.
            </p>
            <p className="about__text">
              With over 8 years of experience spanning full-stack development,
              cloud architecture, and artificial intelligence, I build systems
              that transform how organizations operate — from automating contract
              processing to creating conversational AI platforms.
            </p>
            <p className="about__text">
              I'm passionate about turning complex problems into elegant,
              scalable solutions, mentoring engineering teams, and staying at the
              forefront of AI innovation.
            </p>
          </BentoCard>
        </ScrollReveal>

        <div className="about__stats">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 100}>
              <BentoCard
                variant={i === 0 ? 'accent' : i === 1 ? 'golden' : 'highlight'}
                className="about__stat-card"
              >
                <span className="about__stat-value">{stat.value}</span>
                <span className="about__stat-label">{stat.label}</span>
              </BentoCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
