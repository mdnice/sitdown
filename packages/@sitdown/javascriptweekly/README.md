# `@sitdown/javascriptweekly`

javascriptweekly html 转 md 注意处：
1. 表格布局

## Usage

```
import { Sitdown } from 'sitdown';
import { applyJSWeeklyRule } from '@sitdown/javascriptweekly';

let sitdown = new Sitdown({
      keepFilter: ['style'],
      codeBlockStyle: 'fenced',
      bulletListMarker: '-',
      hr: '---',
});
sitdown.use(applyJSWeeklyRule);
```
