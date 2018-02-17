import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | status-grid', function() {
  setupComponentTest('status-grid', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#status-grid}}
    //     template content
    //   {{/status-grid}}
    // `);

    this.render(hbs`{{status-grid}}`);
    expect(this.$()).to.have.length(1);
  });
});
