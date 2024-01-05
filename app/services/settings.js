import Service, { service } from '@ember/service';
import { set } from '@ember/object';
import { Base64 } from 'base64';
import { tracked } from '@glimmer/tracking';

const COOKIE_NAME = 'hg-settings';

function addMonths(date, months) {
  var d = date.getDate();
  date.setMonth(date.getMonth() + +months);
  if (date.getDate() != d) {
    date.setDate(0);
  }
  return date;
}

export default class SettingsService extends Service {
  @service cookies;
  // googleAnalytics: service(),

  /**
   * Last time user checked updates
   * @var {date}
   */
  lastCheck = null;
  /**
   * Indicates if user is remembered
   * @var {boolean}
   */
  rememberUser = false;
  /**
   * Indicates if monsters are sorted by alpha
   * @var {boolean}
   */
  @tracked sortAlpha = false;
  get sortGuide() {
    return !this.sortAlpha;
  }

  /**
   * Holds the last route the side panel has accessed
   * @var {string}
   */
  defaultsidePanelRoute = 'app.updates';
  lastSidePanelRoute = 'app.updates';

  /**
   * Deletes cookie, resets settings
   */
  forgetUserSettings() {
    this.cookies.clear(COOKIE_NAME);
    this.resetService();
  }
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
  }
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
  }
  /**
   * Activates rememberUser, saves settings
   */
  rememberUserSettings() {
    set(this, 'rememberUser', true);
    this.saveSettings();
    // this.googleAnalytics.event('Setting', 'Remember Me');
  }
  /**
   * Resets all settings
   */
  resetService() {
    set(this, 'sortAlpha', false);
    set(this, 'rememberUser', false);
  }
  /**
   * Toggles sort value, sends tracking event
   */
  toggleSort() {
    // let action = 'Sort by Guide';
    // if (this.sortAlpha) {
    //   action = 'Sort by Alpha';
    // }
    // this.googleAnalytics.event('Setting', action);
    this.sortAlpha = !this.sortAlpha;
    this.saveSettings();
  }
  /**
   * Saves settings into a cookie, if allowed
   */
  saveSettings() {
    const cookieService = this.cookies;
    const expires = addMonths(new Date(), 3);
    const sameSite = 'None; Secure';
    let settings = {};

    if (this.rememberUser) {
      settings = Base64.encode(
        JSON.stringify({
          sortAlpha: this.sortAlpha,
          lastCheck: new Date().getTime(),
        }),
      );

      cookieService.write(COOKIE_NAME, settings, { expires, sameSite });
    }
  }
}
