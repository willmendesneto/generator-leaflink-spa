require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  extends: 'leaflink',
  globals: {
    vi: true,
  },
  overrides: [
    {
      files: 'api/*.ts',
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
      },
    },
    {
      files: 'src/services/analytics/**/*.ts',
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    {
      files: 'api/*.js',
      env: {
        node: true,
      },
    },
  ],
};
