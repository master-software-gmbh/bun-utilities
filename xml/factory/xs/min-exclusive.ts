import { success } from '../../../result/index.ts';
import type { XmlMapperContext } from '../../mapper/context.ts';
import type { XmlElement } from '../../model/xml/element.ts';
import { XsMinExclusive } from '../../model/xs/min-exclusive.ts';
import { XsFacetFactory } from './facet.ts';

export class XsMinExclusiveFactory extends XsFacetFactory {
  override async map(element: XmlElement, context: XmlMapperContext) {
    const result = await this.parseElement(element, context);

    if (!result.success) {
      return result;
    }

    return success(new XsMinExclusive(element, result.data.children, result.data.attributes));
  }
}
