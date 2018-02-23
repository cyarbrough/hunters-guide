import Route from '@ember/routing/route';
import Ember from 'ember';
const { inject } = Ember;

export default Route.extend({
  /**
   * Services
   */
  ajax: inject.service(),
  /**
   * Pushes data into the payload, returns
   * @param {*} monsterData
   * @return {*} model data
   */
  handleMonsterSuccess(monsterData) {
    let store = this.get('store');

    store.pushPayload(monsterData);

    return {
      monsters: store.peekAll('monster')
    };
  },
  /**
   * Main model data for App
   */
  model() {
    return this.get('ajax').request('/assets/data/large.monsters.json').then((monsterData) => { return this.handleMonsterSuccess(monsterData); });
  }
});
