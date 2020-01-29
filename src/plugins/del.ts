// del
import TurndownService from '@type/turndown';

export const applyDelRule = (turndownService: TurndownService) => {
  turndownService.addRule('del', {
    filter: ['del', 's'],

    replacement: function(content) {
      return '~~' + content + '~~';
    },
  });
};
