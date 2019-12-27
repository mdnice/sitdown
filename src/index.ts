import TurndownService from 'turndown';

const turndownService = new TurndownService({ headingStyle: 'atx' });

export const sitdown = (html: string) => {
  return turndownService.turndown(html);
};
