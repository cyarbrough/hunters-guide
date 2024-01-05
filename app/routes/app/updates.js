import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class UpdatesRoute extends Route {
  @service alertCenter;
  @service metaTags;
  @service store;
  /**
   * Lifecycle function
   */
  afterModel() {
    this.metaTags.setTitle('Updates');
  }
  /**
   * Main model data for /updates
   */
  model() {
    return {
      updates: this.store.peekAll('update-item'),
    };
  }

  @action
  didTransition() {
    this.alertCenter.clearUpdateAlerts(2000);
    this.send('updateLastSidePanelRoute', this.routeName);
  }

  @action
  willTransition() {
    this.alertCenter.clearUpdateAlerts();
  }
}
