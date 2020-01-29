import TurndownService from '@type/turndown';
import { fenceReplacement, isFence } from '../util';

export const applyFenceRule = (turndownService: TurndownService) => {
  turndownService.addRule('fencedCodeBlock', {
    filter: function(node, options) {
      return isFence(options, node);
    },

    replacement: fenceReplacement,
  });
};
