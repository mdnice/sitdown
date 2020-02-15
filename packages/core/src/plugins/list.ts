// list
import TurndownService from '../lib/turndown';
import { listReplacement } from '../util';

export const applyListRule = (turndownService: TurndownService) => {
  turndownService.addRule('list', {
    filter: ['ul', 'ol'],

    replacement: function(content, node) {
      var parent = node.parentNode;
      if (
        parent &&
        parent.nodeName === 'LI' &&
        parent.lastElementChild === node
      ) {
        return '\n' + content;
      } else {
        return '\n\n' + content + '\n\n';
      }
    },
  });

  turndownService.addRule('listItem', {
    filter: 'li',

    replacement: listReplacement,
  });
};
