import { array, instance, object, optional, string, union } from 'valibot';
import { success } from '../../../result/index.ts';
import type { XmlMapperContext } from '../../mapper/context.ts';
import { type Attributes, type Children, LinkArcroleType } from '../../model/link/arcrole-type.ts';
import { LinkDefinition } from '../../model/link/definition.ts';
import { LinkUsedOn } from '../../model/link/used-on.ts';
import type { XmlElement } from '../../model/xml/element.ts';
import { BaseFactory } from '../base.ts';

export class LinkArcroleTypeFactory extends BaseFactory<LinkArcroleType, Children, Attributes> {
  protected override readonly attributeSchema = object({
    arcroleURI: string(),
    id: optional(string()),
    cyclesAllowed: string(),
  });

  protected override readonly childSchema = array(union([instance(LinkDefinition), instance(LinkUsedOn)]));

  override async map(element: XmlElement, context: XmlMapperContext) {
    const result = await this.parseElement(element, context);

    if (!result.success) {
      return result;
    }

    return success(new LinkArcroleType(element, result.data.children, result.data.attributes));
  }
}
