import { Sitdown } from 'sitdown';
import { applyJuejinRule } from '../src';
import md from './spec/markdownPaper/paper1-juejin.md';
import html from './spec/markdownPaper/paper1-juejin.html';

/*
掘金 html 转 md 存在的不一致处：
1. 掘金进行了中文排版美化，如数字与中文、中文与英文间有空格
2. 掘金对图片进行了转储，地址存储在 img 标签的 data-src 下
3. 掘金对代码块做了处理，多了一个复制代码
 */
describe('juejin', () => {
  it('works', () => {
    let sitdown = new Sitdown({
      keepFilter: ['style'],
      codeBlockStyle: 'fenced',
      bulletListMarker: '-',
      hr: '---',
    });
    sitdown.use(applyJuejinRule);
    const expected = sitdown.HTMLToMD(html);
    expect(expected).toEqual(md);
  });
});
