import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import Ember from 'ember';
const { $, computed } = Ember;

export default Component.extend({
  /**
   * Overrides
   */
  classNames: ['search-filter'],
  classNameBindings: ['isFocused', 'hasContent'],
  actionFocused: 'inputFocused',
  /**
   * @var {string}
   */
  searchTerm: null,

  /**
   * @var {boolean}
   */
  isFocused: false,
  /**
   * @var {boolean}
   */
  hasContent: computed.bool('searchTerm'),
  
  /**
   * @var {string}
   */
  closeBtnClassName: computed('searchTerm', function() {
    let classNames = 'close';

    if(this.get('searchTerm')) {
      classNames += ' is-shown';
    }
    return classNames;
  }),
  /**
   *
   */
  setFocusInTask: task(function * () {
    this.get('setFocusOutTask').cancelAll();
    this.set('isFocused', true);
    this.sendAction('actionFocused', true);
    yield timeout(1);
  }).drop(),
  /**
   * Sets focus state after debounce
   */
  setFocusOutTask: task(function * () {
    yield timeout(500);
    this.set('isFocused', false);
    if(!this.get('hasContent')) {
      this.sendAction('actionFocused', false);
    }
  }).restartable(),

  actions: {
    clearSearch() {
      if($.isFunction(this.actionSearch)) {
        this.actionSearch(null);
        this.get('setFocusOutTask').perform();
      }
    },
    onFocusIn() {
      this.get('setFocusInTask').perform();
    },
    onFocusOut() {
      this.get('setFocusOutTask').perform();
    },
    onKeyUp() {
      if($.isFunction(this.actionSearch)) {
        this.actionSearch(this.get('searchTerm'));
      }
    }
  }
});
