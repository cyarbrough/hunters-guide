import Component from '@ember/component';

export default Component.extend({
  /**
   * Overrides
   */
  classNames: ['header-nav'],
  classNameBindings: ['searchIsOpen'],
  
  actionSearch: null,
  /**
   * @var {boolean}
   */
  searchIsOpen: false,

  actions: {
    inputFocused(value) {
      this.set('searchIsOpen', value);
    }
  }
});
