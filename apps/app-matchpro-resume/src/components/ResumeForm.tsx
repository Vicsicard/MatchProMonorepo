import React, { useState } from 'react';

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  linkedIn: string;
  website: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  highlights: string[];
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

interface ResumeContent {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: string[];
}

interface ResumeData {
  id: string;
  content: ResumeContent;
  metadata: {
    lastUpdated: string;
    version: string;
  };
}

interface ResumeFormProps {
  initialData?: ResumeData;
  onSubmit?: (data: ResumeData) => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState<ResumeData>(
    initialData || {
      id: crypto.randomUUID(),
      content: {
        personalInfo: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          location: '',
          linkedIn: '',
          website: '',
        },
        experience: [],
        education: [],
        skills: [],
      },
      metadata: {
        lastUpdated: new Date().toISOString(),
        version: '1.0',
      },
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2>Personal Information</h2>
        <input
          type="text"
          placeholder="First Name"
          value={formData.content.personalInfo.firstName}
          onChange={(e) =>
            setFormData({
              ...formData,
              content: {
                ...formData.content,
                personalInfo: {
                  ...formData.content.personalInfo,
                  firstName: e.target.value,
                },
              },
            })
          }
        />
        <input
          type="text"
          placeholder="Last Name"
          value={formData.content.personalInfo.lastName}
          onChange={(e) =>
            setFormData({
              ...formData,
              content: {
                ...formData.content,
                personalInfo: {
                  ...formData.content.personalInfo,
                  lastName: e.target.value,
                },
              },
            })
          }
        />
      </div>
      <button type="submit">Save Resume</button>
    </form>
  );
};

export default ResumeForm;
