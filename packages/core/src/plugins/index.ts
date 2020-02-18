import Service from '../service';
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
import { applyImageRule } from './image';
import { applyBrRule } from './br';
import { applyStrongRule } from './strong';
import { applyTaskRule } from './taskListItems';

import { isKeep } from '../util/isKeep';

export default (service: Service) => {
  service.use([
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
    applyBrRule,
    applyStrongRule,
    applyImageRule,
    applyTaskRule,
  ]);

  service.keep(node => {
    if (isKeep(service.options, node)) {
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
