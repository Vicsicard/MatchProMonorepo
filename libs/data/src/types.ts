export interface Profile {
  id: string;
  created_at: string;
  updated_at: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  title?: string;
  bio?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

export interface Resume {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  title: string;
  content: ResumeContent;
  is_public: boolean;
  version: number;
  file_path?: string;
}

export interface ResumeContent {
  basics: {
    name: string;
    email: string;
    phone?: string;
    location?: {
      address?: string;
      city?: string;
      region?: string;
      country?: string;
    };
    summary?: string;
    website?: string;
    profiles?: Array<{
      network: string;
      url: string;
      username?: string;
    }>;
  };
  work?: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    summary?: string;
    highlights?: string[];
    location?: string;
  }>;
  education?: Array<{
    institution: string;
    area: string;
    studyType: string;
    startDate: string;
    endDate?: string;
    gpa?: string;
    courses?: string[];
  }>;
  skills?: Array<{
    name: string;
    level?: string;
    keywords?: string[];
  }>;
  projects?: Array<{
    name: string;
    description: string;
    startDate?: string;
    endDate?: string;
    url?: string;
    highlights?: string[];
    technologies?: string[];
  }>;
  certifications?: Array<{
    name: string;
    issuer: string;
    date: string;
    url?: string;
  }>;
  languages?: Array<{
    language: string;
    fluency: string;
  }>;
  interests?: Array<{
    name: string;
    keywords?: string[];
  }>;
  references?: Array<{
    name: string;
    reference: string;
    position?: string;
    company?: string;
  }>;
  metadata?: {
    lastUpdated: string;
    version: number;
    template?: string;
    theme?: string;
  };
}
