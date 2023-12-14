import { getOwner } from '@ember/application';
// import $ from 'jquery';
import Controller from '@ember/controller';
import { task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { computed, observer } from '@ember/object';
import { alias, sort } from '@ember/object/computed';

const TIMER_TRANSITION_FAST = 300;

export default Controller.extend({
  router: service(),
  settings: service(),
  // googleAnalytics: service(),
  /**
   * Overrides
   */
  queryParams: {
    searchQuery: 's'
  },

  /**
   * Holds the last route the side panel has accessed
   * @var {string}
   */
  defaultsidePanelRoute: 'app.updates',
  lastSidePanelRoute: 'app.updates',
  /**
   * Holds query term (generally not referenced, use searchTerm instead)
   * @var {string}
   */
  searchQuery: null,
  /**
   * Referenced search term
   * @var {string}
   */
  searchTerm: null,
  /**
   * Indicates if side-panel is visible
   * @var {boolean}
   */
  sidePanelIsOpen: false,
  /**
   * Array of strings, of valid routes for the side panel
   * @var {array}
   */
  sidePanelRoutes: ['app.updates', 'app.help'],
  /**
   * Indicates if sorting monsters by alpha
   * @var {boolean}
   */
  sortAlpha: alias('settings.sortAlpha'),
  
  /**
   * Filtered List
   * @var {array}
   */
  monstersFiltered: computed('model.monsters', 'searchTerm', function() {
    const monsters = this.get('model.monsters');
    let search = this.searchTerm;
    let searchRay;

    if (search) {
      search = search.toLowerCase().trim();
      searchRay = search.split(' ');

      return monsters.filter((monster) => this.checkMonsterForSearchTerms(monster, searchRay));
    }

    return monsters;
  }),

  /**
   * Sorted List
   * @var {array}
   */
  monsterList: sort('monstersFiltered', 'monsterSort'),
  monsterSort: computed('sortAlpha', function() {
    if (this.sortAlpha) {
      this.send('logEvent', 'Monster List', 'Sort by Alpha');
      return ['id:asc'];
    }
    this.send('logEvent', 'Monster List', 'Sort by Guide');
    return ['order:asc'];
  }),

  /**
   * Sets searchTerm when searchQuery loads, if searchTerm is not set
   */
  setSearchTerm: observer('searchQuery', function() {
    if (!this.searchTerm) {
      this.set('searchTerm', this.searchQuery);
    }
  }),
  /**
   * Calls setSearchQueryTask when searchTerm is changed
   */
  setSearchQuery: observer('searchTerm', function() {
    this.setSearchQueryTask.perform();
  }),

  /**
   * Checks route and auto opens side panel
   */
  checkForSidePanel() {
    const currentRoute = getOwner(this).lookup('router:main').get('currentRouteName');
    const { sidePanelRoutes } = this;

    if (sidePanelRoutes.includes(currentRoute)) {
      this.openSidePanelTask.perform();
    }
  },
  /**
   * Task to open side panel after delay
   * @var {task; drops}
   * @param {numer} timer
   */
  openSidePanelTask: task(function * (timer = 50) {
    yield timeout(timer);
    this.set('sidePanelIsOpen', true);
  }).drop(),
  /**
   * Task to transition to /app after delay; drops
   * @var {task; drops}
   * @param {numer} timer
   */
  transitionToAppTask: task(function * (timer = TIMER_TRANSITION_FAST + 50) {
    yield timeout(timer);
    this.router.transitionTo('app');
  }).drop(),
  /**
   * Sets searchQuery after debounce
   * @var {task, restarts}
   * @param {numer} timer
   */
  setSearchQueryTask: task(function * (timer = 1500) {
    let { searchTerm } = this;

    // clear out strings
    if (!searchTerm) {
      searchTerm = null;
    }

    if (searchTerm) {
      yield timeout(timer);
    }
    
    // Set term
    this.set('searchQuery', searchTerm);
    this.logSearch(searchTerm);
  }).restartable(),

  /**
   * Checks status of searchTerm, and send appropriate log event
   * @param {string} searchTerm
   */
  logSearch(searchTerm) {
    if (searchTerm) {
      this.send('logEvent', 'Search', searchTerm);
    } else {
      this.send('logEvent', 'Search Cleared', '');
    }
  },

  /**
   * Checks a monster object for search terms
   * @param {*} monster
   * @param {array} searchRay
   */
  checkMonsterForMatch(monster, searchTerm) {
    const nameMatch = monster.get('name').toLowerCase().indexOf(searchTerm);
    const speciesMatch = monster.get('species.name').toLowerCase().indexOf(searchTerm);

    return nameMatch >= 0 || speciesMatch >= 0;
  },
  /**
   * Checks a monster object for search terms in array
   * @param {*} monster
   * @param {array} searchRay
   */
  checkMonsterForSearchTerms(monster, searchRay) {
    let match = false;

    for (let i = 0; i <= searchRay.length; ++i) {
      const searchTerm = searchRay[i];
      
      match = this.checkMonsterForMatch(monster, searchTerm);

      if (match) {
        break;
      }
    }
    return match;
  },
  /**
   * Actions needed to open or close the side panel
   */
  toggleSidePanel() {
    this.toggleProperty('sidePanelIsOpen');
    // If side panels opens, go to lastSidePanelRoute
    if (this.sidePanelIsOpen) {
      const route = this.lastSidePanelRoute || this.defaultsidePanelRoute;

      this.send('logEvent', 'Side Panel', `Open Side Panel to ${route}`);
      this.router.transitionTo(route);
    } else {
      this.send('logEvent', 'Side Panel', 'Close Side Panel');
      this.transitionToAppTask.perform();
    }
  },

  actions: {
    /**
     * Logs event to GA
     * @param {string} category
     * @param {string} action
     * @param {string} label
     */
    logEvent(category, action, label) {
      // this.googleAnalytics.event(category, action, label);
    },
    /**
     * Toggles Side Panel
     */
    toggleSidePanel() {
      this.toggleSidePanel();
    },
    /**
     * Action fired after side panel is inserted
     */
    sidePanelInserted() {
      this.checkForSidePanel();
    },
    /**
     * @param {string} term
     */
    updateSearchTerm(term) {
      this.set('searchTerm', term);
    }
  }
});
