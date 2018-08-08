import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Service.extend({
  googleAnalytics: service(),
  /**
   * Indicates if monsters are sorted by alpha
   * @var {boolean}
   */
  sortAlpha: false,

  /**
   * Toggles sort value, sends tracking event
   */
  toggleSort() {
    let action = 'Sort by Guide';

    this.toggleProperty('sortAlpha');
    if(get(this, 'sortAlpha')) {
      action = 'Sort by Alpha';
    }
    get(this, 'googleAnalytics').event('Setting', action);
  }
});
