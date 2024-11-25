export interface ContactInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
}

export interface WorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements?: string[];
  location?: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  graduationDate: string;
  gpa?: number;
  achievements?: string[];
  location?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
}

export interface Project {
  name: string;
  description: string;
  startDate?: string;
  endDate?: string;
  url?: string;
  technologies: string[];
  achievements: string[];
}

export interface Resume {
  id?: string;
  userId: string;
  contactInfo: ContactInfo;
  summary: string;
  skills: string[];
  workExperience: WorkExperience[];
  education: Education[];
  certifications?: Certification[];
  projects?: Project[];
  createdAt?: string;
  updatedAt?: string;
}
