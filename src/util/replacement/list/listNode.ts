import TurndownService from '@type/turndown';
import { findParentNumber } from '../../findParentNumber';
import { repeat } from '../../repeat';
import { IndentCodeIsListfirstChild } from '../../indentCodeIsListfirstChild';
import { findOrderListIndentNumber } from '../../findOrderListIndentNumber';

export class ListNode {
  node: TurndownService.Node;

  constructor(node: TurndownService.Node) {
    this.node = node;
  }

  get parent() {
    return this.node.parentNode;
  }

  get parentIsOL() {
    return this.parent && this.parent.nodeName === 'OL';
  }

  get nestULCount() {
    return findParentNumber(this.node, 'UL');
  }

  get nestOLCount() {
    return findParentNumber(this.node, 'OL');
  }

  get nestCount() {
    return this.nestULCount + this.nestOLCount;
  }

  get isLoose() {
    const node = this.node;
    return node.firstChild && node.firstChild.nodeName === 'P'; // Todo:isBlock
  }

  get isNewList() {
    const parent = this.parent;
    return (
      parent &&
      parent.previousSibling &&
      parent.previousSibling.nodeName === parent.nodeName
    );
  }

  get followCode() {
    const parent = this.parent;
    return (
      parent && parent.nextSibling && parent.nextSibling.nodeName === 'PRE'
    );
  }

  get inLast() {
    const parent = this.parent;
    return parent && parent.lastChild === this.node;
  }

  get nestListAndParentIsEmpty() {
    const { nestOLCount, nestULCount, node } = this;
    return (
      nestOLCount + nestULCount > 1 &&
      node.parentNode &&
      node.parentNode.parentNode &&
      (node.parentNode.parentNode as HTMLElement).innerHTML ===
        (node.parentNode as HTMLElement).outerHTML
    );
  }

  lineIndent(options: TurndownService.Options) {
    const { nestOLCount, nestULCount, nestCount, node } = this;
    var indent = `\n    ${repeat(' ', nestCount - 1)}$1`;
    if (IndentCodeIsListfirstChild(node, options) && nestOLCount) {
      indent = `\n  ${repeat(' ', nestCount)}$1`;
    } else if (nestULCount) {
      indent = `\n${repeat(' ', nestCount * 2)}$1`;
    }
    return indent;
  }

  caclPrefix(input: string) {
    let prefix = input;
    const {
      nestOLCount,
      nestULCount,
      parentIsOL,
      node,
      parent,
      isNewList,
      inLast,
      isLoose,
      followCode,
      nestListAndParentIsEmpty,
    } = this;
    if (parent && parentIsOL) {
      var start = (parent as HTMLElement).getAttribute('start');
      var index = Array.prototype.indexOf.call(parent.children, node);
      prefix =
        (start ? Number(start) + index : index + 1) +
        (isNewList ? ')  ' : '.  ');
    }
    if (followCode) {
      if (!isLoose) prefix = ' ' + prefix + '   '; // example 235
      if (inLast && isLoose) {
        // example 293
        prefix = '  ' + prefix;
      }
    }

    if (nestULCount > 1) {
      prefix = repeat(' ', (nestULCount - 1) * 2) + prefix;
    }
    if (nestULCount && nestOLCount) {
      const indent = findOrderListIndentNumber(node);
      prefix = repeat(' ', nestULCount * 4 + indent) + prefix;
    }
    // Info：嵌套列表且父列表为空
    if (nestListAndParentIsEmpty) {
      prefix = prefix.trimStart();
    }

    return prefix;
  }
}
