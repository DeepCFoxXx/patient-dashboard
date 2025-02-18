module.exports = {
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/src/tests/styleMock.js',
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};