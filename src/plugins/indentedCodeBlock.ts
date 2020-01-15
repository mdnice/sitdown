import TurndownService from 'turndown';

function hasListParent(node: TurndownService.Node): boolean {
  if (!node.parentNode) {
    return false;
  }
  if (node.parentNode.nodeName === 'LI') {
    return true;
  } else {
    return hasListParent(node.parentNode as HTMLElement);
  }
}
export const applyIndentedCodeBlockRule = (
  turndownService: TurndownService
) => {
  turndownService.addRule('indentedCodeBlock', {
    filter: function(node, options) {
      return !!(
        options.codeBlockStyle === 'indented' &&
        node.nodeName === 'PRE' &&
        node.firstChild &&
        node.firstChild.nodeName === 'CODE'
      );
    },

    replacement: function(_: string, node) {
      return node.firstChild && node.firstChild.textContent
        ? (hasListParent(node) ? '\n\n        ' : '\n\n    ') +
            node.firstChild.textContent.replace(/\n/g, '\n    ') +
            '\n\n'
        : '\n\n    \n\n';
    },
  });
};
