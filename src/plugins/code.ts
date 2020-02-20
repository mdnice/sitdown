import TurndownService from '../lib/turndown';
import { Options } from '../types';

export const applyCodeRule = (turndownService: TurndownService) => {
  turndownService.addRule('code', {
    filter: function(node) {
      var hasSiblings = node.previousSibling || node.nextSibling;
      var isCodeBlock =
        node.parentNode && node.parentNode.nodeName === 'PRE' && !hasSiblings;

      return node.nodeName === 'CODE' && !isCodeBlock;
    },

    replacement: function(content, _, options: Options) {
      if (!content.trim()) return '';

      var delimiter = options.codeDelimiter || '`';
      var leadingSpace = '';
      var trailingSpace = '';
      var matches = content.match(/`+/gm);
      if (matches) {
        if (/^`/.test(content)) leadingSpace = ' ';
        if (/`$/.test(content)) trailingSpace = ' ';
        while (matches.indexOf(delimiter) !== -1) delimiter = delimiter + '`';
      }

      return delimiter + leadingSpace + content + trailingSpace + delimiter;
    },
  });
};
