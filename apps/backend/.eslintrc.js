/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ['airbnb', 'airbnb/hooks'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
};
