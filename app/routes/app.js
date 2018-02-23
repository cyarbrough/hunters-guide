import Route from '@ember/routing/route';
import Ember from 'ember';
const { inject } = Ember;

export default Route.extend({
  /**
   * Services
   */
  ajax: inject.service(),
  afterModel() {
    let description = 'Mobile Hunter\'s Guide for Monster Hunter: World',
      siteName = 'Hunter\'s Guide',
      title = 'Hunter\'s Guide',
      url = 'http://hunters-guide.herokuapp.com/',
      urlImg = url + 'assets/images/icons/palico.png';

    this.get('meta').update({
      title,
      description,
      'og:title': title,
      'og:site_name': siteName,
      'og:url': url,
      'og:image': urlImg,
      'og:description': description,
      'twitter:card': 'summary',
      'twitter:site': url,
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': urlImg
    });
  },
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
