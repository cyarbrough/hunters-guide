import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed, get } from '@ember/object';
import { not, oneWay } from '@ember/object/computed';
import Ember from 'ember';

const { $ } = Ember;

export default Controller.extend({
  settings: service(),
  /**
   * Group value to match for radio buttons
   * @var {string}
   */
  groupValue: computed('sortAlpha', function() {
    if (get(this, 'sortAlpha')) {
      return 'alpha';
    }
    return 'guide';
  }),
  /**
   * Indicates if user is remembered; alias
   * @var {boolean}
   */
  rememberUser: oneWay('settings.rememberUser'),
  /**
   * Indicates if monsters are sorted by alpha; alias
   * @var {boolean}
   */
  sortAlpha: oneWay('settings.sortAlpha'),
  sortGuide: not('sortAlpha'),
  /**
   * Collection of update items
   * @var {array}
   */
  updateItems: computed('model.updates.[]', function() {
    return this.get('model.updates');
  }),

  actions: {
    /**
     * Calls settings.forgetUserSettings
     */
    forgetUser() {
      this.settings.forgetUserSettings();
    },
    /**
     * Calls settings.rememberUserSettings
     */
    rememberUser() {
      this.settings.rememberUserSettings();
    },
    /**
     * Calls settings.toggleSort, and scrolls to top
     */
    toggleSort() {
      get(this, 'settings').toggleSort();
      $('html, body').animate({ scrollTop: '0px' });
    }
  }
});
