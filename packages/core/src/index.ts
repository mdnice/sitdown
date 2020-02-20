import applyPlugins from './plugins';
import { blankReplacement, keepReplacement } from './util';
import Service from './service';
import { Options } from './types';

export class Sitdown {
  defaultOptions: Options;
  service: Service;

  constructor(options?: Options) {
    this.defaultOptions = {
      headingStyle: 'atx',
      blankReplacement,
      keepReplacement,
    };
    this.service = new Service({
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
export type Plugin = (service: Service) => void;
export { default as RootNode } from './service/RootNode';
