import { setProperties } from '@ember/object';
import { on } from '@ember/object/evented';
import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  inViewport: service(),
  /**
   * Overrides
   */
  classNames: ['monster-row'],
  classNameBindings: ['inView:is-active', 'showAlternate:is-open'],
  /**
   * @var {boolean}
   */
  inView: false,
  /**
   * @var {object}
   */
  monster: null,
  /**
   * @var {boolean}
   */
  showAlternate: false,
  /**
   * Overrides
   */
  didRender() {
    this.setupInViewport();
  },
  willDestroy() {
    const element = document.getElementById(this.elementId);
    this.inViewport.stopWatching(element);
    this._super(...arguments);
  },
  /**
   * Sets inView on inViewport.didEnterViewport
   */
  didEnterViewport() {
    if(!this.inView) {
      this.set('inView', true);
    }
  },
  /**
   * Sends logEvent action with Open/Close panel info
   */
  logToggle() {
    let action = 'Close ',
      isAlt = this.showAlternate,
      name = this.get('monster.name'),
      slug = this.get('monster.slug');

    if(isAlt) {
      action = 'Open ';
    }
    action += name;
    this.logEvent('Monster', action, slug);
  },
  /**
   * Toggles `showAlternate` boolean
   */
  toggleAlternateLogo() {
    this.toggleProperty('showAlternate');
  },
  /**
   * Toggles Weakness Grid & Alt Image
   */
  toggleWeaknessGrid() {
    this.toggleProperty('showAlternate');
    this.logToggle();
  },
  /**
   * Sets up InViewport to watch monster-row component
   */
  setupInViewport() {
    const element = document.getElementById(this.elementId);
    const viewportTolerance = { top: 250, bottom: 250 };
    const { onEnter } = this.inViewport.watchElement(element, { viewportTolerance });
    onEnter(this.didEnterViewport.bind(this));
  },

  actions: {
    toggleGrid() {
      this.toggleWeaknessGrid();
    },
    toggleLogo() {
      this.toggleAlternateLogo();
    }
  }
});
