/* eslint-env node */
module.exports = {
  coverageEnvVar: 'COVERAGE',
  reporters: ['html', 'text'],
  excludes: [
    '*/mirage/**/*',
    '*/templates/**/*',
    '*/router.js',
    '*/transitions.js'
  ],
  useBabelInstrumenter: true
};
