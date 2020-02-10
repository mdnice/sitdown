import TurndownService from '../lib/turndown';

export interface Options extends TurndownService.Options {
  startFence?: string;
  endFence?: string;
  codeDelimiter?: string;
}
