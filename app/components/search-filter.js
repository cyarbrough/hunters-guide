import { bool } from '@ember/object/computed';
import { computed } from '@ember/object';
import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';

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
  sidePanelIsOpen: false,
  /**
   * @var {boolean}
   */
  isFocused: false,
  /**
   * @var {boolean}
   */
  hasContent: bool('searchTerm'),
  /**
   * @var {function}
   */
  actionFocused: null,
  /**
   * @var {function}
   */
  actionSearch: null,

  /**
   * @var {string}
   */
  closeBtnClassName: computed('searchTerm', function () {
    let classNames = 'close';

    if (this.searchTerm) {
      classNames += ' is-shown';
    }
    return classNames;
  }),
  /**
   * Set focus state then debounce
   */
  setFocusInTask: task(function* () {
    this.setFocusOutTask.cancelAll();
    this.set('isFocused', true);
    if (typeof this.actionFocused === 'function') {
      this.actionFocused(true);
    }
    yield timeout(1);
  }).drop(),
  /**
   * Sets focus state after debounce
   */
  setFocusOutTask: task(function* () {
    yield timeout(500);
    this.set('isFocused', false);
    if (!this.hasContent && typeof this.actionFocused === 'function') {
      this.actionFocused(false);
    }
  }).restartable(),

  /**
   * Scrolls window to top of content
   */
  scrollToTop() {
    window.scrollTo(0, 0);
  },

  actions: {
    clearSearch() {
      if (typeof this.actionSearch === 'function') {
        this.actionSearch(null);
        this.setFocusOutTask.perform();
      }
    },
    onFocusIn() {
      if (!this.sidePanelIsOpen) {
        this.setFocusInTask.perform();
      }
    },
    onFocusOut() {
      this.setFocusOutTask.perform();
    },
    onKeyUp() {
      if (typeof this.actionSearch === 'function') {
        this.actionSearch(this.searchTerm);
      }
      this.scrollToTop();
    },
  },
});
