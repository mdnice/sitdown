// list
import Service from '../service';
import { listReplacement } from '../util';

export const applyListRule = (service: Service) => {
  service.addRule('list', {
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

  service.addRule('listItem', {
    filter: 'li',

    replacement: listReplacement,
  });
};
