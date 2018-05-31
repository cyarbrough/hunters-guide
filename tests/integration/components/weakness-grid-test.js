import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | weakness grid', function() {
  setupComponentTest('weakness-grid', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#weakness-grid}}
    //     template content
    //   {{/weakness-grid}}
    // `);

    this.render(hbs`{{weakness-grid}}`);
    expect(this.$()).to.have.length(1);
  });
});
