import { isNone } from '@ember/utils';
import Component from '@glimmer/component';

export default class StatusRatingComponent extends Component {
  tagName = '';
  get dynamicClasses() {
    return `${this.elementClassName} ${this.starClassName} ${this.starClassNameAlt}`;
  }
  /**
   * @var {string}
   */
  get elementClassName() {
    let elementName = this.args.elementType || 'unknown';

    return `is-status-${elementName}`;
  }
  /**
   * @var {boolean}
   */
  get showRatingAlt() {
    return !isNone(this.args.ratingAlt);
  }
  /**
   * @var {string}
   */
  get starClassName() {
    let rating = this.args.ratingAmount || 0;

    if (this.args.noRating) {
      return 'is-label';
    }
    return `is-rating-${rating}`;
  }
  /**
   * @var {string}
   */
  get starClassNameAlt() {
    let rating = this.args.ratingAlt || 0;

    if (this.showRatingAlt) {
      return `is-rating-${rating}`;
    }
    return '';
  }
  /**
   * Array of items, based on ratingAmount
   * @var {array|null}
   */
  get starList() {
    let ratingAmount = this.args.ratingAmount;

    if (ratingAmount) {
      let i,
        stars = [];

      for (i = 1; i <= ratingAmount; i++) {
        stars.push({ count: i });
      }
      return stars;
    }
    return null;
  }
  /**
   * Array of items, based on ratingAlt
   * @var {array|null}
   */
  get starListAlt() {
    let ratingAlt = this.args.ratingAlt;

    if (ratingAlt) {
      let i,
        stars = [];

      for (i = 1; i <= ratingAlt; i++) {
        stars.push({ count: i });
      }
      return stars;
    }
    return null;
  }
}
