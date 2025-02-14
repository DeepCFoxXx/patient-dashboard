module.exports = {
  testEnvironment: "jsdom",
  testMatch: ["**/src/tests/**/*.(test|spec).(ts|tsx)"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};