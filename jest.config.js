module.exports = {
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  preset: 'ts-jest',
  testMatch: ["**/src/functions/**/*.(unit|integration).test.+(ts|tsx|js)"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/lib/"],
  verbose: false,
  moduleNameMapper: {
    "@functions/(.*)": "<rootDir>/src/functions/$1",
    "@models/(.*)": "<rootDir>/src/models/$1",
  }
};