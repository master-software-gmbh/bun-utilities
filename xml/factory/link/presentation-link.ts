import { success } from '../../../result/index.ts';
import type { XmlMapperContext } from '../../mapper/context.ts';
import { LinkPresentationLink } from '../../model/link/presentation-link.ts';
import type { XmlElement } from '../../model/xml/element.ts';
import { XlinkExtendedTypeFactory } from '../xlink/extended-type.ts';

export class LinkPresentationLinkFactory extends XlinkExtendedTypeFactory {
  override async map(element: XmlElement, context: XmlMapperContext) {
    const result = await this.parseElement(element, context);

    if (!result.success) {
      return result;
    }

    return success(new LinkPresentationLink(element, result.data.children, result.data.attributes));
  }
}
