import { array, object, optional, pipe, string, transform, unknown } from 'valibot';
import { success } from '../../../result/index.ts';
import type { XmlMapperContext } from '../../mapper/context.ts';
import type { XmlElement } from '../../model/xml/element.ts';
import { type Attributes, type Children, XsFacet } from '../../model/xs/facet.ts';
import { BaseFactory } from '../base.ts';

export class XsFacetFactory extends BaseFactory<XsFacet, Children, Attributes> {
  protected override readonly childSchema = array(unknown());
  protected override readonly attributeSchema = object({
    value: string(),
    id: optional(string()),
    fixed: optional(pipe(string(), transform<string, boolean>(Boolean)), 'false'),
  });

  override async map(element: XmlElement, context: XmlMapperContext) {
    const result = await this.parseElement(element, context);

    if (!result.success) {
      return result;
    }

    return success(new XsFacet(element, result.data.children, result.data.attributes));
  }
}
