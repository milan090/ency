module.exports = {
  // verbose: true,
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "./",
  testRegex: ".*\\.spec\\.ts$",
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "../coverage",
  testEnvironment: "<rootDir>/prisma/prisma-test-env.js",
  moduleNameMapper: {
    "^src/(.*)": ["<rootDir>/src/$1"],
  },
};
