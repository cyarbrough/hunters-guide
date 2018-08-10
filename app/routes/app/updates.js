import Route from '@ember/routing/route';
import HeadTagsMixin from 'hunters-guide/mixins/head-tags';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Route.extend(HeadTagsMixin, {
  alertCenter: service(),
  /**
   * Lifecycle function
   */
  afterModel() {
    this.setHeadTags('Updates');
  },
  /**
   * Main model data for /updates
   */
  model() {
    return {
      updates: this.get('store').peekAll('update-item')
    };
  },
  /**
   * Renders route into side-panel
   */
  renderTemplate() {
    this.render({
      outlet: 'side-panel'
    });
  },

  actions: {
    didTransition() {
      get(this, 'alertCenter').clearUpdateAlerts(2000);
      this.send('updateLastSidePanelRoute', this.get('routeName'));
    },
    willTransition() {
      get(this, 'alertCenter').clearUpdateAlerts();
    }
  }
});
