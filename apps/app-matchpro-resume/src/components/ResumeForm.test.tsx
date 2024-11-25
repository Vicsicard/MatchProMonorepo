import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

describe('ResumeForm', () => {
  it('renders with initial data', () => {
    render(<ResumeForm initialData={mockResume} />);
    expect(screen.getByDisplayValue('John')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Doe')).toBeInTheDocument();
  });

  it('handles form submission', () => {
    const onSubmit = jest.fn();
    render(<ResumeForm initialData={mockResume} onSubmit={onSubmit} />);
    
    fireEvent.submit(screen.getByRole('button', { name: /save resume/i }));
    expect(onSubmit).toHaveBeenCalledWith(mockResume);
  });
});
