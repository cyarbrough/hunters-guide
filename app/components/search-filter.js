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
    yield timeout(1);
  }).drop(),
  /**
   * Sets focus state after debounce
   */
  setFocusOutTask: task(function * () {
    yield timeout(500);
    this.set('isFocused', false);
  }).restartable(),

  actions: {
    activateSearch() {
      $(':focus').blur();
    },
    clearSearch() {
      if($.isFunction(this.actionSearch)) {
        this.actionSearch(null);
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
