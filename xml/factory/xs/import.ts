import { instance, optional, strictObject, strictTuple, string } from 'valibot';
import { success } from '../../../result/index.ts';
import type { XmlMapperContext } from '../../mapper/context.ts';
import type { XmlElement } from '../../model/xml/element.ts';
import { XsAnnotation } from '../../model/xs/annotation.ts';
import { type Attributes, type Children, XsImport } from '../../model/xs/import.ts';
import { BaseFactory } from '../base.ts';

export class XsImportFactory extends BaseFactory<XsImport, Children, Attributes> {
  protected override readonly attributeSchema = strictObject({
    id: optional(string()),
    namespace: optional(string()),
    schemaLocation: optional(string()),
  });

  protected override readonly childSchema = strictTuple([optional(instance(XsAnnotation))]);

  override async map(element: XmlElement, context: XmlMapperContext) {
    const result = await this.parseElement(element, context);

    if (!result.success) {
      return result;
    }

    return success(new XsImport(element, result.data.children, result.data.attributes));
  }
}
