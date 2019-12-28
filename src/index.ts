import TurndownService from 'turndown';
import { applyListRule } from './plugins/list';
import { applyHrRule } from './plugins/hr';

export class Sitdown {
  defaultOptions: TurndownService.Options;
  service: TurndownService;

  constructor(options?: TurndownService.Options) {
    this.defaultOptions = { headingStyle: 'atx' };
    this.service = new TurndownService({
      ...this.defaultOptions,
      ...options,
    });
    applyListRule(this.service);
    applyHrRule(this.service);
  }

  HTMLToMD(html: string) {
    return this.service.turndown.call(this.service, html);
  }
}
