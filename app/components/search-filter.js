import Component from '@ember/component';
import Ember from 'ember';

const { $ } = Ember;

export default Component.extend({
  /**
   * Overrides
   */
  classNames: ['search-filter'],

  actions: {
    clearSearch() {
      if($.isFunction(this.actionSearch)) {
        this.actionSearch(null);
      }
    },
    onKeyUp() {
      if($.isFunction(this.actionSearch)) {
        this.actionSearch(this.get('searchTerm'));
      }
    }
  }
});
