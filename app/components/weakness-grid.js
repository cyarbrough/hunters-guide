import Component from '@ember/component';

export default Component.extend({
  /**
   * Overrides
   */
  classNames: ['weakness-grid'],
  classNameBindings: ['showGrid:is-visible']
});