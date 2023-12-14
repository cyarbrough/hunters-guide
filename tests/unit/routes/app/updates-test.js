import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | app/updates', function (hooks) {
  setupTest(hooks);

  it('exists', function () {
    let route = this.subject();

    expect(route).to.be.ok;
  });
});
