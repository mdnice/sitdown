import TurndownService from 'turndown';
import { repeat, escape } from '../util';

var escapes: [RegExp, string][] = [[/\s#/g, ' \\#']];

export const applyHeadingRule = (turndownService: TurndownService) => {
  turndownService.addRule('heading', {
    filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],

    replacement: function(content, node, options) {
      var hLevel = Number(node.nodeName.charAt(1));

      if (options.headingStyle === 'setext' && hLevel < 3) {
        var underline = repeat(hLevel === 1 ? '=' : '-', content.length);
        return '\n\n' + content + '\n' + underline + '\n\n';
      } else {
        return (
          '\n\n' + repeat('#', hLevel) + ' ' + escape(escapes, content) + '\n\n'
        );
      }
    },
  });
};
