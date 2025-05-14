import { success } from '../../../result/index.ts';
import type { XmlMapperContext } from '../../mapper/context.ts';
import { LinkCalculationLink } from '../../model/link/calculation-link.ts';
import type { XmlElement } from '../../model/xml/element.ts';
import { XlinkExtendedTypeFactory } from '../xlink/extended-type.ts';

export class LinkCalculationLinkFactory extends XlinkExtendedTypeFactory {
  override async map(element: XmlElement, context: XmlMapperContext) {
    const result = await this.parseElement(element, context);

    if (!result.success) {
      return result;
    }

    return success(new LinkCalculationLink(element, result.data.children, result.data.attributes));
  }
}
