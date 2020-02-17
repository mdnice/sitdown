import applyPlugins from './plugins';
import { blankReplacement, keepReplacement } from './util';
import TurndownService from './lib/turndown';
import { Options } from './types';

export class Sitdown {
  defaultOptions: Options;
  service: TurndownService;

  constructor(options?: Options) {
    this.defaultOptions = {
      headingStyle: 'atx',
      blankReplacement,
      keepReplacement,
    };
    this.service = new TurndownService({
      ...this.defaultOptions,
      ...options,
    });
    applyPlugins(this.service);
  }

  HTMLToMD(html: string, env?: object) {
    if (env) {
      this.service.options.env = env;
    }
    return this.service.turndown(html);
  }

  use(plugin: Plugin | Plugin[]) {
    this.service.use(plugin);
    return this;
  }
}

export { default as RootNode } from './lib/RootNode';
