import Component from '@ember/component';

export default Component.extend({
  /**
   * Overrides
   */
  classNames: ['status-grid'],
  classNameBindings: ['showGrid:is-visible']
});
