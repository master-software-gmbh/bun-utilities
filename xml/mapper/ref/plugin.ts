import { XsStringFactory } from '../../factory/xs/string.ts';
import { XmlNamespaces } from '../../model/namespaces.ts';
import type { XmlElement } from '../../model/xml/element.ts';
import type { XsString } from '../../model/xs/string.ts';
import type { XmlMapperContext } from '../context.ts';
import type { XmlMapperPlugin } from '../interface.ts';

type MapperResult = XsString;

export class RefMapperPlugin implements XmlMapperPlugin<MapperResult> {
  async map(element: XmlElement, context: XmlMapperContext): Promise<MapperResult | null> {
    if (element.namespace?.uri !== XmlNamespaces.XbrlRef) {
      return null;
    }

    const factory = this.getFactory(element);

    if (!factory) {
      return null;
    }

    const { data = null } = await factory.map(element, context);

    return data;
  }

  private getFactory(element: XmlElement) {
    switch (element.name) {
      case 'Name':
      case 'Article':
      case 'IssueDate':
      case 'Paragraph':
      case 'Subparagraph':
      case 'Clause':
      case 'Subclause':
      case 'Number':
      case 'Note':
      case 'Publisher':
        return new XsStringFactory();
    }
  }
}
