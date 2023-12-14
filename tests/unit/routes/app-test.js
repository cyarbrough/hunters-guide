import { run } from '@ember/runloop';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | app', function (hooks) {
  setupTest(hooks);
  // needs: ['model:monster', 'service:ajax', 'service:google-analytics']

  it('exists', function () {
    let route = this.subject();

    expect(route).to.be.ok;
  });
  it('returns monsters from handleMonsterSuccess', function () {
    let data = {
        data: [
          {
            type: 'monsters',
            id: '1',
            attributes: {},
          },
          {
            type: 'monsters',
            id: '2',
            attributes: {},
          },
        ],
      },
      result,
      route = this.subject();

    run(() => {
      result = route.handleMonsterSuccess(data);
    });

    expect(result.monsters.get('length')).to.be.equal(2);
  });
  it('returns models from model', async function () {
    let result,
      route = this.subject({
        ajax: {
          request() {
            return {
              then(functionData) {
                return functionData();
              },
            };
          },
        },
        handleMonsterSuccess() {
          return 'models';
        },
      });

    result = await route.model();
    expect(result).to.be.equal('models');
  });
});
