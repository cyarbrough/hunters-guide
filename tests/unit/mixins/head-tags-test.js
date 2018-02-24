import { expect } from 'chai';
import { describe, it } from 'mocha';
import EmberObject from '@ember/object';
import HeadTagsMixin from 'hunters-guide/mixins/head-tags';

describe('Unit | Mixin | head tags', function() {
  // Replace this with your real tests.
  it('works', function() {
    let HeadTagsObject = EmberObject.extend(HeadTagsMixin);
    let subject = HeadTagsObject.create();

    expect(subject).to.be.ok;
  });
});
