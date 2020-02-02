import { Sitdown } from '../src';
import md from './spec/markdownPaper/paper2.md';
import html from './spec/markdownPaper/paper2-csdn.html';
// import TurndownService from '../src/lib/turndown';

/*
csdn html 转 md 存在的不一致处：
1. csdn 开头有多余的注释
2. csdn 的标题带了很多空链接
 */
describe('csdn', () => {
  it('works', () => {
    let sitdown = new Sitdown({
      keepFilter: ['style'],
      codeBlockStyle: 'fenced',
      bulletListMarker: '-',
      hr: '---',
    });
    const expected = sitdown.HTMLToMD(html);
    expect(expected).toEqual(md);
    // const expected = markdownIt.render(sitdown.HTMLToMD(html));
    // expect(RootNode(markdownIt.render(md)).innerHTML).toEqual(
    //     RootNode(expected).innerHTML
    // );
  });
});
