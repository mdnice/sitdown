export interface Options {
  env?: any;
  headingStyle?: 'setext' | 'atx';
  hr?: string;
  br?: string;
  bulletListMarker?: '-' | '+' | '*';
  codeBlockStyle?: 'indented' | 'fenced';
  emDelimiter?: '_' | '*';
  fence?: '```' | '~~~';
  startFence?: '```' | '~~~' | string;
  endFence?: '```' | '~~~' | string;
  codeDelimiter?: string;
  strongDelimiter?: '__' | '**';
  linkStyle?: 'inlined' | 'referenced';
  linkReferenceStyle?: 'full' | 'collapsed' | 'shortcut';

  keepReplacement?: ReplacementFunction;
  blankReplacement?: ReplacementFunction;
  defaultReplacement?: ReplacementFunction;
  keepFilter?: Filter;
  rules?: {
    [key: string]: Rule;
  };
}

export interface Rule {
  references?: string[];
  filter: Filter;
  replacement?: ReplacementFunction;
  append?: () => void;
  unshift?: () => void;
}
export type Filter = TagName | TagName[] | FilterFunction;
export type FilterFunction = (node: HTMLElement, options: Options) => boolean;

export type ReplacementFunction = (
    content: string,
    node: Node,
    options: Options
) => string;

export type TagName = keyof HTMLElementTagNameMap;

export type Node = HTMLElement & {
  unNeedEscape?: boolean;
  data?: string;
  isBlank?: boolean;
  isBlock?: boolean;
  isCode?: boolean;
  flankingWhitespace?: {
    leading: string;
    trailing: string;
  };
};
