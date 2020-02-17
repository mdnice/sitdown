import RootNode from './RootNode';
import Rules from './Rules';
import Node from './Node';
import join from '../util/join';
import {
  Options,
  Node as NodeType,
  Rule,
  Filter,
  FilterFunction,
} from '../types';

var rules = {};

var reduce = Array.prototype.reduce;
var escapes = [
  [/\\/g, '\\\\'],
  [/\*/g, '\\*'],
  [/^-/g, '\\-'],
  [/^\+ /g, '\\+ '],
  [/^(=+)/g, '\\$1'],
  [/^(#{1,6}) /g, '\\$1 '],
  [/`/g, '\\`'],
  [/^~~~/g, '\\~~~'],
  [/\[/g, '\\['],
  [/\]/g, '\\]'],
  [/^>/g, '\\>'],
  [/_/g, '\\_'],
  [/^(\d+)\. /g, '$1\\. '],
  // escapes
  [/^(\d+)\. /g, '$1\\. '],
  [/!/g, '\\!'],
  // [/"/g, '\\"'],
  // [/'/g, `\\'`],
  // [/#/g, '\\#'],
  [/\$/g, '\\$'],
  [/%/g, '\\%'],
  [/&/g, '\\&'],
  [/\(/g, '\\('],
  [/\)/g, '\\)'],
  // [/\+/g, '\\+'],
  // [/\-/g, '\\-'],
  // [/\,/g, '\\,'],
  // [/\./g, '\\.'],
  // [/\:/g, '\\:'],
  // [/\;/g, '\\;'],
  [/\</g, '\\<'],
  // [/\>/g, '\\>'],
  // [/\=/g, '\\='],
  [/\?/g, '\\?'],
  [/\{/g, '\\{'],
  // [/\|/g, '\\|'],
  [/\}/g, '\\}'],
  [/\~/g, '\\~'],
  [/\^/g, '\\^'],
  [/\@/g, '\\@'],
  // [/\//g, '\\/'],
];

class Service {
  options: Options;
  rules: Rules;
  static RootNode: (input: string) => Node | HTMLElement | null;

  constructor(options: Options) {
    var defaults = {
      rules: rules,
      headingStyle: 'setext',
      hr: '* * *',
      bulletListMarker: '*',
      codeBlockStyle: 'indented',
      fence: '```',
      emDelimiter: '_',
      strongDelimiter: '**',
      linkStyle: 'inlined',
      linkReferenceStyle: 'full',
      br: '  ',
      blankReplacement: function(_content: string, node: NodeType) {
        return node.isBlock ? '\n\n' : '';
      },
      keepReplacement: function(_content: string, node: NodeType) {
        return node.isBlock ? '\n\n' + node.outerHTML + '\n\n' : node.outerHTML;
      },
      defaultReplacement: function(content: string, node: NodeType) {
        return node.isBlock ? '\n\n' + content + '\n\n' : content;
      },
    };
    this.options = Object.assign({}, defaults, options);
    this.rules = new Rules(this.options);
  }

  /**
   * The entry point for converting a string or DOM node to Markdown
   * @public
   * @param {String|HTMLElement} input The string or DOM node to convert
   * @returns A Markdown representation of the input
   * @type String
   */

  turndown(input: string) {
    if (!canConvert(input)) {
      throw new TypeError(
        input + ' is not a string, or an element/document/fragment node.'
      );
    }

    if (input === '') return '';

    const node = RootNode(input);
    if (node) {
      // @ts-ignore
      var output = this.process(node);
      // @ts-ignore
      return this.postProcess(output);
    } else {
      return input;
    }
  }

  /**
   * Reduces a DOM node down to its Markdown string equivalent
   * @private
   * @param {HTMLElement} parentNode The node to convert
   * @returns A Markdown representation of the node
   * @type String
   */

  process(parentNode: NodeType) {
    return reduce.call(
      parentNode.childNodes,
      (output, node) => {
        node = new Node(node);

        var replacement = '';
        if (node.nodeType === 3) {
          replacement =
            node.isCode || node.unNeedEscape
              ? node.nodeValue
              : this.escape(node.nodeValue);
        } else if (node.nodeType === 1) {
          replacement = this.replacementForNode(node);
        } else if (node.nodeType === 8) {
          replacement = '<!--' + node.nodeValue + '-->';
        }

        return join(String(output), replacement);
      },
      ''
    );
  }

  /**
   * Appends strings as each rule requires and trims the output
   * @private
   * @param {String} output The conversion output
   * @returns A trimmed version of the ouput
   * @type String
   */

  postProcess(output: string) {
    this.rules.forEach(rule => {
      if (typeof rule.append === 'function') {
        output = join(output, rule.append(this.options));
      }
      if (typeof rule.unshift === 'function') {
        output = join(rule.unshift(this.options), output);
      }
    });

    return output.replace(/^[\t\r\n]+/, '').replace(/[\t\r\n\s]+$/, '');
  }

  /**
   * Add one or more plugins
   * @public
   * @param {Function|Array} plugin The plugin or array of plugins to add
   * @returns The instance for chaining
   * @type Object
   */

  use(plugin: any) {
    if (Array.isArray(plugin)) {
      for (var i = 0; i < plugin.length; i++) this.use(plugin[i]);
    } else if (typeof plugin === 'function') {
      plugin(this);
    } else {
      throw new TypeError('plugin must be a Function or an Array of Functions');
    }
    return this;
  }

  /**
   * Adds a rule
   * @public
   * @param {String} key The unique key of the rule
   * @param {Object} rule The rule
   * @returns The instance for chaining
   * @type Object
   */

  addRule(key: Filter, rule: Rule) {
    this.rules.add(key, rule);
    return this;
  }

  /**
   * Keep a node (as HTML) that matches the filter
   * @public
   * @param {String|Array|Function} filter The unique key of the rule
   * @returns The instance for chaining
   * @type Object
   */

  keep(filter: FilterFunction) {
    this.rules.keep(filter);
    return this;
  }

  /**
   * Remove a node that matches the filter
   * @public
   * @param {String|Array|Function} filter The unique key of the rule
   * @returns The instance for chaining
   * @type Object
   */

  remove(filter: FilterFunction) {
    this.rules.remove(filter);
    return this;
  }

  /**
   * Escapes Markdown syntax
   * @public
   * @param {String} string The string to escape
   * @returns A string with Markdown syntax escaped
   * @type String
   */

  escape(string: string) {
    return escapes.reduce(function(accumulator, escape) {
      return accumulator.replace(escape[0], <string>escape[1]);
    }, string);
  }

  /**
   * Converts an element node to its Markdown equivalent
   * @private
   * @param {HTMLElement} node The node to convert
   * @returns A Markdown representation of the node
   * @type String
   */

  replacementForNode(node: NodeType) {
    var rule = this.rules.forNode(node);
    var content = String(this.process(node));
    var whitespace = node.flankingWhitespace || { leading: '', trailing: '' };
    if (whitespace.leading || whitespace.trailing) content = content.trim();
    return (
      whitespace.leading +
      // @ts-ignore
      rule.replacement(content, node, this.options) +
      whitespace.trailing
    );
  }
}

/**
 * Determines whether an input can be converted
 * @private
 * @param {String|HTMLElement} input Describe this parameter
 * @returns Describe what it returns
 * @type String|Object|Array|Boolean|Number
 */

function canConvert(input: NodeType | string) {
  return (
    input != null &&
    (typeof input === 'string' ||
      (input.nodeType &&
        (input.nodeType === 1 ||
          input.nodeType === 9 ||
          input.nodeType === 11)))
  );
}

export default Service;
export { default as RootNode } from './RootNode';
