import Route from '@ember/routing/route';
import fetch from 'fetch';
import config from 'hunters-guide/config/environment';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class AppRoute extends Route {
  @service alertCenter;
  @service metaTags;
  @service settings;
  @service store;
  /**
   * Lifecycle function
   */
  beforeModel() {
    this.settings.getSettings();
  }
  afterModel() {
    this.metaTags.setTitle();
  }
  setupController(controller) {
    super.setupController(...arguments);

    if (controller.searchQuery) {
      controller.searchTerm = controller.searchQuery;
    }
  }
  /**
   * Pushes data into the payload, returns
   * @param {*} monsterData
   * @return {*} model data
   */
  handleMonsterSuccess(monsterData) {
    const { store } = this;

    store.pushPayload(monsterData);

    return {
      monsters: store.peekAll('monster'),
    };
  }
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
  }
  /**
   * Main model data for App
   */
  async model() {
    this.preloadUpdateItems();
    const response = await fetch(
      `${config.webUrl}assets/data/large.monsters.json`,
    );
    let monsterData;

    if (response.ok) {
      monsterData = await response.json();
      return this.handleMonsterSuccess(monsterData);
    }

    return {
      monsters: [],
    };
  }
  /**
   * Fetch update items
   */
  async preloadUpdateItems() {
    const response = await fetch(`${config.webUrl}assets/data/updates.json`);
    let updateData;

    if (response.ok) {
      updateData = await response.json();
      return this.handleUpdateItemsSuccess(updateData);
    }
  }

  @action
  didTransition() {
    this.metaTags.setTitle();
  }
  /**
   * Logs event to GA
   * @param {string} category
   * @param {string} action
   * @param {string} label
   */
  @action
  logEvent(/* category, action, label */) {
    // this.googleAnalytics.event(category, action, label);
  }
  /**
   * Updates last visited route
   * @param {string} route
   */
  @action
  updateLastSidePanelRoute(route) {
    this.settings.set('lastSidePanelRoute', route);
  }
}
