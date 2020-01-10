import TurndownService from 'turndown';
import { applyListRule } from './plugins/list';
import { applyHrRule } from './plugins/hr';
import { applyParagraphRule } from './plugins/paragraph';
import { applyHeadingRule } from './plugins/heading';
import { applyFenceRule } from './plugins/fencedCodeBlock';
import { Options } from './types';

export class Sitdown {
  defaultOptions: TurndownService.Options;
  service: TurndownService;

  constructor(options?: TurndownService.Options) {
    this.defaultOptions = {
      headingStyle: 'atx',
      blankReplacement: function(
        _,
        node: TurndownService.Node & { isBlock?: boolean },
        options: Options
      ) {
        if (
          options.codeBlockStyle === 'fenced' &&
          node.nodeName === 'PRE' &&
          node.firstChild &&
          node.firstChild.nodeName === 'CODE'
        ) {
          var startFence =
            options.startFence != undefined
              ? options.startFence
              : options.fence;
          var endFence =
            options.endFence != undefined ? options.endFence : options.fence;

          return (
            '\n\n' +
            startFence +
            '\n' +
            (node.firstChild ? node.firstChild.textContent : '') +
            endFence +
            '\n\n'
          );
        }
        return node.isBlock ? '\n\n' : '';
      },
    };
    this.service = new TurndownService({
      ...this.defaultOptions,
      ...options,
    });
    applyListRule(this.service);
    applyHrRule(this.service);
    applyParagraphRule(this.service);
    applyHeadingRule(this.service);
    applyFenceRule(this.service);
  }

  HTMLToMD(html: string) {
    return this.service.turndown.call(this.service, html);
  }
}
