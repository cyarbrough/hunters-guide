import { computed } from '@ember/object';
import { isNone } from '@ember/utils';
import Component from '@ember/component';

export default Component.extend({
  /**
   * Overrides
   */
  classNames: ['status-rating'],
  classNameBindings: ['elementClassName', 'starClassName', 'starClassNameAlt'],
  /**
   * @var {string}
   */
  elementType: 'unknown',
  /**
   * @var {boolean}
   */
  noRating: false,
  /**
   * @var {integer}
   */
  ratingAmount: 0,
  ratingAlt: null,

  /**
   * @var {string}
   */
  elementClassName: computed('elementType', function () {
    let elementName = this.elementType || 'unknown';

    return `is-status-${elementName}`;
  }),
  /**
   * @var {boolean}
   */
  showRatingAlt: computed('ratingAlt', function () {
    return !isNone(this.ratingAlt);
  }),
  /**
   * @var {string}
   */
  starClassName: computed('noRating', 'ratingAmount', function () {
    let rating = this.ratingAmount || 0;

    if (this.noRating) {
      return 'is-label';
    }
    return `is-rating-${rating}`;
  }),
  /**
   * @var {string}
   */
  starClassNameAlt: computed('ratingAlt', 'showRatingAlt', function () {
    let rating = this.ratingAlt || 0;

    if (this.showRatingAlt) {
      return `is-rating-${rating}`;
    }
    return null;
  }),
  /**
   * Array of items, based on ratingAmount
   * @var {array|null}
   */
  starList: computed('ratingAmount', function () {
    let ratingAmount = this.ratingAmount;

    if (ratingAmount) {
      let i,
        stars = [];

      for (i = 1; i <= ratingAmount; i++) {
        stars.push({ count: i });
      }
      return stars;
    }
    return null;
  }),
  /**
   * Array of items, based on ratingAlt
   * @var {array|null}
   */
  starListAlt: computed('ratingAlt', function () {
    let ratingAlt = this.ratingAlt;

    if (ratingAlt) {
      let i,
        stars = [];

      for (i = 1; i <= ratingAlt; i++) {
        stars.push({ count: i });
      }
      return stars;
    }
    return null;
  }),
});
