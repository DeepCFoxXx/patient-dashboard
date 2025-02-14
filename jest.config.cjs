module.exports = {
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/src/tests/styleMock.js',
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};