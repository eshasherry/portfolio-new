import React from 'react';
import './BentoCard.css';

interface BentoCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'golden' | 'highlight';
  className?: string;
  style?: React.CSSProperties;
}

export default function BentoCard({
  children,
  variant = 'default',
  className = '',
  style,
}: BentoCardProps) {
  return (
    <div
      className={`bento-card bento-card--${variant} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
