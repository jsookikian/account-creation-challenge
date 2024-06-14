/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts', '<rootDir>/setup.js'],
  moduleNameMapper: {
    '^app/(.*)$': '<rootDir>/app/$1',
  },
};
