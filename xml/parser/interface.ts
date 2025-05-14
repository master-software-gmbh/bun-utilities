import type { Result } from '../../result';
import type { XmlDocument } from '../model/xml/document';

export interface XmlParser {
  parse(xml: string): Promise<Result<XmlDocument, 'invalid_root_element'>>;
}
