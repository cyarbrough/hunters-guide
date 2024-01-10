import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class MonsterRowComponent extends Component {
  /**
   * @var {boolean}
   */
  @tracked inView = false;
  /**
   * @var {boolean}
   */
  @tracked showAlternate = false;
  /**
   * Sends logEvent action with Open/Close panel info
   */
  logToggle() {
    let action = 'Close ',
      isAlt = this.showAlternate,
      name = this.args.monster.name,
      slug = this.args.monster.slug;

    if (isAlt) {
      action = 'Open ';
    }
    action += name;
    this.args.logEvent('Monster', action, slug);
  }
  /**
   * Toggles `showAlternate` boolean
   */
  toggleAlternateLogo() {
    this.showAlternate = !this.showAlternate;
  }
  /**
   * Toggles Weakness Grid & Alt Image
   */
  toggleWeaknessGrid() {
    this.toggleAlternateLogo();
    this.logToggle();
  }
  /**
   * Sets inView to show logo image
   */
  @action
  onEnter() {
    if (!this.inView) {
      this.inView = true;
    }
  }
  @action
  toggleGrid() {
    this.toggleWeaknessGrid();
  }
  @action
  toggleLogo() {
    this.toggleAlternateLogo();
  }
}
