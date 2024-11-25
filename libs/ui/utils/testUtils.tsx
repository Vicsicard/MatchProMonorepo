import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider } from '@matchpro/ui/providers/ThemeProvider';
import { rootReducer } from '@matchpro/data/store';

// Screen size configurations
export const screenSizes = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1440, height: 900 },
};

// Mock resume data
export const mockResume = {
  id: '1',
  content: {
    personalInfo: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      linkedIn: 'linkedin.com/in/johndoe',
      website: 'johndoe.com',
    },
    experience: [
      {
        id: 'exp1',
        company: 'Tech Corp',
        position: 'Senior Software Engineer',
        startDate: '2020-01',
        endDate: '2023-present',
        location: 'San Francisco, CA',
        highlights: [
          'Led development of microservices architecture',
          'Improved system performance by 40%',
          'Mentored junior developers',
        ],
      },
    ],
    education: [
      {
        id: 'edu1',
        institution: 'Stanford University',
        degree: 'Master of Science in Computer Science',
        startDate: '2018',
        endDate: '2020',
        location: 'Stanford, CA',
        gpa: '3.9',
      },
    ],
    skills: [
      'JavaScript',
      'TypeScript',
      'React',
      'Node.js',
      'Python',
      'AWS',
    ],
  },
  metadata: {
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-06-01T00:00:00Z',
    version: '1.0',
  },
};

// Configure test store
const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

// Wrapper component for tests
export const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const store = createTestStore();

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

// Custom render function with providers
export const renderWithProviders = (
  ui: React.ReactElement,
  options = {}
) => {
  return render(ui, {
    wrapper: TestWrapper,
    ...options,
  });
};

// Viewport simulation
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

// Network condition simulation
type NetworkCondition = 'fast' | 'slow' | 'offline';

export const simulateNetworkCondition = (condition: NetworkCondition) => {
  if (condition === 'offline') {
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      configurable: true,
      value: false,
    });
    window.dispatchEvent(new Event('offline'));
  } else {
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      configurable: true,
      value: true,
    });
    window.dispatchEvent(new Event('online'));

    if (condition === 'slow') {
      // Simulate 3G connection
      Object.defineProperty(navigator, 'connection', {
        writable: true,
        configurable: true,
        value: {
          effectiveType: '3g',
          saveData: false,
        },
      });
    } else {
      // Simulate 4G connection
      Object.defineProperty(navigator, 'connection', {
        writable: true,
        configurable: true,
        value: {
          effectiveType: '4g',
          saveData: false,
        },
      });
    }
  }
};

// Mock IntersectionObserver for lazy loading tests
class MockIntersectionObserver {
  observe() { return null; }
  disconnect() { return null; }
  unobserve() { return null; }
}

export const setupIntersectionObserverMock = () => {
  global.IntersectionObserver = MockIntersectionObserver as any;
};

// Mock ResizeObserver for responsive tests
class MockResizeObserver {
  observe() { return null; }
  disconnect() { return null; }
  unobserve() { return null; }
}

export const setupResizeObserverMock = () => {
  global.ResizeObserver = MockResizeObserver as any;
};

// Mock fetch for API tests
export const mockFetch = (response: any) => {
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(response),
    })
  );
};

// Clean up mocks
export const cleanupMocks = () => {
  jest.restoreAllMocks();
  delete (global as any).IntersectionObserver;
  delete (global as any).ResizeObserver;
  delete (global as any).fetch;
};
