// test
import { Sitdown } from '../src';
import Examples from './spec/gfm';
import TurndownService from 'turndown';
import MarkdownIt from 'markdown-it';
import { RootNode } from './root';
const taskList = require('./spec/md-it-plugin-taskList');
const md = new MarkdownIt({
  html: true,
}).use(taskList);

interface Example {
  index: number;
  md: string;
  html: string;
  option?: TurndownService.Options;
  enhance?: (service: TurndownService) => void;
}

Examples.forEach(example => {
  // Info:替换制表符和结尾的两个换行符
  example.md = example.md.replace(/→/g, '\t').replace(/\n+$/, '');
  example.html = example.html.replace(/→/g, '\t').replace(/\n+$/, '');
});

describe('GFM', () => {
  (Examples as Example[])
    .filter(example => example.index <= 300)
    // .filter(example => example.index == 300)
    .forEach(example => {
      let sitdown = new Sitdown();
      it(`gfm example${example.index} html to markdown works`, () => {
        if (example.option) {
          sitdown = new Sitdown(example.option);
        }
        if (example.enhance) {
          example.enhance(sitdown.service);
        }
        const expected = sitdown.HTMLToMD(example.html);
        // console.log('expected\n\n',expected);
        // console.log('example.md\n\n',example.md);
        expect(expected).toEqual(example.md);
      });

      it(`gfm example${example.index} markdown to html works`, () => {
        const html = md.render(example.md);
        expect(RootNode(html).innerHTML).toEqual(
          RootNode(example.html).innerHTML
        );
      });
    });
});
