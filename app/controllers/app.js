import Controller from '@ember/controller';
import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';
const { computed, observer } = Ember;

export default Controller.extend({
  /**
   * Overrides
   */
  queryParams: {
    searchQuery: 's'
  },
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
   * Filtered List
   * @var {array}
   */
  monstersFiltered: computed('model.monsters', 'searchTerm', function() {
    let monsters = this.get('model.monsters'),
      search = this.get('searchTerm');

    if(search) {
      search = search.toLowerCase();

      return monsters.filter((monster) => {
        let nameMatch = monster.get('name').toLowerCase().indexOf(search),
          speciesMatch = monster.get('species.name').toLowerCase().indexOf(search);
  
        return nameMatch >= 0 || speciesMatch >= 0;
      });
    }

    return monsters;
  }),
  /**
   * Sorted List
   * @var {array}
   */
  monsterList: computed.sort('monstersFiltered', 'monsterSort'),
  monsterSort: ['id:asc'],

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
   * Sets searchQuery after debounce
   */
  setSearchQueryTask: task(function * () {
    // Re-position window
    yield timeout(1);
    this.scrollToTop();

    let searchTerm = this.get('searchTerm');

    // clear out strings
    if(!searchTerm){
      searchTerm = null;
    }

    if(searchTerm) {
      yield timeout(1500);
    }
    
    // Set term
    this.set('searchQuery', searchTerm);
  }).restartable(),

  scrollToTop() {
    window.scrollTo(0, 0);
  },

  actions: {
    /**
     * @param {string} term
     */
    updateSearchTerm(term) {
      this.set('searchTerm', term);
    }
  }
});
