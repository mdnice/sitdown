import { Sitdown } from '../src';
import md from './spec/markdownPaper/table-no-header.md';
import html from './spec/markdownPaper/table-no-header.html';

describe('table no header', () => {
  it('works', () => {
    let sitdown = new Sitdown({
      convertNoHeaderTable:true
    });
    const expected = sitdown.HTMLToMD(html);
    expect(expected).toEqual(md);
  });
});
