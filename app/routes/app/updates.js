import Route from '@ember/routing/route';
import HeadTagsMixin from 'hunters-guide/mixins/head-tags';

export default Route.extend(HeadTagsMixin, {
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
  }
});
