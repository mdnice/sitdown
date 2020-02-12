## `@sitdown/juejin`

```ts
import { Sitdown } from 'sitdown';
import { applyJuejinRule } from '@sitdown/juejin';

let sitdown = new Sitdown({
      keepFilter: ['style'],
      codeBlockStyle: 'fenced',
      bulletListMarker: '-',
      hr: '---',
});
sitdown.use(applyJuejinRule);
```

## `@sitdown/wechat`

```ts
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
import { extraFootLinks } from '@sitdown/wechat';

const wechatToMD = (html: string) => {
    const root = new sitdown.RootNode(html);
    const footLinks = extraFootLinks(root);
    return sitdown.HTMLToMD(html, { footLinks });
};
```

## `@sitdown/zhihu`

```ts
import { Sitdown } from 'sitdown';
import { applyZhihuRule } from '@sitdown/zhihu';
let sitdown = new Sitdown({
    keepFilter: ['style'],
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
    hr: '---',
});
sitdown.use(applyZhihuRule);

```

## csdn

```ts
import { Sitdown } from 'sitdown';

let sitdown = new Sitdown({
      keepFilter: ['style'],
      codeBlockStyle: 'fenced',
      bulletListMarker: '-',
      hr: '---',
});
```
