/* eslint-env node */
'use strict';

/* eslint-disable complexity */
module.exports = function(environment) {
  const ENV = {
    modulePrefix: 'hunters-guide',
    environment,
    rootURL: '/',
    locationType: 'history',
    EmberENV: {
      EXTEND_PROTOTYPES: false,
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    emberTracker: {
      analyticsSettings: {
        trackingId: 'UA-########-#'
      }
    },
    fastboot: {
      hostWhitelist: ['hunters-guide.herokuapp.com', /^localhost:\d+$/]
    }
  };

  if (environment === 'development') {
    ENV.contentSecurityPolicy = {
      'default-src': '\'none\'',
      'script-src': '\'self\' \'unsafe-inline\' \'unsafe-eval\' https://www.google-analytics.com/',
      'font-src': '\'self\' https://fonts.gstatic.com/',
      'connect-src': '\'self\' http://hunters-guide.herokuapp.com/',
      'img-src': '\'self\' https://www.google-analytics.com/',
      'style-src': '\'self\' \'unsafe-inline\' \'unsafe-eval\' https://fonts.gstatic.com/ https://fonts.googleapis.com',
      'media-src': '\'self\'',
      'manifest-src': '\'self\''
    };

    ENV.emberTracker.analyticsSettings.LOG_PAGEVIEW = true;
    ENV.emberTracker.analyticsSettings.LOG_EVENTS = true;

    ENV.webUrl = 'http://localhost:4200/';
    // ENV.webUrl = 'http://192.168.1.13:4200/';
    
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
    ENV.emberTracker.analyticsSettings.trackingId = process.env.GA_KEY;
    ENV.webUrl = process.env.WEB_URL;
  }

  return ENV;
};
