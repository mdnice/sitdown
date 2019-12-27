import { sitdown } from '../src';

describe('heading', () => {
  it('works', () => {
    expect(sitdown('<h1>foo</h1>')).toEqual('# foo');
  });
});
