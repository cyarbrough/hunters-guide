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
   * Action to bubble to app
   */
  showPanelAction: 'sidePanelInserted',
  /**
   * Sends action when inserted
   */
  didInsertElement() {
    this.sendAction('showPanelAction');
  }
});
