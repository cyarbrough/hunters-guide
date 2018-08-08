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
  hasContent: computed.bool('searchTerm'),
  /**
   * @var {boolean}
   */
  hasAlert: computed.alias('alertCenter.hasAlerts'),
  /**
   * @var {boolean}
   */
  openSearch: false,
  /**
   * @var {boolean}
   */
  searchIsOpen: computed.or('hasContent', 'openSearch'),
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
  classNamesButton: computed('sidePanelIsOpen', 'hasAlert', function() {
    let classes = 'menu';

    if(this.get('sidePanelIsOpen')){
      classes += ' is-open';
    }
    if(this.get('hasAlert')){
      classes += ' has-alert';
    }
    return classes;
  }),

  actions: {
    inputFocused(value) {
      this.set('openSearch', value);
    }
  }
});
