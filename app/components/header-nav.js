import Component from '@ember/component';
import Ember from 'ember';
const { computed } = Ember;

export default Component.extend({
  /**
   * Overrides
   */
  classNames: ['header-nav'],
  classNameBindings: ['searchIsOpen', 'sidePanelIsOpen'],
  
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
  /**
   * @var {boolean}
   */
  sidePanelIsOpen: false,
  /**
   * Classes for menu button
   * @var {string}
   */
  classNamesButton: computed('sidePanelIsOpen', function() {
    let classes = 'menu';

    if(this.get('sidePanelIsOpen')){
      classes += ' is-open';
    }
    return classes;
  }),

  actions: {
    inputFocused(value) {
      this.set('openSearch', value);
    }
  }
});
