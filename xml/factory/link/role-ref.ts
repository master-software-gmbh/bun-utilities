import { array, literal, never, object, optional, string } from 'valibot';
import { success } from '../../../result/index.ts';
import type { XmlMapperContext } from '../../mapper/context.ts';
import { type Attributes, type Children, LinkRoleRef } from '../../model/link/role-ref.ts';
import type { XmlElement } from '../../model/xml/element.ts';
import { BaseFactory } from '../base.ts';

export class LinkRoleRefFactory extends BaseFactory<LinkRoleRef, Children, Attributes> {
  protected override readonly childSchema = array(never());
  protected override readonly attributeSchema = object({
    href: string(),
    roleURI: string(),
    type: literal('simple'),
    role: optional(string()),
    show: optional(string()),
    title: optional(string()),
    actuate: optional(string()),
    arcrole: optional(string()),
  });

  override async map(element: XmlElement, context: XmlMapperContext) {
    const result = await this.parseElement(element, context);

    if (!result.success) {
      return result;
    }

    return success(new LinkRoleRef(element, result.data.attributes));
  }
}
