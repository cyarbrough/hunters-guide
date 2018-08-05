import Component from '@ember/component';
import Ember from 'ember';
const { computed } = Ember;

export default Component.extend({
  /**
   * Overrides
   */
  classNames: ['header-nav'],
  classNameBindings: ['searchIsOpen'],
  
  actionButton: null,
  actionSearch: null,
  /**
   * @var {boolean}
   */
  hasContent: computed.bool('searchTerm'),
  /**
   * @var {boolean}
   */
  openSearch: false,
  /**
   * @var {boolean}
   */
  searchIsOpen: computed.or('hasContent', 'openSearch'),
  /**
   * @var {string}
   */
  searchTerm: null,

  actions: {
    inputFocused(value) {
      this.set('openSearch', value);
    }
  }
});
