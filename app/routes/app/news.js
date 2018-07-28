import Route from '@ember/routing/route';
import HeadTagsMixin from 'hunters-guide/mixins/head-tags';

export default Route.extend(HeadTagsMixin, {
  afterModel() {
    this.setHeadTags('News');
  },

  renderTemplate() {
    this.render({
      outlet: 'side-panel'
    });
  }
});
