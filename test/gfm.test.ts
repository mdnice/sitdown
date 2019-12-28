import { Sitdown } from '../src';
import Examples from './spec/gfm.json';

interface Example {
  index: number;
  md: string;
  html: string;
}
describe('GFM', () => {
  Examples.slice(0,3).forEach((example: Example) => {
    let sitdown = new Sitdown();
    it(`gfm example${example.index} works`, () => {
      const expected = sitdown.HTMLToMD(example.html) + '\n\n';
      expect(expected).toEqual(example.md);
    });
  });
});
