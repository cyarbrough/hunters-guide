// import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupRenderingTest } from 'hunters-guide/tests/helpers';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | side panel', function (hooks) {
  setupRenderingTest(hooks);

  it('renders', function () {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#side-panel}}
    //     template content
    //   {{/side-panel}}
    // `);

    render(hbs`<SidePanel />`);
    // expect(this.$()).to.have.length(1);
  });
});
