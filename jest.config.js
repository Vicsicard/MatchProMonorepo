module.exports = {
  // The root of your source code
  roots: ['<rootDir>/apps', '<rootDir>/libs'],

  // Test file patterns
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],

  // Module file extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // Transform files with ts-jest for TypeScript/React
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
        diagnostics: {
          ignoreCodes: [1259],
        },
      },
    ],
    '^.+\\.(js|jsx)$': ['babel-jest', {
      presets: ['@babel/preset-env', '@babel/preset-react'],
    }],
  },

  // Module name mapper for aliases and static assets
  moduleNameMapper: {
    '^@matchpro/(.*)$': '<rootDir>/libs/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.svg$': '<rootDir>/__mocks__/svgrMock.js',
  },

  // Setup files
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Test environment
  testEnvironment: 'jsdom',

  // Coverage configuration
  collectCoverageFrom: [
    'apps/**/*.{ts,tsx}',
    'libs/**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],

  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

  // Ignore patterns
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],

  // Transform ignore patterns
  transformIgnorePatterns: [
    '/node_modules/(?!(@matchpro|react-icons)/)',
  ],

  // Verbose output
  verbose: true,
};
