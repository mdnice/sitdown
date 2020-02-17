import Service from '../service';
import { fenceReplacement, isFence } from '../util';

export const applyFenceRule = (service: Service) => {
  service.addRule('fencedCodeBlock', {
    filter: function(node, options) {
      return isFence(options, node);
    },

    replacement: fenceReplacement,
  });
};
