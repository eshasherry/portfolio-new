import React, { useState } from 'react';
import { navLinks } from '../data/portfolioData';
import { useActiveSection } from '../hooks/useActiveSection';
import './Nav.css';

const sectionIds = navLinks.map((l) => l.href.replace('#', ''));

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection(sectionIds);

  const handleClick = () => setMenuOpen(false);

  return (
    <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-[16px] border-b border-glass-border h-[var(--nav-height)]" aria-label="Main navigation">
      <div className="max-w-site mx-auto px-8 h-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <a href="#hero" className="text-2xl font-bold text-text-main tracking-tight" onClick={handleClick}>
            ES<span className="text-accent">.</span>
          </a>
          <video
            className="h-20 w-auto rounded-sm object-cover"
            src={`${process.env.PUBLIC_URL}/Video_No_Background.mp4`}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
        </div>

        <button
          className={`nav__hamburger ${menuOpen ? 'nav__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`nav__links ${menuOpen ? 'nav__links--open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`py-2 px-4 rounded-pill text-sm font-medium transition-all duration-200
                  ${activeSection === link.href.replace('#', '')
                    ? 'text-text-main bg-[rgba(255,176,136,0.2)]'
                    : 'text-text-light hover:text-text-main hover:bg-[rgba(255,176,136,0.15)]'
                  }`}
                onClick={handleClick}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
