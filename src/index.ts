import TurndownService from 'turndown';

export class Sitdown{
  defaultOptions:TurndownService.Options;
  service:TurndownService;

  constructor(options?: TurndownService.Options){
    this.defaultOptions = { headingStyle: 'atx' };
    this.service = new TurndownService({
      ...this.defaultOptions,
      ...options
    });
  }

  HTMLToMD(html:string){
    return this.service.turndown.call(this.service,html)
  }
}