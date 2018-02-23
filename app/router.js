import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import googlePageView from './mixins/google-pageview';

const Router = EmberRouter.extend(googlePageView, {
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('app', { path: '/' });
});

export default Router;
