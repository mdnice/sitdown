import TurndownService from 'turndown';

export const applyListRule = (turndownService: TurndownService) => {
  turndownService.addRule('list', {
    filter: 'li',

    replacement: function(content, node, options) {
      content = content
        .replace(/^\n+/, '') // remove leading newlines
        .replace(/\n+$/, '\n') // replace trailing newlines with just a single one
        .replace(/\n(\S)/gm, '\n    $1'); // indent
      var prefix = options.bulletListMarker + ' ';
      var parent = node.parentNode;
      if (parent && parent.nodeName === 'OL') {
        var start = (parent as HTMLElement).getAttribute('start');
        var index = Array.prototype.indexOf.call(parent.children, node);
        prefix = (start ? Number(start) + index : index + 1) + '.  ';
      }
      if (
        parent &&
        parent.nextSibling &&
        parent.nextSibling.nodeName === 'PRE'
      ) {
        prefix = ' ' + prefix + '   ';
      }

      return (
        prefix +
        content +
        (node.nextSibling && !/\n$/.test(content) ? '\n' : '')
      );
    },
  });
};
