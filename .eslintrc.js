module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: 'eslint:recommended',
  env: {
    browser: true
  },
  globals: {
    moment: true,
    sinon: true,
    server: true,
    qunit: true
  },
  rules: {
    'brace-style': ['error', '1tbs', {
      allowSingleLine: true
    }], //Forces braces for if statements to be on end of condition: if ( ) {
    'comma-dangle': ['error', 'never'], // Prevent IE Error:  Object literals: no dangling comma on last prop
    'comma-spacing': 'error',
    'comma-style': 'error', // Throws error if commas are like:  1 ,2 ,3
    'complexity': ['warn', {
      'max': 3
    }], // Logic nested more than 3 blocks deep is a code smell.
    'consistent-this': ['error', 'self'], // Requires that you use a consistent placeholder 'self' for this
    'dot-location': ['error', 'object'], // Newline . stays on new line. Eg) myPromise /n .then() instead of myPromise. /n then()
    'eqeqeq': 'error', // Forces use of === / !==
    'generator-star-spacing': ['error', {
      'before': true,
      'after': true
    }],
    'indent': ['error', 2], // Require 2 space indents
    'key-spacing': ['error', {
      'beforeColon': false
    }], // No spaces allowed before the Object key's colon
    'linebreak-style': 0, // Require unix style linebreaks
    'newline-after-var': 'error', // Forces a newline after variable declarations
    'no-cond-assign': ['error', 'always'], // No assignment in conditionals
    'no-console': ['error', {
      allow: ['warn', 'error']
    }], // Allows console.error and console.warn
    'no-debugger': 'error',
    'no-else-return': 'error',
    'no-mixed-spaces-and-tabs': 'error', // No tabs!
    'no-multi-spaces': 'error',
    'no-multiple-empty-lines': ['error', {
      max: 2
    }],
    'no-nested-ternary': 'error',
    'no-param-reassign': 'error', // Doesn't let you reassign values of params
    'no-ternary': 'warn',
    'no-trailing-spaces': ['error', {
      skipBlankLines: true
    }],
    'no-underscore-dangle': ['error', {
      'allowAfterThis': true,
      'allowAfterSuper': true
    }], // eliminate the use of dangling underscores in identifiers
    'no-unneeded-ternary': 'error',
    'no-unused-expressions': 'warn',
    'no-unused-vars': 'error',
    'no-use-before-define': 'error', // Dont use variables before they have been defined
    'no-var': 'error', // Use let instead of var, there's no reason not to
    'no-warning-comments': 'warn', // Shows TODO or FIXME keywords in build as warnings
    'object-curly-spacing': ['error', 'always'], // Forces object literal notation to have spaces eg: var o = { prop: val }
    'object-shorthand': ['warn', 'always'],
    'operator-assignment': ['warn', 'always'], // Use operators in shorthand when possible:   x += y
    'quotes': ['error', 'single'], // Use single quotes
    'semi': ['error', 'always'], // Semicolons are required
    'sort-vars': 'warn', // Sort variables within the same declaration block (off by default)
    'space-before-function-paren': ['error', {
      'anonymous': 'never',
      'named': 'never',
      'asyncArrow': 'always'
    }],
    'space-infix-ops': 'error',
    'vars-on-top': 'warn', // Variables should generally be at the beginning of the function. Warning for now.
    'yoda': ['error', 'never', {
      'exceptRange': true
    }]
  }
};
