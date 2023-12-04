import { htmlSafe } from '@ember/template';
import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  /**
   * Overrides
   */
  attributeBindings: ['style'],
  classNames: ['weakness-grid'],
});