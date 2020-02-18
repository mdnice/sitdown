import Service from '../service';

export const applyBlockquoteRule = (service: Service) => {
  service.addRule('hr', {
    filter: 'blockquote',

    replacement: function(content, node) {
      var parent = node.parentNode;
      var parentIsList = parent && parent.nodeName === 'LI';
      var blank = parentIsList ? '\n' : '\n\n';
      content = content.replace(/^\n+|\n+$/g, '').replace(/^/gm, '> ');
      return blank + content + blank;
    },
  });
};
