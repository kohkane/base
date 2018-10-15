module.exports = {
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  modulePaths: ['<rootDir>/node_modules/'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleNameMapper: {
    "^helpers$": "<rootDir>/helpers.ts",
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
};