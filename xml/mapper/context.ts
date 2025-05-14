import type { XmlElement } from '../model/xml/element';

export interface XmlMapperContext {
  mapElements(elements: (string | XmlElement)[]): Promise<unknown[]>;
}
