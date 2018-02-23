import Component from '@ember/component';
import Ember from 'ember';
import InViewportMixin from 'ember-in-viewport';

export default Component.extend(InViewportMixin, {
  /**
   * Overrides
   */
  classNames: ['monster-row'],
  classNameBindings: [ 'viewportEntered:is-active' ],
  
  inViewport: false,
  monster: null,

  viewportOptionsOverride: Ember.on('didInsertElement', function() {
    Ember.setProperties(this, {
      viewportEnabled: true,
      viewportUseRAF: true,
      viewportSpy: false,
      viewportUseIntersectionObserver: true,
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
  })
});
