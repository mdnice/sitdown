import TurndownService from '../service/turndown';

export const applyTaskRule = (turndownService: TurndownService) => {
  turndownService.addRule('task', {
    filter: function(node) {
      return (
        (node as HTMLInputElement).type === 'checkbox' &&
        node.parentNode != null &&
        node.parentNode.nodeName === 'LI'
      );
    },
    replacement: function(_content, node) {
      return ((node as HTMLInputElement).checked ? '[x]' : '[ ]') + ' ';
    },
  });
};
