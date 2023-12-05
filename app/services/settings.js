import Service, { inject as service } from '@ember/service';
import { get, set } from '@ember/object';
import { Base64 } from 'base64';

const COOKIE_NAME = 'hg-settings';

function addMonths(date, months) {
  var d = date.getDate();
  date.setMonth(date.getMonth() + +months);
  if (date.getDate() != d) {
    date.setDate(0);
  }
  return date;
}

export default Service.extend({
  cookies: service(),
  googleAnalytics: service(),

  /**
   * Last time user checked updates
   * @var {date}
   */
  lastCheck: null,
  /**
   * Indicates if user is remembered
   * @var {boolean}
   */
  rememberUser: false,
  /**
   * Indicates if monsters are sorted by alpha
   * @var {boolean}
   */
  sortAlpha: false,

  /**
   * Deletes cookie, resets settings
   */
  forgetUserSettings() {
    this.cookies.clear(COOKIE_NAME);
    this.resetService();
  },
  /**
   * Gets settings from settings cookie
   */
  getSettings() {
    const cookieService = this.cookies;
    const cookie = cookieService.read(COOKIE_NAME);
    let jsonCookie;

    if (cookie) {
      jsonCookie = JSON.parse(Base64.decode(cookie));
      this.parseSettings(jsonCookie);
    }
  },
  /**
   * Parses and sets various settings
   * @param {*} settings
   */
  parseSettings(settings) {
    if (settings) {
      set(this, 'rememberUser', true);
      set(this, 'sortAlpha', settings.sortAlpha);
      set(this, 'lastCheck', settings.lastCheck);
    }
  },
  /**
   * Activates rememberUser, saves settings
   */
  rememberUserSettings() {
    set(this, 'rememberUser', true);
    this.saveSettings();
    get(this, 'googleAnalytics').event('Setting', 'Remember Me');
  },
  /**
   * Resets all settings
   */
  resetService() {
    set(this, 'sortAlpha', false);
    set(this, 'rememberUser', false);
  },
  /**
   * Toggles sort value, sends tracking event
   */
  toggleSort() {
    let action = 'Sort by Guide';

    this.toggleProperty('sortAlpha');
    if (this.sortAlpha) {
      action = 'Sort by Alpha';
    }
    get(this, 'googleAnalytics').event('Setting', action);
    this.saveSettings();
  },
  /**
   * Saves settings into a cookie, if allowed
   */
  saveSettings() {
    const cookieService = this.cookies;
    const expires = addMonths(new Date(), 3);
    const sameSite = 'None; Secure';
    let settings = {};

    if (this.rememberUser) {
      settings = Base64.encode(JSON.stringify({
        sortAlpha: this.sortAlpha,
        lastCheck: new Date().getTime()
      }));

      cookieService.write(COOKIE_NAME, settings, { expires, sameSite });
    }
  }
});
