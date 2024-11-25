import React from 'react';
import { render, screen } from '@testing-library/react';
import ResumeForm from './ResumeForm';

const mockResume = {
  id: '123',
  content: {
    personalInfo: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      location: 'San Francisco, CA',
      linkedIn: 'linkedin.com/in/johndoe',
      website: 'johndoe.com',
    },
    experience: [
      {
        id: 'exp1',
        company: 'Tech Corp',
        position: 'Software Engineer',
        startDate: '2020-01',
        endDate: '2023-01',
        current: false,
        highlights: ['Developed features', 'Led team'],
      },
    ],
    education: [
      {
        id: 'edu1',
        institution: 'University of Tech',
        degree: 'Bachelor',
        field: 'Computer Science',
        startDate: '2016-09',
        endDate: '2020-05',
        gpa: '3.8',
      },
    ],
    skills: ['JavaScript', 'React', 'TypeScript'],
  },
  metadata: {
    lastUpdated: '2024-02-20T00:00:00.000Z',
    version: '1.0',
  },
};

describe('ResumeForm Performance', () => {
  it('renders quickly with initial data', () => {
    const start = performance.now();
    render(<ResumeForm initialData={mockResume} />);
    const end = performance.now();
    
    expect(end - start).toBeLessThan(100); // Should render in less than 100ms
    expect(screen.getByDisplayValue('John')).toBeInTheDocument();
  });

  it('handles large datasets efficiently', () => {
    const largeResume = {
      ...mockResume,
      content: {
        ...mockResume.content,
        experience: Array(100).fill(mockResume.content.experience[0]),
        education: Array(50).fill(mockResume.content.education[0]),
        skills: Array(200).fill('Skill').map((skill, i) => `${skill}${i}`),
      },
    };

    const start = performance.now();
    render(<ResumeForm initialData={largeResume} />);
    const end = performance.now();

    expect(end - start).toBeLessThan(200); // Should handle large data in less than 200ms
  });
});
