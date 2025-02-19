module.exports = {
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/src/tests/styleMock.js',
  },
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/src/tests/setupTests.js'],
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};