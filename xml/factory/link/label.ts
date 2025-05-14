import { array, literal, object, optional, string, unknown } from 'valibot';
import { success } from '../../../result';
import type { XmlMapperContext } from '../../mapper/context';
import { type Attributes, type Children, LinkLabel } from '../../model/link/label';
import type { XmlElement } from '../../model/xml/element';
import { BaseFactory } from '../base';

export class LinkLabelFactory extends BaseFactory<LinkLabel, Children, Attributes> {
  protected override readonly childSchema = array(unknown());
  protected override readonly attributeSchema = object({
    label: string(),
    id: optional(string()),
    role: optional(string()),
    title: optional(string()),
    type: literal('resource'),
  });

  override async map(element: XmlElement, context: XmlMapperContext) {
    const result = await this.parseElement(element, context);

    if (!result.success) {
      return result;
    }

    return success(new LinkLabel(element, result.data.children, result.data.attributes));
  }
}
