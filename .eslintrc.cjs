module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-unused-vars': 'warn',
    'no-template-curly-in-string': 'warn',
    'object-shorthand': 'warn',
    'prettier/prettier': [
      'warn',
      {
        arrowParens: 'always',
        bracketSameLine: true,
        singleQuote: true,
        trailingComma: 'all',
        tabWidth: 2,
        printWidth: 160,
        endOfLine: 'crlf',
        overrides: [
          {
            files: ['*.html'],
            options: {
              parser: 'html',
            },
          },
        ],
      },
      {
        usePrettierrc: true,
      },
    ],
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react/no-array-index-key': 'warn',
    'react/react-in-jsx-scope': 'off',
  },
};
