import TurndownService from 'turndown';
// @ts-ignore
import * as turndownPluginGfm from 'turndown-plugin-gfm';
import { applyListRule } from './list';
import { applyHrRule } from './hr';
import { applyParagraphRule } from './paragraph';
import { applyHeadingRule } from './heading';
import { applyFenceRule } from './fencedCodeBlock';
import { applyCodeRule } from './code';
const gfm = turndownPluginGfm.gfm;
const tables = turndownPluginGfm.tables;
const strikethrough = turndownPluginGfm.strikethrough;

export default (turndownService: TurndownService) => {
  turndownService.use([
    applyListRule,
    applyHrRule,
    applyParagraphRule,
    applyHeadingRule,
    applyFenceRule,
    applyCodeRule,
  ]);

  turndownService.keep(['div', 'style']);

  // Use the gfm plugin
  turndownService.use(gfm);

  // Use the table and strikethrough plugins only
  turndownService.use([tables, strikethrough]);
};
