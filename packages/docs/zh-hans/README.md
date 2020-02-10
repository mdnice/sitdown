# SitDown
使用 JavaScript 将 HTML 转换为 Markdown。支持 GitHub Flavored Markdown 规范。

借鉴了 [turndown](https://github.com/domchristie/turndown)。

这个项目基于 [TSDX](https://github.com/jaredpalmer/tsdx)。

## 安装
npm:

    npm install sitdown
    

## 使用
```js
// Node
var { Sitdown } = require('sitdown')

var sitdown = new Sitdown()
var markdown = sitdown.HTMLToMD('<h1>Hello world!</h1>')
```

```js
// 浏览器
import { Sitdown } from 'sitdown/src.esm'

var sitdown = new Sitdown()
var markdown = sitdown.HTMLToMD('<h1>Hello world!</h1>')
```

Sitdown 还接受 DOM 节点作为输入 （元素节点、文档节点或文档片段节点）：
```js
var markdown = sitdown.HTMLToMD(document.getElementById('content'))
```

## 选项
选项可以在实例化时传递给构造函数。例如：

```js
var sitdown = new Sitdown({ option: 'value' })
```

| 选项 | 有效值 | 默认值 |
| :-- | :-- | :-- |
| `headingStyle` | `setext` 或 `atx` | `atx` |
| `hr` | 任意 [专用的换行](http://spec.commonmark.org/0.27/#thematic-breaks) | `* * *` |
| `bulletListMarker` | `-`, `+`, 或 `*` | `*` |
| `codeBlockStyle` | `indented` 或 `fenced` | `indented` |
| `fence` | ` ``` ` 或 `~~~` | ` ``` ` |
| `emDelimiter` | `_` 或 `*` | `_` |
| `strongDelimiter` | `**` 或 `__` | `**` |
| `linkStyle` | `inlined` 或 `referenced` | `inlined` |
| `linkReferenceStyle` | `full`, `collapsed`, 或 `shortcut` | `full` |
| `keepFilter` | `style`, `['style','div']`, 或 a function | `['style','div']` |

## 进阶选项
| 选项 | 有效值 | 默认值 |
| :-- | :-- | :-- |
| `blankReplacement` | 规则替换函数 | 参考下面的 **特殊的规则** |
| `keepReplacement` | 规则替换函数 | 参考下面的 **特殊的规则** |
| `defaultReplacement` | 规则替换函数 | 参考下面的 **特殊的规则** |

## 方法

### [](#addrulekey-rule)`addRule(key, rule)`

`key` 参数是规则的唯一名称，便于参考。例子：

```js
sitdown.service.addRule('strikethrough', {
  filter: ['del', 's', 'strike'],
  replacement: function (content) {
    return '~' + content + '~'
  }
})
```

`addRule` 返回 `service` 实例便于链式调用。

参考下面的 **拓展规则**。

### `keep(filter)`

确定要保留哪些元素并将其渲染为 HTML。默认情况下，Sitdown 不保留任何元素。筛选器参数的工作方式类似于规则筛选器（请参考下面筛选器上的部分）。例子：


```js
sitdown.service.keep(['del', 'ins'])
sitdown.HTMLToMD('<p>Hello <del>world</del><ins>World</ins></p>') // 'Hello <del>world</del><ins>World</ins>'
```

这将在转换时渲染 `<del>` 和 `<ins>` 元素为 HTML。

`keep` 可以多次调用，新添加的保留筛选器优先于旧筛选器。保留筛选器将被标准的 CommonMark 规则和任意添加的规则覆盖。要保留通常由这些规则处理的元素，请添加具有所需行为的规则。

`keep` 返回 `service` 实例便于链式调用。

### [](#removefilter)`remove(filter)`

确定要完全删除的元素，即转换为空字符串。默认情况下，Sitdown 不会删除任何元素。筛选器参数的工作方式类似于规则筛选器（请参阅下面筛选器上的部分）。例子：

```js
sitdown.service.remove('del')
sitdown.HTMLToMD('<p>Hello <del>world</del><ins>World</ins></p>') // 'Hello World'
```

这将删除 `<del>` 元素和它的内容。

`remove` 可以多次调用，新添加的删除筛选器优先于旧筛选器。删除筛选器将被保留筛选器、标准的 CommonMark 规则和任何添加的规则覆盖。要删除通常由这些规则处理的元素，请添加具有所需行为的规则。

`remove` 返回 `service` 实例便于链式调用

### [](#usepluginarray)`use(plugin|array)`

使用插件或插件数组。例子：

```js
// 导入插件 turndown-plugin-gfm
var turndownPluginGfm = require('turndown-plugin-gfm')
var gfm = turndownPluginGfm.gfm
var tables = turndownPluginGfm.tables
var strikethrough = turndownPluginGfm.strikethrough

// 使用 gfm 插件
sitdown.service.use(gfm)

// 仅仅使用部分插件
sitdown.service.use([tables, strikethrough])
```

`use` 返回 `service` 实例便于链式调用

参考下面的**插件**部分。

## [](#extending-with-rules)规则拓展

可以通过添加**规则**来扩展 Sitdown。规则是具有 `filter` 和 `replacement` 属性的纯 JavaScript 对象。例如，用于转换 `<p>` 元素的规则如下所示：

```js
{
  filter: 'p',
  replacement: function (content) {
    return '\n\n' + content + '\n\n'
  }
}
```

筛选器选择 `<p>` 元素，替换函数返回由两个换行分隔的 `<p>` 内容。

### [](#filter-stringarrayfunction)`filter` String|Array|Function

筛选器属性确定是否应将元素替换为规则的 `replacement` 函数。只需使用标签名称或标签名称数组即可选择 DOM 节点：

* `filter: 'p'` 将选择 `<p>` 元素
* `filter: ['em', 'i']` 将选择 `<em>` 或 `<i>` 元素

或者，筛选器可以是一个函数，根据是否应替换给定节点来返回布尔值。该函数传递一个 DOM 节点以及 `Sitdown` 选项。例如，当 `linkStyle` 选项为 `inlined` 时，以下规则选择 `<a>` 元素（带 `href`）：

```js
filter: function (node, options) {
  return (
    options.linkStyle === 'inlined' &&
    node.nodeName === 'A' &&
    node.getAttribute('href')
  )
}
```

### [](#replacement-function)`replacement` Function

替换函数确定元素的转换方式。它应返回给定节点的 Markdown 字符串。该函数传递节点的内容、节点本身和 `Sitdown` 选项。

以下规则显示了如何转换 `<em>` 元素：

```js
rules.emphasis = {
  filter: ['em', 'i'],

  replacement: function (content, node, options) {
    return options.emDelimiter + content + options.emDelimiter
  }
}
```

### [](#special-rules)特殊的规则

**空白规则** 确定如何处理空白元素。它覆盖每个规则 （即使那些通过 `addRule` 添加的规则）。如果节点仅包含空格，并且不是 `<a>`，`<td>`，`<th>`或 void 元素，则该节点为空。可以使用 `blankReplacement` 选项自定义其行为。

**保留规则** 确定如何处理不应转换的元素，即在 Markdown 输出中渲染为 HTML。默认情况下，不会保留任何元素。块级元素将通过空白行与周围内容分隔。其行为可以使用 `keepReplacement` 选项进行自定义。

**删除规则** 确定要完全删除哪些元素。默认情况下，不会删除任何元素。

**默认规则** 处理任意其他规则无法识别的节点。默认情况下，它输出节点的文本内容（如果是块级元素，则用空白行分隔）。其行为可以通过 `defaultReplacement` 选项进行自定义。

### [](#rule-precedence)规则优先级

Sitdown 会遍放规则集，并选取与 `filter` 匹配的第一个规则。下面的列表描述了优先级的顺序：

1.  空白规则
2.  添加的规则（可选的）
3.  Commonmark 规则
4.  保留规则
5.  删除规则
6.  默认规则

## [](#plugins)插件

插件 API 为开发人员提供了一种应用多个扩展的便捷方法。插件只是使用 `sitdown.service` 调用的函数。

## 转义 Markdown 字符
Sitdown 使用后斜杠 (`\`\) 来转义 HTML 输入中的 Markdown 字符。这可确保在输出编译回 HTML 时，这些字符不会解释为 Markdown。例如， `<h1>1. Hello world</h1>` 需要被转义成 `1\. Hello world`，否则它将被解释为一个列表项，而不是一个标题。

为了避免将每个 HTML 元素的内容解析为 Markdown 的复杂性和性能影响，Sitdown 使用一组正则表达式来转义潜在的 Markdown 语法。因此，转义规则可能相当具有入侵性。

## 本地开发

下面是你可能会发现有用的命令列表。

### `npm start` 或 `yarn start`

以开发/监视模式运行项目。你的项目将在更改时重新构建。TSDX 有一个特殊的记录器，方便你打印错误消息和格式化的兼容 VSC 的问题选项卡。

<img src="https://user-images.githubusercontent.com/4060187/52168303-574d3a00-26f6-11e9-9f3b-71dbec9ebfcb.gif" width="600" />

如果进行编辑，将重新构建你的库。

### `npm run build` 或 `yarn build`

将包打包到 `dist` 文件夹。
该软件包经过优化，并可输出成多种格式（Common JS、UMD 和 ES 模块）。

<img src="https://user-images.githubusercontent.com/4060187/52168322-a98e5b00-26f6-11e9-8cf6-222d716b75ef.gif" width="600" />

### `npm test` 或 `yarn test`

在监视模式下运行测试程序（Jest）。
默认情况下，运行自上次提交以来更改的文件。

## [](#license)License

Sitdown 版规归 © 2020+ mdnice 所有，并用 MIT license 发布。