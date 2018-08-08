import Service from '@ember/service';
import { get, set } from '@ember/object';
import { or } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';

const TIME_LAST_UPDATE = 7 * 24 * 60 * 60 * 1000; // 7 days in ms

export default Service.extend({
  moment: service(),
  /**
   * @var {boolean}
   */
  hasAlerts: or('alertsUpdates'),
  /**
   * Alerts specific to updates
   * @var {number}
   */
  alertsUpdates: 0,

  /**
   * Private task, clears alertsUpdates
   */
  _clearUpdatesTask: task(function * (timer = 0){
    yield timeout(timer);
    set(this, 'alertsUpdates', 0);
  }).drop(),
  
  /**
   * Checks given updates against TIME_LAST_UPDATE
   * @param {*} updates
   */
  checkForUpdateAlerts(updates) {
    let lastUpdate = updates.get('firstObject'),
      m = this.get('moment'),
      now = m.moment();

    let diff = m.moment().diff(lastUpdate.get('date'), now);

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
