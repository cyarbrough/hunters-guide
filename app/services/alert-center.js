import Service from '@ember/service';
import { get, set } from '@ember/object';
import { or, oneWay } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';

const TIME_LAST_UPDATE = 7 * 24 * 60 * 60 * 1000; // 7 days in ms

export default Service.extend({
  moment: service(),
  settings: service(),
  /**
   * Alerts specific to updates
   * @var {number}
   */
  alertsUpdates: 0,
  /**
   * @var {boolean}
   */
  hasAlerts: or('alertsUpdates'),
  /**
   *
   */
  lastCheck: oneWay('settings.lastCheck'),

  /**
   * Private task, clears alertsUpdates
   */
  _clearUpdatesTask: task(function * (timer = 0){
    yield timeout(timer);
    set(this, 'alertsUpdates', 0);
    get(this, 'settings').saveSettings();
  }).drop(),
  
  /**
   * Checks given updates against TIME_LAST_UPDATE
   * @param {*} updates
   */
  checkForUpdateAlerts(updates) {
    let lastCheck = get(this, 'lastCheck'),
      lastUpdate = updates.get('firstObject');

    if(lastCheck) {
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
    let m = this.get('moment');
    let lastCheckM = m.moment(lastCheck);

    if(lastCheckM.isBefore(get(lastUpdate, 'date'))) {
      set(this, 'alertsUpdates', 1);
    }
  },
  /**
   * Checks time verses last update
   * @param {*} lastUpdate
   */
  checkLastUpdate(lastUpdate){
    let diff,
      m = this.get('moment'),
      now = m.moment();

    diff = m.moment().diff(get(lastUpdate, 'date'), now);

    if(diff <= TIME_LAST_UPDATE) {
      set(this, 'alertsUpdates', 1);
    }
  },
  /**
   * Clears alertsUpdates
   */
  clearUpdateAlerts(timer = 0) {
    get(this, '_clearUpdatesTask').perform(timer);
  }
});
