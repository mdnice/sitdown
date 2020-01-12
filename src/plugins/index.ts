import TurndownService from 'turndown';
import { applyListRule } from './list';
import { applyHrRule } from './hr';
import { applyParagraphRule } from './paragraph';
import { applyHeadingRule } from './heading';
import { applyFenceRule } from './fencedCodeBlock';
import { applyCodeRule } from './code';

export default (turndownService: TurndownService) => {
  turndownService.use([
    applyListRule,
    applyHrRule,
    applyParagraphRule,
    applyHeadingRule,
    applyFenceRule,
    applyCodeRule,
  ]);
};
