import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | status-rating', function() {
  setupComponentTest('status-rating', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#status-rating}}
    //     template content
    //   {{/status-rating}}
    // `);

    this.render(hbs`{{status-rating}}`);
    expect(this.$()).to.have.length(1);
  });
});
