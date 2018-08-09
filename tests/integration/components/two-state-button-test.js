import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | two state button', function() {
  setupComponentTest('two-state-button', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#two-state-button}}
    //     template content
    //   {{/two-state-button}}
    // `);

    this.render(hbs`{{two-state-button}}`);
    expect(this.$()).to.have.length(1);
  });
});
