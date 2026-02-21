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
        <a href="#hero" className="nav__logo" onClick={handleClick}>
          ES<span className="nav__logo-dot">.</span>
        </a>

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
