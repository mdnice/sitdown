import applyPlugins from './plugins';
import { blankReplacement, keepReplacement } from './util';
import TurndownService from './lib/turndown';
import TurndownServiceType from '@type/turndown';

export class Sitdown {
  defaultOptions: TurndownServiceType.Options;
  service: TurndownServiceType;

  constructor(options?: TurndownServiceType.Options) {
    this.defaultOptions = {
      headingStyle: 'atx',
      blankReplacement,
      keepReplacement,
    };
    // @ts-ignore
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
