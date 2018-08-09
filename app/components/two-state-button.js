import Component from '@ember/component';
import { computed, get } from '@ember/object';

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

  label: computed('labelOn', 'labelOff', 'isOn', function() {
    if(get(this, 'isOn')) {
      return get(this, 'labelOn');
    }
    return get(this, 'labelOff');
  }),

  click() {
    if(get(this, 'isOn')) {
      this.actionOn();
    } else {
      this.actionOff();
    }
  }
});
