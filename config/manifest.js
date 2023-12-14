/* eslint-env node */
'use strict';

module.exports = function (/* environment, appConfig */) {
  // See https://github.com/san650/ember-web-app#documentation for a list of
  // supported properties

  return {
    name: 'hunters-guide',
    short_name: 'MHW Guide',
    description: "Mobile Hunter's Guide for Monster Hunter World",
    start_url: '/',
    display: 'standalone',
    background_color: '#333',
    theme_color: '#333',
    icons: [],
    ms: {
      tileColor: '#fff',
    },
  };
};
