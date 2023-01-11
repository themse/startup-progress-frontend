module.exports = {
  root: true,
  extends: ['react-app'],
  rules: {
    'no-empty-function': 'off',
    '@typescript-eslint/ban-types': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': ['warn'],
    'react/prop-types': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    'no-console': ['warn', { allow: ['warn', 'error', 'info', 'table'] }],
    'no-param-reassign': ['error', { props: true }],
    '@typescript-eslint/no-explicit-any': ['warn'],
    'react/react-in-jsx-scope': 'off',
  },
};
