import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  store: service(),
  /**
   * Sample list of ailments
   */
  ailmentList: computed(function() {
    let store = this.store;

    return [
      store.peekRecord('ailment', 'fireBlight'),
      store.peekRecord('ailment', 'poison')
    ];
  })
});
