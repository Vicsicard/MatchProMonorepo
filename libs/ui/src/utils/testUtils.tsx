import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { supabase } from '@matchpro/data';

// Mock Supabase client
jest.mock('@matchpro/data', () => ({
  supabase: {
    auth: {
      getSession: jest.fn(),
      onAuthStateChange: jest.fn(),
    },
    from: jest.fn(() => ({
      select: jest.fn(),
      insert: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    })),
  },
}));

// Wrapper component with providers
export const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  );
};

// Custom render method
export const renderWithProviders = (ui: React.ReactElement) => {
  return render(ui, { wrapper: TestWrapper });
};

// Mock resume data
export const mockResume = {
  id: '123',
  title: 'Test Resume',
  content: {
    personalInfo: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      location: 'New York, NY',
    },
    experience: [
      {
        id: 'exp1',
        company: 'Test Company',
        position: 'Software Engineer',
        startDate: '2020-01',
        endDate: '2023-12',
        current: true,
        description: 'Developed web applications',
      },
    ],
    education: [
      {
        id: 'edu1',
        school: 'Test University',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        graduationDate: '2020',
      },
    ],
    skills: [
      'JavaScript',
      'React',
      'TypeScript',
      'Node.js',
    ],
  },
  createdAt: '2023-12-20T00:00:00.000Z',
  updatedAt: '2023-12-20T00:00:00.000Z',
};

// Mock user data
export const mockUser = {
  id: 'user123',
  email: 'test@example.com',
  profile: {
    firstName: 'John',
    lastName: 'Doe',
  },
};

// Mock API responses
export const mockApiResponses = {
  success: {
    data: mockResume,
    error: null,
  },
  error: {
    data: null,
    error: {
      message: 'Something went wrong',
    },
  },
};

// Screen size presets for responsive testing
export const screenSizes = {
  mobile: {
    width: 375,
    height: 667,
  },
  tablet: {
    width: 768,
    height: 1024,
  },
  desktop: {
    width: 1280,
    height: 800,
  },
  widescreen: {
    width: 1920,
    height: 1080,
  },
};

// Viewport context for responsive testing
export const setViewport = (width: number, height: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  });
  window.dispatchEvent(new Event('resize'));
};

// Helper to simulate network conditions
export const simulateNetworkCondition = (condition: 'fast' | 'slow' | 'offline') => {
  switch (condition) {
    case 'offline':
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        configurable: true,
        value: false,
      });
      break;
    case 'slow':
      jest.setSystemTime(100); // Simulate delay
      break;
    case 'fast':
    default:
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        configurable: true,
        value: true,
      });
      break;
  }
};
