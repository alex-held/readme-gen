module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
    es6: true,
    commonjs: true,
    browser: true,
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
   // "plugin:flowtype/recommended"
  ],
  rules: {
    'no-use-before-define': ['error', {functions: false}],
    'comma-dangle': 0,
    'no-var': 2,
    'prefer-const': 2,
    'operator-linebreak': 0,
    'no-confusing-arrow': 0,
    'implicit-arrow-linebreak': 0,
    semi: ['error', 'always'],
    indent: [
      "error",
      4
    ],
    'no-param-reassign': 0,
    'function-paren-newline': 0,
    'arrow-parens': 0
  },
  // plugins: ["flowtype"],
}
