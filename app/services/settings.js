import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';
import { Base64 } from 'base64';
const COOKIE_NAME = 'hg-settings';

export default Service.extend({
  cookies: service(),
  googleAnalytics: service(),
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
   * Gets settings from settings cookie
   */
  getSettings() {
    let cookieService = get(this, 'cookies');
    let cookie = cookieService.read(COOKIE_NAME),
      jsonCookie;

    if(cookie) {
      jsonCookie = JSON.parse(Base64.decode(cookie));
      this.parseSettings(jsonCookie);
    }
  },
  /**
   * Parses and sets various settings
   * @param {*} settings
   */
  parseSettings(settings) {
    if(settings){
      set(this, 'rememberUser', true);
      set(this, 'sortAlpha', settings.sortAlpha);
    }
  },
  /**
   * Activates rememberUser, saves settings
   */
  rememberUserSettings() {
    set(this, 'rememberUser', true);
    this.saveSettings();
  },
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
    this.saveSettings();
  },
  /**
   * Saves settings into a cookie, if allowed
   */
  saveSettings() {
    let cookieService = get(this, 'cookies'),
      settings = {};

    if(get(this, 'rememberUser')) {
      settings = Base64.encode(JSON.stringify({
        sortAlpha: get(this, 'sortAlpha'),
        lastLogin: new Date().getTime()
      }));

      cookieService.write(COOKIE_NAME, settings);
    }
  }
});
