import Component from '@ember/component';
import Ember from 'ember';
import InViewportMixin from 'ember-in-viewport';
const { computed } = Ember;

export default Component.extend(InViewportMixin, {
  /**
   * Overrides
   */
  classNames: ['monster-row'],
  classNameBindings: ['viewportEntered:is-active'],
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
  showStatusGrid: true,
  showWeaknessGrid: computed.not('showStatusGrid'),
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
   * Toggles `showStatusGrid` boolean
   */
  toggleStatusGrid() {
    this.toggleProperty('showStatusGrid');
  },
  actions: {
    toggleGrid() {
      this.toggleStatusGrid();
    }
  }
});
