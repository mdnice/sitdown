// list
import TurndownService from 'turndown';
import { listReplacement } from '../util';

export const applyListRule = (turndownService: TurndownService) => {
  turndownService.addRule('list', {
    filter: 'li',

    replacement: listReplacement,
  });
};
