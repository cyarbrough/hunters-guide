import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | update item', function() {
  setupComponentTest('update-item', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#update-item}}
    //     template content
    //   {{/update-item}}
    // `);

    this.render(hbs`{{update-item}}`);
    expect(this.$()).to.have.length(1);
  });
});
