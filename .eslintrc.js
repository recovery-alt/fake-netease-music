module.exports = {
  root: true,
  env: { node: true },
  parserOptions: { ecmaVersion: 2020, parser: '@typescript-eslint/parser' },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 1 : 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 1 : 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'react/prop-types': 0,
  },
};
