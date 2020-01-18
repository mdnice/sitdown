import TurndownService from '../../../../lib/turndown';
import { findParentNumber } from '../../findParentNumber';

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
}
