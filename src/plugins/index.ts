import TurndownService from '../../lib/turndown';
// @ts-ignore
import * as turndownPluginGfm from 'turndown-plugin-gfm';
import { applyListRule } from './list';
import { applyHrRule } from './hr';
import { applyParagraphRule } from './paragraph';
import { applyHeadingRule } from './heading';
import { applyFenceRule } from './fencedCodeBlock';
import { applyCodeRule } from './code';
import { applyReferenceLinkRule } from './referenceLinks';
import { applyTableRule } from './table';
import { applyIndentedCodeBlockRule } from './indentedCodeBlock';
import { applyBlockquoteRule } from './blockquote';
import { applyEmRule } from './em';
import { applyDelRule } from './del';
import { applyLinkRule } from './link';

import { isKeep } from '../util/isKeep';
const gfm = turndownPluginGfm.gfm;
const tables = turndownPluginGfm.tables;
const strikethrough = turndownPluginGfm.strikethrough;

export default (turndownService: TurndownService) => {
  // Use the gfm plugin
  turndownService.use(gfm);

  // Use the table and strikethrough plugins only
  turndownService.use([tables, strikethrough]);

  turndownService.use([
    applyListRule,
    applyHrRule,
    applyParagraphRule,
    applyHeadingRule,
    applyFenceRule,
    applyCodeRule,
    applyReferenceLinkRule,
    applyTableRule,
    applyIndentedCodeBlockRule,
    applyBlockquoteRule,
    applyEmRule,
    applyDelRule,
    applyLinkRule,
  ]);

  turndownService.keep(node => {
    if (isKeep(turndownService.options, node)) {
      if (node.parentNode) {
        const index = Array.from(node.parentNode.childNodes).findIndex(
          n => n === node
        );
        const next: ChildNode & { unNeedEscape?: boolean } =
          node.parentNode.childNodes[index + 1];
        next && (next.unNeedEscape = true);
      }
      return true;
    }
    return false;
  });
};
