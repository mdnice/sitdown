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
  // Info:替换制表符
  example.md = example.md.replace(/→/g, '\t');
  example.html = example.html.replace(/→/g, '\t');
});

describe('GFM', () => {
  (Examples as Example[]).slice(0, 5).forEach(example => {
    let sitdown = new Sitdown();
    it(`gfm example${example.index} works`, () => {
      if (example.option) {
        sitdown = new Sitdown(example.option);
      }
      const expected = sitdown.HTMLToMD(example.html) + '\n\n';
      expect(expected).toEqual(example.md);
    });
  });
});
