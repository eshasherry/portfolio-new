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
    <section id={id} className={`py-24 px-8 relative max-md:py-16 max-md:px-4 ${className}`}>
      <div className="max-w-site mx-auto">
        {title && <h2 className="section__title text-[2rem] font-bold mb-12 text-text-main inline-block relative max-md:text-2xl">{title}</h2>}
        {children}
      </div>
    </section>
  );
}
