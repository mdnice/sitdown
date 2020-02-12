# `@sitdown/wechat`

微信 html 转 md 注意处：
1. 图片转储，且访问有鉴权
2. 图片描述放在 figcaption 里
3. 微信不支持外链，所以用脚注的方式兼容。
4. 代码块转回来永远是一行。
5. 微信有独创的居中块，html 是 span 带有 `display:block;text-align:center;` 样式
6. 公式用 svg 画出来的
7. 文章开头的作者信息和结束的信息，包裹在 section 里

## Usage

```
import { Sitdown,RootNode } from 'sitdown';
import { applyWechatRule, extraFootLinks } from '@sitdown/wechat';

let sitdown = new Sitdown({
    keepFilter: ['style'],
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
    hr: '---',
  });
sitdown.use(applyWechatRule);

```

support mdnice wechat footlink:
```ts
const wechatToMD = (html: string) => {
const root = new sitdown.RootNode(html);
const footLinks = extraFootLinks(root);
    return sitdown.HTMLToMD(html, { footLinks });
};
```
