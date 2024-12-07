module.exports = {
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/index.ts'],
  moduleNameMapper: {'^.+\\.s?css$': 'identity-obj-proxy'},
  transform: {'^.+\\.tsx?$': 'babel-jest'},
  testRegex: '/.*\\.test\\.tsx?$',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  setupFiles: [],
  testPathIgnorePatterns: [
      '__snapshots__',
      '__mocks__',
      '<rootDir>/scripts',
  ],
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  testEnvironment: 'jsdom'
};