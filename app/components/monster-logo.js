import Component from '@ember/component';
import Ember from 'ember';
const { $, computed } = Ember;

export default Component.extend({
  /**
   * Overrides
   */
  classNames: ['monster-logo'],
  classNameBindings: ['logoClassName', 'logoAltClassName', 'isHidden'],
  tagName: 'button',
  /**
   * @var {boolean}
   */
  alternate: false,
  /**
   * @var {boolean}
   */
  isHidden: false,
  /**
   * @var {string}
   */
  slug: null,
  /**
   * @var {string}
   */
  logoClassName: computed('slug', function() {
    let slug = this.get('slug') || 'unknown';

    return `is-${slug}`;
  }),
  /**
   * @var {string}
   */
  logoAltClassName: computed('alternate', function() {
    if(this.get('alternate')) {
      return 'is-alt';
    }
    return null;
  }),
  /**
   * Handles the click action
   */
  mouseUp() {
    if($.isFunction(this.toggle)) {
      this.toggle();
    }
  }
});
