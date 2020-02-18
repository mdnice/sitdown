# `@sitdown/zhihu`

知乎 html 转 md 注意处：
1. 知乎进行了中文排版美化，如数字与中文、中文与英文间有空格
2. 图片转储了，并在 noscript 里有一份备份
3. 图片、链接描述（alt）没了
4. 知乎将公式转成图片了
5. 知乎把强调的链接的强调给滤掉了

## Usage

```
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
