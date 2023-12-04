import { computed } from '@ember/object';
import Component from '@ember/component';

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
    let slug = this.slug || 'unknown';

    return `is-${slug}`;
  }),
  /**
   * @var {string}
   */
  logoAltClassName: computed('alternate', function() {
    if(this.alternate) {
      return 'is-alt';
    }
    return null;
  }),
  /**
   * Handles the click action
   */
  mouseUp() {
    if(typeof this.toggle === 'function') {
      this.toggle();
    }
  }
});
