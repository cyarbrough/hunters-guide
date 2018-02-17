import Component from '@ember/component';
import Ember from 'ember';
const { computed } = Ember;

export default Component.extend({
  /**
   * Overrides
   */
  classNames: ['info-ailment'],
  classNameBindings: ['ailmentClassName'],
  /**
   * @var {string}
   */
  ailment: null,
  /**
   * @var {string}
   */
  ailmentClassName: computed('ailment.slug', function() {
    let ailmentName = this.get('ailment.slug') || 'unknown';

    return `is-ailment-${ailmentName}`;
  })
});
