export interface Project {
  title: string;
  company: string;
  description: string;
  highlights: string[];
  tags: string[];
  featured?: boolean;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  current?: boolean;
  highlights: string[];
  resumeHighlights?: string[];
}

export interface Education {
  school: string;
  degree: string;
  year: string;
  location: string;
  coursework?: string;
  capstone?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  highlighted?: boolean;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}
