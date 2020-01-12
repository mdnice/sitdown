import applyPlugins from './plugins';
import { blankReplacement } from './util';
import TurndownService from '../lib/turndown';

export class Sitdown {
  defaultOptions: TurndownService.Options;
  service: TurndownService;

  constructor(options?: TurndownService.Options) {
    this.defaultOptions = {
      headingStyle: 'atx',
      blankReplacement,
    };
    this.service = new TurndownService({
      ...this.defaultOptions,
      ...options,
    });
    applyPlugins(this.service);
  }

  HTMLToMD(html: string) {
    return this.service.turndown.call(this.service, html);
  }
}
