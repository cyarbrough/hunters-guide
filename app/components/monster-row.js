import Component from '@ember/component';
import Ember from 'ember';
import InViewportMixin from 'ember-in-viewport';
const { $ } = Ember;

export default Component.extend(InViewportMixin, {
  /**
   * Overrides
   */
  classNames: ['monster-row'],
  classNameBindings: ['viewportEntered:is-active', 'showAlternate:is-open'],
  /**
   * @var {boolean}
   */
  inViewport: false,
  /**
   * @var {object}
   */
  monster: null,
  /**
   * @var {boolean}
   */
  showAlternate: false,
  /**
   * Viewport Options
   */
  viewportOptionsOverride: Ember.on('didInsertElement', function() {
    Ember.setProperties(this, {
      viewportEnabled: true,
      viewportUseRAF: true,
      viewportSpy: false,
      viewportScrollSensitivity: 1,
      viewportRefreshRate: 150,
      intersectionThreshold: 0,
      scrollableArea: null,
      viewportTolerance: {
        top: 250,
        bottom: 250,
        left: 20,
        right: 20
      }
    });
  }),
  /**
   * Sends logEvent action with Open/Close panel info
   */
  logToggle() {
    let action = 'Close Panel',
      isAlt = this.get('showAlternate'),
      slug = this.get('monster.slug');

    if(isAlt) {
      action = 'Open Panel';
    }
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
    this.toggleWeaknessSlide();
    this.logToggle();
  },
  /**
   * Activates slideToggle on weakness grid
   */
  toggleWeaknessSlide() {
    let elementId = this.get('elementId'),
      elementObj = $(`#${elementId} .weakness-grid`);

    elementObj.slideToggle(300);
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
