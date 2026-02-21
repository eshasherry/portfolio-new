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
            <BentoCard variant={variantMap[i] || 'default'} className="skills__card">
              <h3 className="skills__category">{cat.name}</h3>
              <div className="skills__pills">
                {cat.skills.map((skill) => (
                  <span key={skill} className="skills__pill">{skill}</span>
                ))}
              </div>
            </BentoCard>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
