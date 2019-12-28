import { Sitdown } from '../src';
import Examples from './spec/gfm';
import TurndownService from 'turndown';

interface Example {
  index: number;
  md: string;
  html: string;
  option?: TurndownService.Options;
}

Examples.forEach(example => {
  // Info:替换制表符和结尾的两个换行符
  example.md = example.md.replace(/→/g, '\t').replace(/\n+$/, '');
  example.html = example.html.replace(/→/g, '\t').replace(/\n+$/, '');
});

describe('GFM', () => {
  (Examples as Example[]).slice(0, 7).forEach(example => {
    let sitdown = new Sitdown();
    it(`gfm example${example.index} works`, () => {
      if (example.option) {
        sitdown = new Sitdown(example.option);
      }
      const expected = sitdown.HTMLToMD(example.html);
      expect(expected).toEqual(example.md);
    });
  });
});
