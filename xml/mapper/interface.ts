import type { XmlElement } from '../model/xml/element';
import type { XmlMapperContext } from './context';

export interface XmlMapperPlugin<T> {
  map(element: XmlElement, context: XmlMapperContext): Promise<T | null>;
}
