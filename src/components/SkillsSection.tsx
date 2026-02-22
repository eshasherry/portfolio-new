import React from 'react';
import { skillCategories } from '../data/portfolioData';
import BentoCard from './common/BentoCard';
import SectionWrapper from './common/SectionWrapper';
import ScrollReveal from './common/ScrollReveal';
import './SkillsSection.css';

const variantMap: Record<number, 'accent' | 'default' | 'golden' | 'highlight'> = {
  0: 'accent',
  1: 'default',
  2: 'golden',
  3: 'highlight',
  4: 'default',
  5: 'accent',
};

export default function SkillsSection() {
  return (
    <SectionWrapper id="skills" title="Skills">
      <div className="skills__grid">
        {skillCategories.map((cat, i) => (
          <ScrollReveal
            key={cat.name}
            delay={i * 80}
            className={`skills__item skills__item--${i}`}
          >
            <BentoCard variant={variantMap[i] || 'default'} className="h-full flex flex-col">
              <h3 className="text-base font-bold mb-4 text-text-main">{cat.name}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="py-1.5 px-3.5 bg-white/50 backdrop-blur-[8px] border border-white/40 rounded-pill text-sm text-text-main font-medium transition-all duration-200 hover:bg-[rgba(255,176,136,0.2)] hover:border-[rgba(255,176,136,0.3)] hover:-translate-y-px"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </BentoCard>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
