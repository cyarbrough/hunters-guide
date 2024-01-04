import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  /**
   * Overrides
   */
  classNames: ['update-item'],
  tagName: 'tr',
  formattedDate: computed('item.date', function () {
    const date = new Date(this.item.date);
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}.${month}.${day}`;
  }),
});
