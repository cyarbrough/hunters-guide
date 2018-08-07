import Controller from '@ember/controller';
import Ember from 'ember';
const { computed } = Ember;

export default Controller.extend({
  updateItems: computed('model.[]', function() {
    return this.get('model.updates');
  })
});
