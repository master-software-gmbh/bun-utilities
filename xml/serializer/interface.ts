import type { XmlDocument } from '../model/xml/document';

export interface XmlSerializer {
  serialize(document: XmlDocument): Promise<string>;
}
