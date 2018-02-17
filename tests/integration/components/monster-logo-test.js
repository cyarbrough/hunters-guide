import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | monster-logo', function() {
  setupComponentTest('monster-logo', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#monster-logo}}
    //     template content
    //   {{/monster-logo}}
    // `);

    this.render(hbs`{{monster-logo}}`);
    expect(this.$()).to.have.length(1);
  });
});
