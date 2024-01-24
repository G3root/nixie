module.exports = {
  extends: [
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
    'prettier',
  ],
  plugins: ['simple-import-sort'],
  rules: {
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        prefer: 'type-imports',
        disallowTypeAnnotations: true,
        fixStyle: 'inline-type-imports',
      },
    ],
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          ['^\\u0000', '^(react|react-dom)', '^node:', '^@?\\w', '^', '^\\.'],
        ],
      },
    ],
    'simple-import-sort/exports': 'warn',
    'import/no-duplicates': ['warn', { 'prefer-inline': true }],
  },
}
