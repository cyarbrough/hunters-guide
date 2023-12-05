import Route from '@ember/routing/route';
import fetch from 'fetch';
import config from 'hunters-guide/config/environment';
// import HeadTagsMixin from 'hunters-guide/mixins/head-tags';
import { inject as service } from '@ember/service';

export default Route.extend({
  alertCenter: service(),
  settings: service(),
  store: service(),
  /**
   * Lifecycle function
   */
  beforeModel() {
    this.settings.getSettings();
  },
  /**
   * Pushes data into the payload, returns
   * @param {*} monsterData
   * @return {*} model data
   */
  handleMonsterSuccess(monsterData) {
    const { store } = this;

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
    let data; 
    const { store } = this;

    store.pushPayload(itemData);

    data = store.peekAll('update-item');
    this.alertCenter.checkForUpdateAlerts(data);
  },
  /**
   * Main model data for App
   */
  async model() {
    this.preloadUpdateItems();
    const response = await fetch(`${config.webUrl}assets/data/large.monsters.json`);
    let monsterData;

    if(response.ok) {
      monsterData = await response.json();
      return this.handleMonsterSuccess(monsterData);
    }

    return {
      monsters: []
    }
  },
  /**
   * Fetch update items
   */
  async preloadUpdateItems() {
    const response = await fetch(`${config.webUrl}assets/data/updates.json`);
    let updateData;

    if(response.ok) {
      updateData = await response.json();
      return this.handleUpdateItemsSuccess(updateData);
    }
  },
  
  actions: {
    didTransition() {
      // Need to reset head tags on transition to /app,
      // not sure why title property isn't working
      // this.setHeadTags();
    },
    /**
     * Updates last visited route
     */
    updateLastSidePanelRoute(route) {
      this.controller.set('lastSidePanelRoute', route);
    }
  }
});
