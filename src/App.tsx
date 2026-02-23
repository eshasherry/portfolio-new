import React from 'react';
import Nav from './components/Nav';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import SkillsSection from './components/SkillsSection';
import EducationSection from './components/EducationSection';
import ContactSection from './components/ContactSection';

function App() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <footer className="text-center py-12 px-8 max-md:py-8 max-md:px-4 text-text-light text-sm border-t border-glass-border">
        <p>
          &copy; {new Date().getFullYear()} Esha Sherry. Built with{' '}
          <span aria-label="love" role="img">&#10084;</span> and React.
        </p>
      </footer>
    </>
  );
}

export default App;
