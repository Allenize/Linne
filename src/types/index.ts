export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  images?: string[];
  logo?: string;
  navIcon?: string;
  mobileImage?: string;
  mobileImages?: string[];
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  downloadUrl?: string;
  type: string;
  features: string[];
}

export interface Skill {
  name: string;
  category: "language" | "technology" | "tool";
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  period: string;
  description: string;
  images: string[];
}

export interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  image?: string;
}

export interface NavItem {
  label: string;
  href: string;
}