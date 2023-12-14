import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Controller | app', function (hooks) {
  setupTest(hooks);
  // needs: ['service:google-analytics']

  // Replace this with your real tests.
  it('exists', function () {
    let controller = this.subject();

    expect(controller).to.be.ok;
  });
});
