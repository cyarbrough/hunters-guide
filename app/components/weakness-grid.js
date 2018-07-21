import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
  /**
   * Overrides
   */
  attributeBindings: ['style'],
  classNames: ['weakness-grid'],
  classNameBindings: ['showGrid:is-visible'],
  style: Ember.computed('color', function() {
    return Ember.String.htmlSafe('display: none');
  })
});