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
    }

    return monsters.filter((monster) => {
      let name = monster.get('name').toLowerCase(),
        species = monster.get('species.name').toLowerCase();

      return name.indexOf(search) >= 0 || species.indexOf(search) >= 0;
    });

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
    yield timeout(1000);
    if(this.get('searchTerm')) {
      this.set('searchQuery', this.get('searchTerm'));
    }
  }).restartable(),

  actions: {
    /**
     * @param {string} term
     */
    updateSearchTerm(term) {
      this.set('searchTerm', term);
    }
  }
});
