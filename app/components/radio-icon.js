import Component from '@ember/component';

export default Component.extend({
  /**
   * Overrides
   */
  classNames: ['radio-icon'],
  classNameBindings: ['radioOn:is-on'],
  tagName: 'span'
});
