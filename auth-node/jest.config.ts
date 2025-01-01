import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/**/*.test.ts"],
  rootDir: ".",
  // setupFiles: ['./src/appliaction/alias.js'],
  verbose: true,
  moduleNameMapper: {
    "@<exmpl>/(.*)": "./$1",
    "@application/(.*)": "<rootDir>/src/application/$1",
    "@utils/(.*)": "<rootDir>/src/utils/$1",
    "@config/(.*)": "<rootDir>/src/config/$1",
    "@domain/(.*)": "<rootDir>/src/domain/$1",
    "@type/(.*)": "<rootDir>/src/types/$1",
    "@routes/(.*)": "<rootDir>/src/routes/$1",
    "@middleware/(.*)": "<rootDir>/src/middlewares/$1",
  },
  testTimeout: 300000,
  coverageDirectory: "./coverage",
};

export default config;
