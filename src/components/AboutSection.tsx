import React from 'react';
import { personalInfo, stats } from '../data/portfolioData';
import BentoCard from './common/BentoCard';
import SectionWrapper from './common/SectionWrapper';
import ScrollReveal from './common/ScrollReveal';

export default function AboutSection() {
  return (
    <SectionWrapper id="about" title="About Me">
      <div className="grid grid-cols-[1fr_240px] gap-6 items-start max-md:grid-cols-1">
        <ScrollReveal className="h-full">
          <BentoCard className="h-full flex flex-col gap-4">
            <p className="text-base leading-[1.8] text-text-light">
              Hi! I'm <strong className="text-text-main font-semibold">{personalInfo.name}</strong>, a{' '}
              <strong className="text-text-main font-semibold">{personalInfo.title}</strong> at{' '}
              <strong className="text-text-main font-semibold">{personalInfo.company}</strong> specializing in{' '}
              <strong className="text-text-main font-semibold">AI/ML solutions</strong> that drive real business impact.
            </p>
            <p className="text-base leading-[1.8] text-text-light">
              With over 8 years of experience spanning full-stack development,
              cloud architecture, and artificial intelligence, I build systems
              that transform how organizations operate — from building
              conversational AI agents to automating document processing
              pipelines that save millions.
            </p>
            <p className="text-base leading-[1.8] text-text-light">
              I'm passionate about turning complex problems into elegant,
              scalable solutions, mentoring engineering teams, and staying at the
              forefront of AI innovation.
            </p>
          </BentoCard>
        </ScrollReveal>

        <div className="flex flex-col gap-6 max-md:flex-row max-[480px]:flex-col">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 100}>
              <BentoCard
                variant={i === 0 ? 'accent' : i === 1 ? 'golden' : 'highlight'}
                className="text-center p-6 max-md:flex-1 max-md:p-4"
              >
                <span className="block text-[2rem] font-bold text-text-main leading-tight max-md:text-2xl">{stat.value}</span>
                <span className="block text-sm text-text-light mt-2">{stat.label}</span>
              </BentoCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
