import { bool, alias, or } from '@ember/object/computed';
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  alertCenter: service(),
  /**
   * Overrides
   */
  classNames: ['header-nav'],
  classNameBindings: ['searchIsOpen', 'sidePanelIsOpen'],

  actionButton: null,
  actionSearch: null,
  /**
   * @var {boolean}
   */
  hasContent: bool('searchTerm'),
  /**
   * @var {boolean}
   */
  hasAlert: alias('alertCenter.alertsUpdates'),
  /**
   * @var {boolean}
   */
  openSearch: false,
  /**
   * @var {boolean}
   */
  searchIsOpen: or('hasContent', 'openSearch'),
  /**
   * @var {string}
   */
  searchTerm: null,
  /**
   * @var {boolean}
   */
  sidePanelIsOpen: false,
  /**
   * Classes for menu button
   * @var {string}
   */
  classNamesButton: computed('sidePanelIsOpen', 'hasAlert', function () {
    let classes = 'menu';

    if (this.sidePanelIsOpen) {
      classes += ' is-open';
    }
    if (this.hasAlert) {
      classes += ' has-alert';
    }
    return classes;
  }),

  actions: {
    inputFocused(value) {
      this.set('openSearch', value);
    },
  },
});
