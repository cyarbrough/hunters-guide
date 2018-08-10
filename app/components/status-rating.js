import Component from '@ember/component';
import Ember from 'ember';
const { computed, isNone } = Ember;

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
  elementClassName: computed('elementType', function() {
    let elementName = this.get('elementType') || 'unknown';
    
    return `is-status-${elementName}`;
  }),
  /**
   * @var {boolean}
   */
  showRatingAlt: computed('ratingAlt', function() {
    
    return !isNone(this.get('ratingAlt'));
  }),
  /**
   * @var {string}
   */
  starClassName: computed('ratingAmount', function() {
    let rating = this.get('ratingAmount') || 0;
    
    if(this.get('noRating')){
      return 'is-label';
    }
    return `is-rating-${rating}`;
  }),
  /**
   * @var {string}
   */
  starClassNameAlt: computed('ratingAlt', 'showRatingAlt', function() {
    let rating = this.get('ratingAlt') || 0;

    if(this.get('showRatingAlt')) {
      return `is-rating-${rating}`;
    }
    return null;
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
  }),
  /**
   * Array of items, based on ratingAlt
   * @var {array|null}
   */
  starListAlt: computed('ratingAlt', function() {
    let ratingAlt = this.get('ratingAlt');

    if(ratingAlt) {
      let i, stars = [];

      for(i = 1; i <= ratingAlt; i++) {
        stars.push({ count: i });
      }
      return stars;
    }
    return null;
  })
});
