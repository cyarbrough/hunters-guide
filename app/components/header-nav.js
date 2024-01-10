import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { isPresent } from '@ember/utils';
import { tracked } from '@glimmer/tracking';

export default class HeaderNavComponent extends Component {
  @service alertCenter;

  /**
   * @var {boolean}
   */
  get hasContent() {
    return isPresent(this.searchTerm);
  }
  /**
   * @var {boolean}
   */
  get hasAlert() {
    return this.alertCenter.alertsUpdates;
  }
  /**
   * @var {boolean}
   */
  @tracked openSearch = false;
  /**
   * @var {boolean}
   */
  get searchIsOpen() {
    return this.hasContent || this.openSearch;
  }
  /**
   * @var {string}
   */
  @tracked searchTerm = null;

  @action
  inputFocused(value) {
    this.openSearch = value;
  }
}
