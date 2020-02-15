import TurndownService from '../lib/turndown';

export const applyBrRule = (turndownService: TurndownService) => {
  turndownService.addRule('hr', {
    filter: 'br',

    replacement: function(_content, _node, options) {
      return options.br + '\n';
    },
  });
};
