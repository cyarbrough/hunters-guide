import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class HelpRoute extends Route {
  @service metaTags;
  /**
   * Lifecycle function
   */
  afterModel() {
    this.metaTags.setTitle('Help');
  }

  @action
  didTransition() {
    this.send('updateLastSidePanelRoute', this.routeName);
  }
}
