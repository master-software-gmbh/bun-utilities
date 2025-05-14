import { success } from '../../../result/index.ts';
import type { XmlMapperContext } from '../../mapper/context.ts';
import { LinkLabelLink } from '../../model/link/label-link.ts';
import type { XmlElement } from '../../model/xml/element.ts';
import { XlinkExtendedTypeFactory } from '../xlink/extended-type.ts';

export class LinkLabelLinkFactory extends XlinkExtendedTypeFactory {
  override async map(element: XmlElement, context: XmlMapperContext) {
    const result = await this.parseElement(element, context);

    if (!result.success) {
      return result;
    }

    return success(new LinkLabelLink(element, result.data.children, result.data.attributes));
  }
}
