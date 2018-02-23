import Route from '@ember/routing/route';
import fetch from 'ember-fetch/ajax';
import config from 'hunters-guide/config/environment';
import HeadTagsMixin from 'hunters-guide/mixins/head-tags';

export default Route.extend(HeadTagsMixin, {
  

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
    return fetch(config.webUrl + 'assets/data/large.monsters.json').then((monsterData) => { return this.handleMonsterSuccess(monsterData); });
  }
});
