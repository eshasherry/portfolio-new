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
    <nav className="nav" aria-label="Main navigation">
      <div className="nav__inner">
        <div className="nav__brand">
          <a href="#hero" className="nav__logo" onClick={handleClick}>
            ES<span className="nav__logo-dot">.</span>
          </a>
          <video
            className="nav__video"
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
                className={`nav__link ${activeSection === link.href.replace('#', '') ? 'nav__link--active' : ''}`}
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
