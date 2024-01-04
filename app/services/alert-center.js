import { readOnly } from '@ember/object/computed';
import Service, { inject as service } from '@ember/service';
import { set } from '@ember/object';
import { oneWay } from '@ember/object/computed';
import { task, timeout } from 'ember-concurrency';

const TIME_LAST_UPDATE = 7 * 24 * 60 * 60 * 1000; // 7 days in ms

export default Service.extend({
  settings: service(),
  /**
   * Alerts specific to updates
   * @var {number}
   */
  alertsUpdates: 0,
  /**
   * @var {boolean}
   */
  hasAlerts: readOnly('alertsUpdates'),
  /**
   *
   */
  lastCheck: oneWay('settings.lastCheck'),

  /**
   * Private task, clears alertsUpdates
   */
  _clearUpdatesTask: task(function* (timer = 0) {
    yield timeout(timer);
    set(this, 'alertsUpdates', 0);
    this.settings.saveSettings();
  }).drop(),

  /**
   * Checks given updates against TIME_LAST_UPDATE
   * @param {*} updates
   */
  checkForUpdateAlerts(updates) {
    const { lastCheck } = this;
    const lastUpdate = updates[0];

    if (lastCheck) {
      this.checkLastCheck(lastCheck, lastUpdate);
    } else {
      this.checkLastUpdate(lastUpdate);
    }
  },
  /**
   * Checks user's last login verse last update
   * @param {*} lastCheck
   * @param {*} lastUpdate
   */
  checkLastCheck(lastCheck, lastUpdate) {
    const check = new Date(lastCheck);
    const update = new Date(lastUpdate.date);

    if (check < update) {
      set(this, 'alertsUpdates', 1);
    }
  },
  /**
   * Checks time verses last update
   * @param {*} lastUpdate
   */
  checkLastUpdate(lastUpdate) {
    const check = new Date();
    const update = new Date(lastUpdate.date);
    const diff = Date.parse(update) - Date.parse(check);

    if (diff <= TIME_LAST_UPDATE) {
      set(this, 'alertsUpdates', 1);
    }
  },
  /**
   * Clears alertsUpdates
   */
  clearUpdateAlerts(timer = 0) {
    this._clearUpdatesTask.perform(timer);
  },
});
