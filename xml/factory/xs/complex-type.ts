import { array, fallback, literal, object, optional, picklist, pipe, string, transform, union, unknown } from 'valibot';
import { success } from '../../../result/index.ts';
import type { XmlMapperContext } from '../../mapper/context.ts';
import type { XmlElement } from '../../model/xml/element.ts';
import { type Attributes, type Children, XsComplexType } from '../../model/xs/complex-type.ts';
import { BaseFactory } from '../base.ts';

export class XsComplexTypeFactory extends BaseFactory<XsComplexType, Children, Attributes> {
  protected override readonly childSchema = array(unknown());
  protected override readonly attributeSchema = object({
    id: optional(string()),
    name: optional(string()),
    mixed: optional(pipe(string(), transform<string, boolean>(Boolean)), 'false'),
    abstract: optional(pipe(string(), transform<string, boolean>(Boolean)), 'false'),
    final: fallback(union([literal('#all'), array(picklist(['extension', 'restriction']))]), []),
    block: fallback(union([literal('#all'), array(picklist(['extension', 'restriction']))]), []),
  });

  override async map(element: XmlElement, context: XmlMapperContext) {
    const result = await this.parseElement(element, context);

    if (!result.success) {
      return result;
    }

    return success(new XsComplexType(element, result.data.children, result.data.attributes));
  }
}
