import Route from '@ember/routing/route';
import HeadTagsMixin from 'hunters-guide/mixins/head-tags';

export default Route.extend(HeadTagsMixin, {
  /**
   * Lifecycle function
   */
  afterModel() {
    this.setHeadTags('Help');
  },
  actions: {
    didTransition() {
      this.send('updateLastSidePanelRoute', this.routeName);
    }
  }
});
