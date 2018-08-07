import Route from '@ember/routing/route';
import HeadTagsMixin from 'hunters-guide/mixins/head-tags';

export default Route.extend(HeadTagsMixin, {
  /**
   * Lifecycle function
   */
  afterModel() {
    this.setHeadTags('News');
  },
  /**
   * Main model data for /news
   */
  model() {
    return {
      news: this.get('store').peekAll('news-item')
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
