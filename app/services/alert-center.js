import Service, { service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';

const TIME_LAST_UPDATE = 7 * 24 * 60 * 60 * 1000; // 7 days in ms

export default class AlertCenterService extends Service {
  @service settings;
  /**
   * Alerts specific to updates
   * @var {number}
   */
  @tracked alertsUpdates = 0;

  /**
   * Private task, clears alertsUpdates
   */
  _clearUpdatesTask = task({ drop: true }, async (timer = 0) => {
    await timeout(timer);
    this.alertsUpdates = 0;
    this.settings.saveSettings();
  });

  /**
   * Checks given updates against TIME_LAST_UPDATE
   * @param {*} updates
   */
  checkForUpdateAlerts(updates) {
    const { lastCheck } = this.settings;
    const lastUpdate = updates[0];

    if (lastCheck) {
      this.checkLastCheck(lastCheck, lastUpdate);
    } else {
      this.checkLastUpdate(lastUpdate);
    }
  }
  /**
   * Checks user's last login verse last update
   * @param {*} lastCheck
   * @param {*} lastUpdate
   */
  checkLastCheck(lastCheck, lastUpdate) {
    const check = new Date(lastCheck);
    const update = new Date(lastUpdate.date);

    if (check < update) {
      this.alertsUpdates = 1;
    }
  }
  /**
   * Checks time verses last update
   * @param {*} lastUpdate
   */
  checkLastUpdate(lastUpdate) {
    const check = new Date();
    const update = new Date(lastUpdate.date);
    const diff = Date.parse(update) - Date.parse(check);

    if (diff <= TIME_LAST_UPDATE) {
      this.alertsUpdates = 1;
    }
  }
  /**
   * Clears alertsUpdates
   */
  clearUpdateAlerts(timer = 0) {
    this._clearUpdatesTask.perform(timer);
  }
}
