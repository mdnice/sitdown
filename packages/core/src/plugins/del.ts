// del
import Service from '../service';

export const applyDelRule = (service: Service) => {
  service.addRule('del', {
    filter: ['del', 's'],

    replacement: function(content) {
      return '~~' + content + '~~';
    },
  });
};
