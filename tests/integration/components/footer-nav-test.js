import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | footer-nav', function() {
  setupComponentTest('footer-nav', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#footer-nav}}
    //     template content
    //   {{/footer-nav}}
    // `);

    this.render(hbs`{{footer-nav}}`);
    expect(this.$()).to.have.length(1);
  });
});
