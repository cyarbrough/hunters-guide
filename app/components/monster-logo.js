import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class MonsterLogoComponent extends Component {
  /**
   * Handles the click action
   */
  @action
  click() {
    if (typeof this.args.toggle === 'function') {
      this.args.toggle();
    }
  }
}
