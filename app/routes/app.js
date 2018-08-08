import Route from '@ember/routing/route';
import fetch from 'ember-fetch/ajax';
import config from 'hunters-guide/config/environment';
import HeadTagsMixin from 'hunters-guide/mixins/head-tags';
import { inject as service } from '@ember/service';

export default Route.extend(HeadTagsMixin, {
  alertCenter: service(),
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
   * Pushes data into the payload, returns
   * @param {*} itemData
   */
  handleUpdateItemsSuccess(itemData) {
    let data, store = this.get('store');

    store.pushPayload(itemData);

    data = store.peekAll('update-item');
    this.get('alertCenter').checkForUpdateAlerts(data);
  },
  /**
   * Main model data for App
   */
  model() {
    this.preloadUpdateItems();
    return fetch(config.webUrl + 'assets/data/large.monsters.json').then((monsterData) => { return this.handleMonsterSuccess(monsterData); });
  },
  /**
   * Fetch update items
   */
  preloadUpdateItems() {
    fetch(config.webUrl + 'assets/data/updates.json').then(
      (updateData) => { this.handleUpdateItemsSuccess(updateData); }
    ).catch(
      (/*error*/) => { /* crap */ }
    );
  },
  
  actions: {
    didTransition() {
      // Need to reset head tags on transition to /app,
      // not sure why title property isn't working
      this.setHeadTags();
    }
  }
});
