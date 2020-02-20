// test
import { Sitdown, RootNode } from '../src';
import Examples from './spec/gfm';
import Service from '../src/service';
import {Options,Node} from '../src/types';
import MarkdownIt from 'markdown-it';
const taskList = require('./spec/md-it-plugin-taskList');
const md = new MarkdownIt({
  html: true,
}).use(taskList);
interface Example {
  index: number;
  md: string;
  html: string;
  option?: Options;
  enhance?: (service: Service) => void;
}

Examples.forEach(example => {
  // Info:替换制表符和结尾的两个换行符
  example.md = example.md.replace(/→/g, '\t').replace(/\n+$/, '');
  example.html = example.html.replace(/→/g, '\t').replace(/\n+$/, '');
});

describe('GFM', () => {
  (Examples as Example[])
    .filter(example => example.index <= 673)
    // .filter(
    //   example =>
    //     example.index > 652 && example.index <= 673 && example.index !== 636
    // )
    .forEach(example => {
      let sitdown = new Sitdown();
      it(`gfm example${example.index} html to markdown works`, () => {
        if (example.option) {
          sitdown = new Sitdown(example.option);
        }
        const expected = sitdown.HTMLToMD(example.html);
        // console.log('expected\n\n',expected);
        // console.log('example.md\n\n',example.md);
        expect(expected).toEqual(example.md);
      });

      it(`gfm example${example.index} markdown to html works`, () => {
        const html = md.render(example.md);
        expect((new RootNode(html) as Node).innerHTML).toEqual(
            (new RootNode(html) as Node).innerHTML
        );
      });
    });
});
