import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';

const TIMER_TRANSITION_FAST = 300;

export default class AppController extends Controller {
  @service router;
  @service settings;
  // googleAnalytics: service(),
  /**
   * Overrides
   */
  queryParams = [
    {
      searchQuery: 's',
    },
  ];

  /**
   * Holds query term (generally not referenced, use searchTerm instead)
   * @var {string}
   */
  @tracked searchQuery = null;
  /**
   * Referenced search term
   * @var {string}
   */
  @tracked searchTerm = null;
  /**
   * Indicates if side-panel is visible
   * @var {boolean}
   */
  @tracked sidePanelIsOpen = false;
  /**
   * Array of strings, of valid routes for the side panel
   * @var {array}
   */
  sidePanelRoutes = ['app.updates', 'app.help'];

  /**
   * Filtered List
   * @var {array}
   */
  get monstersFiltered() {
    const monsters = this.model.monsters;
    let search = this.searchTerm;
    let searchRay;

    if (search) {
      search = search.toLowerCase().trim();
      searchRay = search.split(' ');

      return monsters.filter((monster) =>
        this.checkMonsterForSearchTerms(monster, searchRay),
      );
    }

    return monsters;
  }

  /**
   * Sorted List
   * @var {array}
   */
  get monsterList() {
    const filtered = this.monstersFiltered;
    const field = this.settings.sortAlpha ? 'id' : 'order';
    return filtered.slice().sort((a, b) => {
      return a[field] > b[field] ? 1 : -1;
    });
  }

  /**
   * Checks route and auto opens side panel
   */
  checkForSidePanel(routeName) {
    const currentRoute = routeName || this.router.currentRouteName;
    const { sidePanelRoutes } = this;

    if (sidePanelRoutes.includes(currentRoute)) {
      this.sidePanelIsOpen = true;
    }
  }
  /**
   * Task to open side panel after delay
   * @var {task; drops}
   * @param {number} timer
   */
  openSidePanelTask = task({ drop: true }, async (timer = 50) => {
    await timeout(timer);
    this.sidePanelIsOpen = true;
  });
  /**
   * Task to transition to /app after delay; drops
   * @var {task; drops}
   * @param {numer} timer
   */
  transitionToAppTask = task(
    { drop: true },
    async (timer = TIMER_TRANSITION_FAST + 50) => {
      await timeout(timer);
      this.router.transitionTo('app');
    },
  );
  /**
   * Sets searchQuery after debounce
   * @var {task, restarts}
   * @param {numer} timer
   */
  setSearchQueryTask = task({ restartable: true }, async (timer = 1500) => {
    let { searchTerm } = this;

    // clear out strings
    if (!searchTerm) {
      searchTerm = null;
    }

    if (searchTerm) {
      await timeout(timer);
    }

    // Set term
    this.searchQuery = searchTerm;
    this.logSearch(searchTerm);
  });

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
  }

  /**
   * Checks a monster object for search terms
   * @param {*} monster
   * @param {array} searchRay
   */
  checkMonsterForMatch(monster, searchTerm) {
    const nameMatch = monster.get('name').toLowerCase().indexOf(searchTerm);
    const speciesMatch = monster
      .get('species.name')
      .toLowerCase()
      .indexOf(searchTerm);

    return nameMatch >= 0 || speciesMatch >= 0;
  }
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
  }
  /**
   * Actions needed to open or close the side panel
   */
  _toggleSidePanel() {
    this.sidePanelIsOpen = !this.sidePanelIsOpen;
    // If side panels opens, go to lastSidePanelRoute
    if (this.sidePanelIsOpen) {
      const route =
        this.settings.lastSidePanelRoute || this.settings.defaultsidePanelRoute;

      this.send('logEvent', 'Side Panel', `Open Side Panel to ${route}`);
      this.router.transitionTo(route);
    } else {
      this.send('logEvent', 'Side Panel', 'Close Side Panel');
      this.transitionToAppTask.perform();
    }
  }
  /**
   * Logs event to GA, bubbles to route
   * @param {string} category
   * @param {string} action
   * @param {string} label
   */
  @action
  logEvent(/* category, action, label */) {
    return true;
  }
  /**
   * Toggles Side Panel
   */
  @action
  toggleSidePanel() {
    this._toggleSidePanel();
  }
  /**
   * @param {string} term
   */
  @action
  updateSearchTerm(term) {
    this.searchTerm = term;
    this.setSearchQueryTask.perform();
  }
}
