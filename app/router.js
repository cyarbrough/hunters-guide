import EmberRouter from '@ember/routing/router';
import config from './config/environment';
// import GoogleAnalyticsRoute from 'ember-tracker/mixins/google-analytics-route';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('app', { path: '/' }, function () {
    this.route('updates');
    this.route('help');
  });
});
