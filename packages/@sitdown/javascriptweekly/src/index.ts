import Service from 'sitdown/dist/service';
import { Node, Options } from 'sitdown/dist/types';
// @ts-ignore
import { Util } from 'sitdown/dist/src.esm';

const escape = Util.escape;

const escapes: [
  RegExp,
  string | ((substring: string, ...args: any[]) => string)
][] = [
  [
    /(.*)\|(.*)/g,
    (match, p1, p2) => {
      if (match.match(/\`.*\|.*\`/)) {
        return `${p1}\|${p2}`;
      }
      return `${p1}\\|${p2}`;
    },
  ],
];

function cell(content: string, _node: Node, _options?: Options) {
  return escape(escapes, content);
}

export const applyJSWeeklyRule = (service: Service) => {
  service.options.convertNoHeaderTable = true;
  service.addRule('JSWeeklyTableRow', {
    filter: 'tr',
    replacement: function(content) {
      var borderCells = '';

      return '\n' + content + (borderCells ? '\n' + borderCells : '');
    },
  });

  service.addRule('JSWeeklyTableCell', {
    filter: ['th', 'td'],
    replacement: function(content: string, node: Node, options) {
      return cell(content, node, options);
    },
  });
};
