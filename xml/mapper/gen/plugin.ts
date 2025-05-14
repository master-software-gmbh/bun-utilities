import type { BaseFactory } from '../../factory/base.ts';
import type { GenLink } from '../../model/gen/link.ts';
import { XmlNamespaces } from '../../model/namespaces.ts';
import { GenLinkFactory } from '../../model/ref/link.ts';
import type { XmlElement } from '../../model/xml/element.ts';
import type { XmlMapperContext } from '../context.ts';
import type { XmlMapperPlugin } from '../interface.ts';

type MapperResult = GenLink;

export class GenMapperPlugin implements XmlMapperPlugin<MapperResult> {
  async map(element: XmlElement, context: XmlMapperContext): Promise<MapperResult | null> {
    if (element.namespace?.uri !== XmlNamespaces.XbrlGeneric) {
      return null;
    }

    let factory: BaseFactory<MapperResult, unknown, unknown> | undefined;

    if (element.name === 'link') {
      factory = new GenLinkFactory();
    }

    if (!factory) {
      return null;
    }

    const { data = null } = await factory.map(element, context);

    return data;
  }
}
