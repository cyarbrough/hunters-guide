import Component from '@ember/component';
import Ember from 'ember';
const { computed } = Ember;

export default Component.extend({
  /**
   * Overrides
   */
  classNames: ['status-rating'],
  classNameBindings: ['elementClassName', 'starClassName'],
  /**
   * @var {string}
   */
  elementType: 'unknown',
  /**
   * @var {integer}
   */
  ratingAmount: 0,

  /**
   * @var {string}
   */
  elementClassName: computed('elementType', function() {
    return `is-element-${this.get('elementType')}`;
  }),
  /**
   * @var {string}
   */
  starClassName: computed('ratingAmount', function() {
    return `is-rating-${this.get('ratingAmount')}`;
  }),
  /**
   * Array of items, based on ratingAmount
   * @var {array|null}
   */
  starList: computed('ratingAmount', function() {
    let ratingAmount = this.get('ratingAmount');

    if(ratingAmount) {
      let i, stars = [];

      for(i = 1; i <= ratingAmount; i++) {
        stars.push({ count: i });
      }
      return stars;
    }
    return null;
  })
});
