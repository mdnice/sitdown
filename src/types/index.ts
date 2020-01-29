import TurndownService from '@type/turndown';

export interface Options extends TurndownService.Options {
  startFence?: string;
  endFence?: string;
  codeDelimiter?: string;
}
