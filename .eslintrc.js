module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'simple-import-sort', 'prettier'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // Додає Prettier
    'prettier', // Вимикає конфліктуючі правила ESLint
  ],
  rules: {
    'prettier/prettier': 'error', // Включає правило Prettier
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
};
