import Component from '@ember/component';
import { computed, get } from '@ember/object';

export default Component.extend({
  /**
   * Overrides
   */
  classNames: ['two-state'],
  tagName: 'button',

  /**
   * Passed-in actions
   */
  actionOn: null,
  actionOff: null,
  /**
   * @var {boolean}
   */
  on: false,
  labelOn: 'LABEL ON',
  labelOff: 'LABEL OFF',

  label: computed('labelOn', 'labelOff', 'on', function() {
    if(get(this, 'on')) {
      return get(this, 'labelOn');
    }
    return get(this, 'labelOff');
  }),

  click() {
    if(get(this, 'on')) {
      this.actionOn();
    } else {
      this.actionOff();
    }
  }
});
