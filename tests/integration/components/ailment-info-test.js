import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | ailment-info', function() {
  setupComponentTest('ailment-info', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#ailment-info}}
    //     template content
    //   {{/ailment-info}}
    // `);

    this.render(hbs`{{ailment-info}}`);
    expect(this.$()).to.have.length(1);
  });
});
