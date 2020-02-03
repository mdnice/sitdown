import { Sitdown } from '../src';
import md from './spec/markdownPaper/paper1.md';
import html from './spec/markdownPaper/paper1-wechat.html';
import md4 from './spec/markdownPaper/paper4.md';
import html4 from './spec/markdownPaper/paper4-wechat.html';
import md5 from './spec/markdownPaper/paper5.md';
import html5 from './spec/markdownPaper/paper5-wechat.html';
// import TurndownService from '../src/lib/turndown';

/*
微信 html 转 md 存在的不一致处：
1. 图片转储，且访问有鉴权
2. 图片描述放在 figcaption 里
3. 强调是 span 标签，style 里带 `font-weight: bold;
4. 链接采用引用（浇筑）形式，放在 sup 标签里
5. 代码块转回来永远是一行
6. 微信有独创的居中块，html 是 span 带有 `display:block;text-align:center;` 样式
7. 公式用 svg 画出来的
8. 文章开头的作者信息和结束的信息，包裹在 section 里
 */
describe('微信', () => {
  let sitdown = new Sitdown({
    keepFilter: ['style'],
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
    hr: '---',
  });

  it('paper1 works', () => {
    const expected = sitdown.HTMLToMD(html);
    expect(expected).toEqual(md);
  });

  it('paper4 works', () => {
    const expected = sitdown.HTMLToMD(html4);
    expect(expected).toEqual(md4);
  });

  it('paper5 works', () => {
    const expected = sitdown.HTMLToMD(html5);
    expect(expected).toEqual(md5);
  });
});
