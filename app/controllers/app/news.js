import Controller from '@ember/controller';
import Ember from 'ember';
const { computed } = Ember;

export default Controller.extend({
  newsItem: computed('model.[]', function() {
    return this.get('model.news');
  })
});
