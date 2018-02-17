import Component from '@ember/component';
import Ember from 'ember';
const { computed } = Ember;

export default Component.extend({
  /**
   * Overrides
   */
  classNames: ['monster-logo'],
  classNameBindings: ['logoClassName'],
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
  })
});
