import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  /**
   * Overrides
   */
  classNames: ['two-state'],
  classNameBindings: ['isOn'],
  tagName: 'button',

  /**
   * Passed-in actions
   */
  actionOn: null,
  actionOff: null,
  /**
   * @var {boolean}
   */
  isOn: false,
  labelOn: 'LABEL ON',
  labelOff: 'LABEL OFF',

  label: computed('labelOn', 'labelOff', 'isOn', function () {
    if (this.isOn) {
      return this.labelOn;
    }
    return this.labelOff;
  }),

  click() {
    if (this.isOn && typeof this.actionOn === 'function') {
      this.actionOn();
    } else if (typeof this.actionOff === 'function') {
      this.actionOff();
    }
  },
});
