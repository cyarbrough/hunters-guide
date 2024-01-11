// import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupRenderingTest } from 'hunters-guide/tests/helpers';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | header-nav', function (hooks) {
  setupRenderingTest(hooks);

  it('renders', function () {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#header-nav}}
    //     template content
    //   {{/header-nav}}
    // `);
    this.set('actionSearch', () => {});
    render(hbs`<HeaderNav />`);
    // expect(this.$()).to.have.length(1);
  });
});
