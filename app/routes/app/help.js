import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  metaTags: service(),
  /**
   * Lifecycle function
   */
  afterModel() {
    this.metaTags.setTitle('Help');
  },
  actions: {
    didTransition() {
      this.send('updateLastSidePanelRoute', this.routeName);
    },
  },
});
