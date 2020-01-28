import TurndownService from '../lib/turndown';
import { escape } from '../util';

const escapes: [RegExp, string][] = [
  [/\*/g, '\\*'],
  [/"/g, '\\"'],
];
export const applyReferenceLinkRule = (turndownService: TurndownService) => {
  turndownService.addRule('referenceLink', {
    filter: function(node, options) {
      return !!(
        options.linkStyle === 'referenced' &&
        node.nodeName === 'A' &&
        node.getAttribute('href')
      );
    },

    replacement: function(content, node: any, options) {
      var href = escape(escapes, decodeURIComponent(node.getAttribute('href')));
      if (href.includes(' ')) {
        href = '<' + href + '>';
      }
      var title = node.title ? ' "' + escape(escapes, node.title) + '"' : '';
      var replacement;
      var reference;

      switch (options.linkReferenceStyle) {
        case 'collapsed':
          replacement = '[' + content + '][]';
          reference = '[' + content + ']: ' + href + title;
          break;
        case 'shortcut':
          replacement = '[' + content + ']';
          reference = '[' + content + ']: ' + href + title;
          break;
        default:
          var id =
            this.references && this.references.length
              ? 'ref' + (this.references.length + 1)
              : 'ref';
          replacement = '[' + content + '][' + id + ']';
          reference = '[' + id + ']: ' + href + title;
      }

      this.references && this.references.push(reference);
      return replacement;
    },

    references: [],

    unshift: function() {
      var references = '';
      if (this.references && this.references.length) {
        references = '\n\n' + this.references.join('\n') + '\n\n';
        this.references = []; // Reset references
      }
      return references;
    },
  });
};
