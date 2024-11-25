// Import Jest DOM matchers
require('@testing-library/jest-dom');

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe() { return null; }
  disconnect() { return null; }
  unobserve() { return null; }
}

global.IntersectionObserver = MockIntersectionObserver;

// Mock ResizeObserver
class MockResizeObserver {
  observe() { return null; }
  disconnect() { return null; }
  unobserve() { return null; }
}

global.ResizeObserver = MockResizeObserver;

// Mock window.scroll
global.scroll = jest.fn();
global.scrollTo = jest.fn();

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock performance.measure
if (!window.performance) {
  window.performance = {
    mark: jest.fn(),
    measure: jest.fn(),
    getEntriesByName: jest.fn().mockReturnValue([{ duration: 100 }]),
    clearMarks: jest.fn(),
    clearMeasures: jest.fn(),
  };
}

// Suppress console errors during tests
console.error = jest.fn();

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
);
