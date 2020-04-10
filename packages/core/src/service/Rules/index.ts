/**
 * Manages a collection of rules used to convert HTML to Markdown
 */
import findRule from './findRule';
import {
  Options,
  ReplacementFunction,
  Rule,
  Node,
  FilterFunction,
} from '../../types';

export default class Rules {
  private _keep: Rule[];
  private _remove: Rule[];

  options: Options;
  array: Rule[];

  blankRule: {
    replacement: ReplacementFunction;
  };
  defaultRule: {
    replacement: ReplacementFunction;
  };
  keepReplacement: ReplacementFunction;

  constructor(options: Options) {
    if (typeof options.blankReplacement !== 'function') {
      throw Error('blankReplacement option must be function');
    }

    if (typeof options.keepReplacement !== 'function') {
      throw Error('keepReplacement option must be function');
    }

    if (typeof options.defaultReplacement !== 'function') {
      throw Error('defaultReplacement option must be function');
    }
    this.options = options;
    this._keep = [];
    this._remove = [];

    this.blankRule = {
      replacement: options.blankReplacement,
    };

    this.keepReplacement = options.keepReplacement;

    this.defaultRule = {
      replacement: options.defaultReplacement,
    };

    this.array = [];
    for (var key in options.rules) this.array.push(options.rules[key]);
  }

  add(_key: string, rule: Rule) {
    this.array.unshift(rule);
  }

  keep(filter: FilterFunction) {
    this._keep.unshift({
      filter: filter,
      replacement: this.keepReplacement,
    });
  }

  remove(filter: FilterFunction) {
    this._remove.unshift({
      filter: filter,
      replacement() {
        return '';
      },
    });
  }

  forNode(node: Node) {
    if (node.isBlank) return this.blankRule;
    var rule;

    if ((rule = findRule(this.array, node, this.options))) return rule;
    if ((rule = findRule(this._keep, node, this.options))) return rule;
    if ((rule = findRule(this._remove, node, this.options))) return rule;

    return this.defaultRule;
  }

  forEach(fn: (item: any, i: number) => void) {
    for (var i = 0; i < this.array.length; i++) fn(this.array[i], i);
  }
}
