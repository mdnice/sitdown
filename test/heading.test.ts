import { sitdown } from '../src';
import ATXHeadingMD from './spec/atx-heading.md';
import ATXHeadingHTML from './spec/atx-heading.html';

describe('heading', () => {
  it('works', () => {
    const expected = sitdown(ATXHeadingHTML);
    expect(expected).toEqual(ATXHeadingMD);
  });
});
