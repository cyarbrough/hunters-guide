import Controller from '@ember/controller';
import { task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { computed, observer } from '@ember/object';
import { alias } from '@ember/object/computed';
import Ember from 'ember';

const { $ } = Ember;
const TIMER_TRANSITION_FAST = 300;

export default Controller.extend({
  settings: service(),
  googleAnalytics: service(),
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
    let monsters = this.get('model.monsters'),
      search = this.get('searchTerm'),
      searchRay;

    if(search) {
      search = search.toLowerCase().trim();
      searchRay = search.split(' ');

      return monsters.filter((monster) => {
        return this.checkMonsterForSearchTerms(monster, searchRay);
      });
    }

    return monsters;
  }),

  /**
   * Sorted List
   * @var {array}
   */
  monsterList: computed.sort('monstersFiltered', 'monsterSort'),
  monsterSort: computed('sortAlpha', function() {
    if(this.get('sortAlpha')) {
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
    if(!this.get('searchTerm')) {
      this.set('searchTerm', this.get('searchQuery'));
    }
  }),
  /**
   * Calls setSearchQueryTask when searchTerm is changed
   */
  setSearchQuery: observer('searchTerm', function() {
    this.get('setSearchQueryTask').perform();
  }),
  /**
   * Toggles no-scroll css when side panel opens or closes
   */
  toggleNoScroll: observer('sidePanelIsOpen', function() {
    if(this.get('sidePanelIsOpen')) {
      $('body').addClass('no-scroll');
    } else {
      $('body').removeClass('no-scroll');
    }
  }),

  /**
   * Checks route and auto opens side panel
   */
  checkForSidePanel() {
    let currentRoute = Ember.getOwner(this).lookup('router:main').get('currentRouteName'),
      sidePanelRoutes = this.get('sidePanelRoutes');

    if(sidePanelRoutes.includes(currentRoute)) {
      this.get('openSidePanelTask').perform();
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
    this.transitionToRoute('app');
  }).drop(),
  /**
   * Sets searchQuery after debounce
   * @var {task, restarts}
   * @param {numer} timer
   */
  setSearchQueryTask: task(function * (timer = 1500) {
    let searchTerm = this.get('searchTerm');

    // clear out strings
    if(!searchTerm){
      searchTerm = null;
    }

    if(searchTerm) {
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
    if(searchTerm) {
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
    let nameMatch = monster.get('name').toLowerCase().indexOf(searchTerm),
      speciesMatch = monster.get('species.name').toLowerCase().indexOf(searchTerm);

    return nameMatch >= 0 || speciesMatch >= 0;
  },
  /**
   * Checks a monster object for search terms in array
   * @param {*} monster
   * @param {array} searchRay
   */
  checkMonsterForSearchTerms(monster, searchRay) {
    let match = false;

    for(let i = 0; i <= searchRay.length; ++i) {
      let searchTerm = searchRay[i];
      
      match = this.checkMonsterForMatch(monster, searchTerm);

      if(match) {
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
    if(this.get('sidePanelIsOpen')) {
      let route = this.get('lastSidePanelRoute') || this.get('defaultsidePanelRoute');

      this.send('logEvent', 'Side Panel', 'Open Side Panel to ' + route);
      this.transitionToRoute(route);
    } else {
      this.send('logEvent', 'Side Panel', 'Close Side Panel');
      this.get('transitionToAppTask').perform();
    }
    this.toggleNoScroll();
  },

  actions: {
    /**
     * Logs event to GA
     * @param {string} category
     * @param {string} action
     * @param {string} label
     */
    logEvent(category, action, label) {
      this.get('googleAnalytics').event(category, action, label);
    },
    /**
     * Toggles Side Panel
     */
    toggleSidePanel(){
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
