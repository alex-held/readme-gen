module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  verbose: true,
  testMatch: [
    "**/__tests__/**/*.js", "**/__tests__/**/*.ts",
    "**/*.spec.js", "**/*.spec..ts",
    "**/questions/*.spec.js", "**/questions/*.spec..ts"
  ],
  exclude: [
    "node_modules", "dist", "build"
  ],
  collectCoverageFrom: [
    './src/**/*.(js|ts)',
    '!./src/index.ts|ts',
    '!**/node_modules/**',
    '!**/vendor/**'
  ]
}
