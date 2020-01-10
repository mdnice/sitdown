import TurndownService from 'turndown';
import { Options } from '../types';

export const applyFenceRule = (turndownService: TurndownService) => {
  turndownService.addRule('fencedCodeBlock', {
    filter: function(node, options) {
      return !!(
        options.codeBlockStyle === 'fenced' &&
        node.nodeName === 'PRE' &&
        node.firstChild &&
        node.firstChild.nodeName === 'CODE'
      );
    },

    replacement: function(
      _,
      node: HTMLElement | Document | DocumentFragment | Element,
      options: Options
    ) {
      var className = node.firstChild
        ? (node.firstChild as Element).className
        : '';
      var language = (className.match(/language-(\S+)/) || [null, ''])[1];
      var startFence =
        options.startFence != undefined ? options.startFence : options.fence;
      var endFence =
        options.endFence != undefined ? options.endFence : options.fence;

      return (
        '\n\n' +
        startFence +
        language +
        '\n' +
        (node.firstChild ? node.firstChild.textContent : '') +
        endFence +
        '\n\n'
      );
    },
  });
};
