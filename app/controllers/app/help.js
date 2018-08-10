import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  /**
   * Sample list of ailments
   */
  ailmentList: computed(function() {
    let store = this.get('store');

    return [
      store.peekRecord('ailment', 'fireBlight'),
      store.peekRecord('ailment', 'poison')
    ];
  })
});
