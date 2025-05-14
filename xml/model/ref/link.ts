import { success } from '../../../result';
import { XlinkExtendedTypeFactory } from '../../factory/xlink/extended-type';
import type { XmlMapperContext } from '../../mapper/context';
import { GenLink } from '../gen/link';
import type { XmlElement } from '../xml/element';

export class GenLinkFactory extends XlinkExtendedTypeFactory {
  override async map(element: XmlElement, context: XmlMapperContext) {
    const result = await this.parseElement(element, context);

    if (!result.success) {
      return result;
    }

    return success(new GenLink(element, result.data.children, result.data.attributes));
  }
}
