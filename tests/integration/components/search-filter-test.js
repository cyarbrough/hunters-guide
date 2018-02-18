import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | search-filter', function() {
  setupComponentTest('search-filter', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#search-filter}}
    //     template content
    //   {{/search-filter}}
    // `);

    this.render(hbs`{{search-filter}}`);
    expect(this.$()).to.have.length(1);
  });
});
