import { url, array, fallback, literal, object, optional, picklist, pipe, string, union, unknown } from 'valibot';
import { success } from '../../../result/index.ts';
import type { XmlMapperContext } from '../../mapper/context.ts';
import type { XmlElement } from '../../model/xml/element.ts';
import { type Attributes, type Children, XsSchema } from '../../model/xs/schema.ts';
import { BaseFactory } from '../base.ts';

export class XsSchemaFactory extends BaseFactory<XsSchema, Children, Attributes> {
  protected override readonly childSchema = array(unknown());
  protected override readonly attributeSchema = object({
    id: optional(string()),
    version: optional(string()),
    targetNamespace: optional(pipe(string(), url())),
    elementFormDefault: fallback(picklist(['qualified', 'unqualified']), 'unqualified'),
    attributeFormDefault: fallback(picklist(['qualified', 'unqualified']), 'unqualified'),
    blockDefault: fallback(union([literal('#all'), array(picklist(['extension', 'restriction', 'substitution']))]), []),
    finalDefault: fallback(
      union([literal('#all'), array(picklist(['extension', 'restriction', 'list', 'union']))]),
      [],
    ),
  });

  override async map(element: XmlElement, context: XmlMapperContext) {
    const result = await this.parseElement(element, context);

    if (!result.success) {
      return result;
    }

    return success(new XsSchema(element, result.data.children, result.data.attributes));
  }
}
