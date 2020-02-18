import { Sitdown,RootNode } from 'sitdown';
import { applyWechatRule, extraFootLinks } from '../src';
// import html from './spec/temp.html';
import md from './spec/markdownPaper/paper1-wechat.md';
import html from './spec/markdownPaper/paper1-wechat.html';
import md4 from './spec/markdownPaper/paper4-wechat.md';
import html4 from './spec/markdownPaper/paper4-wechat.html';
// import md5 from './spec/markdownPaper/paper5.md';
// import html5 from './spec/markdownPaper/paper5-wechat.html';

/*
微信 html 转 md 存在的不一致处：
1. 图片转储，且访问有鉴权
2. 图片描述放在 figcaption 里
3. 微信不支持外链，所以用脚注的方式兼容。
4. 代码块转回来永远是一行。
5. 微信有独创的居中块，html 是 span 带有 `display:block;text-align:center;` 样式
6. 公式用 svg 画出来的
7. 文章开头的作者信息和结束的信息，包裹在 section 里
 */
describe('微信', () => {
  let sitdown = new Sitdown({
    keepFilter: ['style'],
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
    hr: '---',
  });
  sitdown.use(applyWechatRule);
  const wechatToMD = (html: string) => {
    const root = new RootNode(html);
    const footLinks = extraFootLinks(root);
    return sitdown.HTMLToMD(html, { footLinks });
  };

  it('paper1 works', () => {
    const expected = wechatToMD(html);
    expect(expected).toEqual(md);
  });

  it('paper4 works', () => {
    const expected = wechatToMD(html4);
    expect(expected).toEqual(md4);
  });

  // it('paper5 works', () => {
  //   const expected = wechatToMD(html5);
  //   require('fs').writeFileSync(
  //     'test/spec/markdownPaper/paper5-wechat.md',
  //     expected,
  //     'utf-8'
  //   );
  //   expect(expected).toEqual(md5);
  // });
});
