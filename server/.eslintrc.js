module.exports = {
  extends: ['semistandard'],
  rules: {
    camelcase: 'off',
    '@typescript-eslint/naming-convention': [
      'off',
      {
        selector: 'default',
        format: null,
      },
    ],
    'comma-dangle': ['error', 'always-multiline'],
    'space-before-function-paren': 'off',
  },
};
