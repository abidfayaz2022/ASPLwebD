export default {
    env: {
      node: true,
      es2021: true,
    },
    extends: ['airbnb-base', 'prettier'],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-console': 'off',
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'always',
        },
      ],
      'no-underscore-dangle': 'off',
      'no-param-reassign': 'off',
    },
  };
  