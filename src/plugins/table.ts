import TurndownService from 'turndown';
import { escape } from '../util';
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

var every = Array.prototype.every;
var indexOf = Array.prototype.indexOf;

function cell(content: string, node: TurndownService.Node) {
  var index = node.parentNode
    ? indexOf.call(node.parentNode.childNodes, node)
    : -1;
  var prefix = ' ';
  if (index === 0) prefix = '| ';
  return prefix + escape(escapes, content) + ' |';
}
function isFirstTbody(element: Node & ParentNode) {
  var previousSibling = element.previousSibling;
  return (
    element.nodeName === 'TBODY' &&
    (!previousSibling ||
      (previousSibling.nodeName === 'THEAD' &&
        /^\s*$/i.test(previousSibling.textContent || '')))
  );
}
function isHeadingRow(tr: TurndownService.Node) {
  var parentNode = tr.parentNode;
  return parentNode
    ? parentNode.nodeName === 'THEAD' ||
        (parentNode.firstChild === tr &&
          (parentNode.nodeName === 'TABLE' || isFirstTbody(parentNode)) &&
          every.call(tr.childNodes, function(n: HTMLElement) {
            return n.nodeName === 'TH';
          }))
    : false;
}

export const applyTableRule = (turndownService: TurndownService) => {
  turndownService.addRule('tableRow', {
    filter: 'tr',
    replacement: function(content, node) {
      var borderCells = '';
      const alignMap: { [key: string]: string } = {
        left: ':--',
        right: '--:',
        center: ':-:',
      };

      if (isHeadingRow(node)) {
        for (var i = 0; i < node.childNodes.length; i++) {
          var border = '---';
          const curNode = node.childNodes[i] as HTMLElement;
          var align = (
            curNode.getAttribute('align') ||
            curNode.style.textAlign ||
            ''
          ).toLowerCase();

          if (align) border = alignMap[align] || border;

          borderCells += cell(border, curNode);
        }
      }
      return '\n' + content + (borderCells ? '\n' + borderCells : '');
    },
  });

  turndownService.addRule('tableCell', {
    filter: ['th', 'td'],
    replacement: function(content, node) {
      return cell(content, node);
    },
  });
};
