import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { navLinks } from '../data/portfolioData';
import { useActiveSection } from '../hooks/useActiveSection';
import GlassSurface from './GlassSurface';
import './Nav.css';

const sectionIds = navLinks.map((l) => l.href.replace('#', ''));

const springTransition = { type: 'spring' as const, stiffness: 350, damping: 30 };

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection(sectionIds);

  const closeMenu = () => setMenuOpen(false);

  // Track scroll for shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile sheet is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <MotionConfig reducedMotion="user">
    <>
      {/* ─── Floating pill nav ─────────────────────── */}
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] transition-shadow duration-300 ${
          scrolled ? 'shadow-lg' : ''
        }`}
        style={{ borderRadius: 999 }}
        aria-label="Main navigation"
      >
        <GlassSurface
          width="100%"
          height="100%"
          borderRadius={999}
          backgroundOpacity={0.9}
          distortionScale={-30}
          className="!absolute !inset-0 !bg-white/90"
        />
        <div className="relative z-10 flex items-center gap-1 px-3 py-1.5">
          {/* Logo */}
          <a
            href="#hero"
            className="text-xl font-bold text-text-main tracking-tight px-2 py-1 shrink-0"
            onClick={closeMenu}
          >
            ES<span className="text-accent">.</span>
          </a>

          {/* Desktop links */}
          <ul className="nav__links">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`relative py-1.5 px-3 rounded-pill text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-text-main'
                        : 'text-text-light hover:text-text-main'
                    }`}
                    onClick={closeMenu}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-pill bg-[rgba(255,176,136,0.2)]"
                        transition={springTransition}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Mobile hamburger */}
          <button
            className={`nav__hamburger ${menuOpen ? 'nav__hamburger--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-sheet"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* ─── Mobile bottom sheet ───────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Scrim */}
            <motion.div
              className="nav__scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
            />
            {/* Sheet */}
            <motion.div
              id="mobile-nav-sheet"
              className="nav__sheet"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={springTransition}
            >
              <ul className="nav__sheet-links">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.replace('#', '');
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className={isActive ? 'active' : ''}
                        onClick={closeMenu}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="activeNavSheet"
                            className="absolute inset-0 rounded-[var(--radius-md)] bg-[rgba(255,176,136,0.2)]"
                            transition={springTransition}
                          />
                        )}
                        <span className="relative z-10">{link.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
    </MotionConfig>
  );
}
