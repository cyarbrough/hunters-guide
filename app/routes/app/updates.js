import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  alertCenter: service(),
  metaTags: service(),
  store: service(),
  /**
   * Lifecycle function
   */
  afterModel() {
    this.metaTags.setTitle('Updates');
  },
  /**
   * Main model data for /updates
   */
  model() {
    return {
      updates: this.store.peekAll('update-item'),
    };
  },

  actions: {
    didTransition() {
      this.alertCenter.clearUpdateAlerts(2000);
      this.send('updateLastSidePanelRoute', this.routeName);
    },
    willTransition() {
      this.alertCenter.clearUpdateAlerts();
    },
  },
});
