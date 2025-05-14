import { success } from '../../../result/index.ts';
import type { XmlMapperContext } from '../../mapper/context.ts';
import type { XmlElement } from '../../model/xml/element.ts';
import { XsMaxExclusive } from '../../model/xs/max-exclusive.ts';
import { XsFacetFactory } from './facet.ts';

export class XsMaxExclusiveFactory extends XsFacetFactory {
  override async map(element: XmlElement, context: XmlMapperContext) {
    const result = await this.parseElement(element, context);

    if (!result.success) {
      return result;
    }

    return success(new XsMaxExclusive(element, result.data.children, result.data.attributes));
  }
}
