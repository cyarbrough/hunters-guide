import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class UpdatesController extends Controller {
  @service settings;
  /**
   * Group value to match for radio buttons
   * @var {string}
   */
  get groupValue() {
    if (this.settings.sortAlpha) {
      return 'alpha';
    }
    return 'guide';
  }

  /**
   * Checks if user cookie is set and clears, or sets if clear
   */
  @action
  toggleUserCookie() {
    if (this.settings.rememberUser) {
      this.settings.forgetUserSettings();
    } else {
      this.settings.rememberUserSettings();
    }
  }
  /**
   * Calls settings.toggleSort, and scrolls to top
   */
  @action
  toggleSort() {
    this.settings.toggleSort();
    if (this.settings.sortAlpha) {
      this.send('logEvent', 'Monster List', 'Sort by Alpha');
    } else {
      this.send('logEvent', 'Monster List', 'Sort by Guide');
    }
    document.getElementById('container').scrollTo(0, 0);
  }
}
