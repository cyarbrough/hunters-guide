import Component from '@glimmer/component';
import { action } from '@ember/object';
import { task, timeout } from 'ember-concurrency';
import { isPresent } from '@ember/utils';
import { tracked } from '@glimmer/tracking';

export default class SearchFilterComponent extends Component {
  /**
   * @var {boolean}
   */
  @tracked isFocused = false;
  /**
   * @var {boolean}
   */
  get hasContent() {
    return isPresent(this.args.searchTerm);
  }
  /**
   * Set focus state then debounce
   */
  setFocusInTask = task({ drop: true }, async () => {
    this.setFocusOutTask.cancelAll();
    this.isFocused = true;
    if (typeof this.args.actionFocused === 'function') {
      this.args.actionFocused(true);
    }
    await timeout(1);
  });
  /**
   * Sets focus state after debounce
   */
  setFocusOutTask = task({ restartable: true }, async () => {
    await timeout(500);
    this.isFocused = false;
    if (!this.hasContent && typeof this.args.actionFocused === 'function') {
      this.args.actionFocused(false);
    }
  });

  /**
   * Scrolls window to top of content
   */
  scrollToTop() {
    window.scrollTo(0, 0);
  }

  @action
  clearSearch() {
    if (typeof this.args.actionSearch === 'function') {
      this.args.actionSearch(null);
      this.setFocusOutTask.perform();
    }
  }
  @action
  onFocusIn() {
    if (!this.args.sidePanelIsOpen) {
      this.setFocusInTask.perform();
    }
  }
  @action
  onFocusOut() {
    this.setFocusOutTask.perform();
  }
  @action
  onKeyUp() {
    if (typeof this.args.actionSearch === 'function') {
      this.args.actionSearch(this.args.searchTerm);
    }
    this.scrollToTop();
  }
}
