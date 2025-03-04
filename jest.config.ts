import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'], // Look for test files in the "tests" folder
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts$': 'ts-jest', // Transform .ts files using ts-jest
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Map @/ to src/ (if using path aliases)
  },
};

export default config;
