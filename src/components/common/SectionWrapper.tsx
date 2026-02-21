import React from 'react';
import './SectionWrapper.css';

interface SectionWrapperProps {
  id: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function SectionWrapper({ id, title, children, className = '' }: SectionWrapperProps) {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="section__container">
        {title && <h2 className="section__title">{title}</h2>}
        {children}
      </div>
    </section>
  );
}
