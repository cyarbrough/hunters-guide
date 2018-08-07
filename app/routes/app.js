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
   * Pushes data into the payload, returns
   * @param {*} itemData
   */
  handleUpdateItemsSuccess(itemData) {
    this.get('store').pushPayload(itemData);
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
      (error) => { console.log(error); }
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
