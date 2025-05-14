import { array, fallback, literal, object, optional, picklist, pipe, string, transform, union, unknown } from 'valibot';
import { success } from '../../../result/index.ts';
import type { XmlMapperContext } from '../../mapper/context.ts';
import type { XmlElement } from '../../model/xml/element.ts';
import { type Attributes, type Children, XsElement } from '../../model/xs/element.ts';
import { BaseFactory } from '../base.ts';

export class XsElementFactory extends BaseFactory<XsElement, Children, Attributes> {
  protected override readonly childSchema = array(unknown());
  protected override readonly attributeSchema = object({
    id: optional(string()),
    ref: optional(string()),
    type: optional(string()),
    name: optional(string()),
    fixed: optional(string()),
    default: optional(string()),
    substitutionGroup: optional(string()),
    form: optional(picklist(['qualified', 'unqualified'])),
    minOccurs: optional(pipe(string(), transform<string, number>(Number)), '1'),
    abstract: optional(pipe(string(), transform<string, boolean>(Boolean)), 'false'),
    nillable: optional(pipe(string(), transform<string, boolean>(Boolean)), 'false'),
    final: fallback(union([literal('#all'), array(picklist(['extension', 'restriction']))]), []),
    maxOccurs: optional(union([literal('unbounded'), pipe(string(), transform<string, number>(Number))]), '1'),
    block: fallback(union([literal('#all'), array(picklist(['extension', 'restriction', 'substitution']))]), []),
  });

  override async map(element: XmlElement, context: XmlMapperContext) {
    const result = await this.parseElement(element, context);

    if (!result.success) {
      return result;
    }

    return success(new XsElement(element, result.data.children, result.data.attributes));
  }
}
