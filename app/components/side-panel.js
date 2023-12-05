import Component from '@ember/component';

export default Component.extend({
  /**
   * Overrides
   */
  classNames: ['side-panel'],
  classNameBindings: ['isOpen'],

  /**
   * Indicates if the side panel is open
   */
  isOpen: false,
  /**
   * Sends action when inserted
   */
  didInsertElement() {
    if(typeof this.actionInserted === 'function') {
      this.actionInserted();
    }
  }
});
