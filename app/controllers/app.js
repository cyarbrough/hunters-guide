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

  actions: {
    /**
     * @param {string} term
     */
    updateSearchTerm(term) {
      this.set('searchTerm', term);
    }
  }
});
