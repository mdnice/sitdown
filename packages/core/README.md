# SitDown
Convert HTML into Markdown with JavaScript.Support GitHub Flavored Markdown Spec.

Learn from [turndown](https://github.com/domchristie/turndown).

This project was bootstrapped with [TSDX](https://github.com/jaredpalmer/tsdx).

## Installation
npm:

    npm install sitdown
    

## Usage
```js
// For Node
var { Sitdown } = require('sitdown')

var sitdown = new Sitdown()
var markdown = sitdown.HTMLToMD('<h1>Hello world!</h1>')
```

```js
// For Browser
import { Sitdown } from 'sitdown/src.esm'

var sitdown = new Sitdown()
var markdown = sitdown.HTMLToMD('<h1>Hello world!</h1>')
```

Sitdown also accepts DOM nodes as input \(either element nodes, document nodes, or document fragment nodes\):

```js
var markdown = sitdown.HTMLToMD(document.getElementById('content'))
```

## Options
Options can be passed in to the constructor on instantiation. For example:

```js
var sitdown = new Sitdown({ option: 'value' })
```

| Option | Valid values | Default |
| :-- | :-- | :-- |
| `headingStyle` | `setext` or `atx` | `atx` |
| `hr` | Any [Thematic break](http://spec.commonmark.org/0.27/#thematic-breaks) | `* * *` |
| `bulletListMarker` | `-`, `+`, or `*` | `*` |
| `codeBlockStyle` | `indented` or `fenced` | `indented` |
| `fence` | ` ``` ` or `~~~` | ` ``` ` |
| `emDelimiter` | `_` or `*` | `_` |
| `strongDelimiter` | `**` or `__` | `**` |
| `linkStyle` | `inlined` or `referenced` | `inlined` |
| `linkReferenceStyle` | `full`, `collapsed`, or `shortcut` | `full` |
| `keepFilter` | `style`, `['style','div']`, or a function | `['style','div']` |
| `env` | `{}` |  |

## Advanced Options
| Option | Valid values | Default |
| :-- | :-- | :-- |
| `blankReplacement` | rule replacement function | See **Special Rules** below |
| `keepReplacement` | rule replacement function | See **Special Rules** below |
| `defaultReplacement` | rule replacement function | See **Special Rules** below |

## Methods

### [](#addrulekey-rule)`addRule(key, rule)`

The `key` parameter is a unique name for the rule for easy reference. Example:

```js
sitdown.service.addRule('strikethrough', {
  filter: ['del', 's', 'strike'],
  replacement: function (content) {
    return '~' + content + '~'
  }
})
```

`addRule` returns the `service` instance for chaining.

See **Extending with Rules** below.

### `keep(filter)`

Determines which elements are to be kept and rendered as HTML. By default, Sitdown does not keep any elements. The filter parameter works like a rule filter \(see section on filters belows\). Example:

```js
sitdown.service.keep(['del', 'ins'])
sitdown.HTMLToMD('<p>Hello <del>world</del><ins>World</ins></p>') // 'Hello <del>world</del><ins>World</ins>'
```

This will render `<del>` and `<ins>` elements as HTML when converted.

`keep` can be called multiple times, with the newly added keep filters taking precedence over older ones. Keep filters will be overridden by the standard CommonMark rules and any added rules. To keep elements that are normally handled by those rules, add a rule with the desired behaviour.

`keep` returns the `service` instance for chaining.

### [](#removefilter)`remove(filter)`

Determines which elements are to be removed altogether i.e. converted to an empty string. By default, Sitdown does not remove any elements. The filter parameter works like a rule filter \(see section on filters belows\). Example:

```js
sitdown.service.remove('del')
sitdown.HTMLToMD('<p>Hello <del>world</del><ins>World</ins></p>') // 'Hello World'
```

This will remove `<del>` elements \(and contents\).

`remove` can be called multiple times, with the newly added remove filters taking precedence over older ones. Remove filters will be overridden by the keep filters, standard CommonMark rules, and any added rules. To remove elements that are normally handled by those rules, add a rule with the desired behaviour.

`remove` returns the `service` instance for chaining.

### [](#usepluginarray)`use(plugin|array)`

Use a plugin, or an array of plugins. Example:

```js
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

`use` returns the `service` instance for chaining.

See **Plugins** below.

## [](#extending-with-rules)Extending with Rules

Sitdown can be extended by adding **rules**. A rule is a plain JavaScript object with `filter` and `replacement` properties. For example, the rule for converting `<p>` elements is as follows:

```js
{
  filter: 'p',
  replacement: function (content) {
    return '\n\n' + content + '\n\n'
  }
}
```

The filter selects `<p>` elements, and the replacement function returns the `<p>` contents separated by two new lines.

### [](#filter-stringarrayfunction)`filter` String|Array|Function

The filter property determines whether or not an element should be replaced with the rule's `replacement`. DOM nodes can be selected simply using a tag name or an array of tag names:

* `filter: 'p'` will select `<p>` elements
* `filter: ['em', 'i']` will select `<em>` or `<i>` elements

Alternatively, the filter can be a function that returns a boolean depending on whether a given node should be replaced. The function is passed a DOM node as well as the `Service` options. For example, the following rule selects `<a>` elements \(with an `href`\) when the `linkStyle` option is `inlined`:

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

The replacement function determines how an element should be converted. It should return the Markdown string for a given node. The function is passed the node's content, the node itself, and the `Service` options.

The following rule shows how `<em>` elements are converted:

```js
rules.emphasis = {
  filter: ['em', 'i'],

  replacement: function (content, node, options) {
    return options.emDelimiter + content + options.emDelimiter
  }
}
```

### [](#special-rules)Special Rules

**Blank rule** determines how to handle blank elements. It overrides every rule \(even those added via `addRule`\). A node is blank if it only contains whitespace, and it's not an `<a>`, `<td>`,`<th>` or a void element. Its behaviour can be customised using the `blankReplacement` option.

**Keep rules** determine how to handle the elements that should not be converted, i.e. rendered as HTML in the Markdown output. By default, no elements are kept. Block-level elements will be separated from surrounding content by blank lines. Its behaviour can be customised using the `keepReplacement` option.

**Remove rules** determine which elements to remove altogether. By default, no elements are removed.

**Default rule** handles nodes which are not recognised by any other rule. By default, it outputs the node's text content \(separated by blank lines if it is a block-level element\). Its behaviour can be customised with the `defaultReplacement` option.

### [](#rule-precedence)Rule Precedence

Sitdown iterates over the set of rules, and picks the first one that matches the `filter`. The following list describes the order of precedence:

1.  Blank rule
2.  Added rules \(optional\)
3.  Commonmark rules
4.  Keep rules
5.  Remove rules
6.  Default rule

## [](#plugins)Plugins

The plugin API provides a convenient way for developers to apply multiple extensions. A plugin is just a function that is called with the `service` instance.

## Escaping Markdown Characters
Sitdown uses backslashes \(`\`\) to escape Markdown characters in the HTML input. This ensures that these characters are not interpreted as Markdown when the output is compiled back to HTML. For example, the contents of `<h1>1. Hello world</h1>` needs to be escaped to `1\. Hello world`, otherwise it will be interpreted as a list item rather than a heading.

To avoid the complexity and the performance implications of parsing the content of every HTML element as Markdown, Sitdown uses a group of regular expressions to escape potential Markdown syntax. As a result, the escaping rules can be quite aggressive.

## Local Development

Below is a list.ts of commands you will probably find useful.

### `npm start` or `yarn start`

Runs the project in development/watch mode. Your project will be rebuilt upon changes. TSDX has a special logger for you convenience. Error messages are pretty printed and formatted for compatibility VS Code's Problems tab.

<img src="https://user-images.githubusercontent.com/4060187/52168303-574d3a00-26f6-11e9-9f3b-71dbec9ebfcb.gif" width="600" />

Your library will be rebuilt if you make edits.

### `npm run build` or `yarn build`

Bundles the package to the `dist` folder.
The package is optimized and bundled with Rollup into multiple formats (CommonJS, UMD, and ES Module).

<img src="https://user-images.githubusercontent.com/4060187/52168322-a98e5b00-26f6-11e9-8cf6-222d716b75ef.gif" width="600" />

### `npm test` or `yarn test`

Runs the test watcher (Jest) in an interactive mode.
By default, runs tests related to files changed since the last commit.

## [](#license)License

sitdown is copyright © 2020+ mdnice and released under the MIT license.