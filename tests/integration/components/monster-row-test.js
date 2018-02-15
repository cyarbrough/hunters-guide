import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | monster-row', function() {
  setupComponentTest('monster-row', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#monster-row}}
    //     template content
    //   {{/monster-row}}
    // `);

    this.render(hbs`{{monster-row}}`);
    expect(this.$()).to.have.length(1);
  });
});
