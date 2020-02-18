import { Sitdown } from 'sitdown';
import { applyZhihuRule } from '../src';
import md from './spec/markdownPaper/paper1-zhihu.md';
import html from './spec/markdownPaper/paper1-zhihu.html';
import md2 from './spec/markdownPaper/paper2-zhihu.md';
import html2 from './spec/markdownPaper/paper2-zhihu.html';
import md3 from './spec/markdownPaper/paper3-zhihu.md';
import html3 from './spec/markdownPaper/paper3-zhihu.html';

/*
知乎 html 转 md 存在的不一致处：
1. 知乎进行了中文排版美化，如数字与中文、中文与英文间有空格
2. 图片转储了，并在 noscript 里有一份备份
3. 图片、链接描述（alt）没了
4. 知乎将公式转成图片了
5. 知乎把强调的链接的强调给滤掉了
 */
describe('知乎', () => {
  let sitdown = new Sitdown({
    keepFilter: ['style'],
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
    hr: '---',
  });
  sitdown.use(applyZhihuRule);
  it('paper1 works', () => {
    const expected = sitdown.HTMLToMD(html);
    expect(expected).toEqual(md);
  });

  it('paper2 works', () => {
    const expected = sitdown.HTMLToMD(html2);
    expect(expected).toEqual(md2);
  });

  it('paper3 works', () => {
    const expected = sitdown.HTMLToMD(html3);
    expect(expected).toEqual(md3);
  });
});
