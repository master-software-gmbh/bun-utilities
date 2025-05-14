import type { XmlNamespace } from '../../model/xml/namespace';

export type FastXmlParserObject =
  | ({
      '#text': undefined;
      ':@'?: Record<string, string>;
    } & {
      [key: string]: FastXmlParserObject[];
    })
  | {
      ':@': never;
      '#text': string;
    };

export type NamespaceMap = Record<string, XmlNamespace>;
