import Route from '@ember/routing/route';
import HeadTagsMixin from 'hunters-guide/mixins/head-tags';
import { inject as service } from '@ember/service';

export default Route.extend(HeadTagsMixin, {
  alertCenter: service(),
  store: service(),
  /**
   * Lifecycle function
   */
  afterModel() {
    this.setTitle('Updates');
  },
  /**
   * Main model data for /updates
   */
  model() {
    return {
      updates: this.store.peekAll('update-item')
    };
  },

  actions: {
    didTransition() {
      this.alertCenter.clearUpdateAlerts(2000);
      this.send('updateLastSidePanelRoute', this.routeName);
    },
    willTransition() {
      this.alertCenter.clearUpdateAlerts();
    }
  }
});
