import { expect } from 'chai';
import { spy } from 'sinon';

import { sum, callMyFunction } from './index';

describe('sum function',() => {
  it('sum up 2 intergers', () => {
    expect(sum(1,2)).to.eql(3);
  });
});

describe('callMyFunction function',() => {
  it('calls the passed function', () => {
    const callback = spy();

    callMyFunction(callback);
    expect(callback.called).to.eql(true);
  });
});