module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  ignorePatterns: [
    'node_modules',
    'dist',
    'build',
    'jest.config.js',
    'src/**/*-old.ts',
    '*.js',
  ],
};
