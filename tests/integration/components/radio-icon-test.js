import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | radio icon', function() {
  setupComponentTest('radio-icon', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#radio-icon}}
    //     template content
    //   {{/radio-icon}}
    // `);

    this.render(hbs`{{radio-icon}}`);
    expect(this.$()).to.have.length(1);
  });
});
