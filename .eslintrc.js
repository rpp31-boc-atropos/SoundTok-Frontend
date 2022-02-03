module.exports = {
    env: {
      'es6': true,
      'jest': true,
      'browser': true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended'
      ],
    parserOptions: {
      sourceType: 'module',
      ecmaVersion: 6,
      ecmaFeatures: {
        'jsx': true
      }
    },
    rules: {
      /* Indentation */
      'no-mixed-spaces-and-tabs': 2,
      'indent': [2, 2],
      /* Variable names */
      'camelcase': 2,
      /* Language constructs */
      'curly': 2,
      'eqeqeq': [2, 'smart'],
      'func-style': [2, 'expression'],
      /* Semicolons */
      'semi': 2,
      'no-extra-semi': 2,
      /* Padding & additional whitespace (perferred but optional) */
      'brace-style': [2, '1tbs', { 'allowSingleLine': true }],
      'semi-spacing': 1,
      'key-spacing': 1,
      'block-spacing': 1,
      'comma-spacing': 1,
      'no-multi-spaces': 1,
      'space-before-blocks': 1,
      'keyword-spacing': [1, { 'before': true, 'after': true }],
      'space-infix-ops': 1,
      /* Variable declaration */
      'one-var': [1, { 'uninitialized': 'never', 'initialized': 'never' }],
      'no-use-before-define': 2,
      /* Minuta */
      'comma-style': [2, 'last'],
      'quotes': [1, 'single'],
      //Console.logs have a warning
      'no-console': 1,
      //The lines below address React issues and can potentially be deleted without create react app
      'react/prop-types': ['off'],
    //   "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off"
    }
  };