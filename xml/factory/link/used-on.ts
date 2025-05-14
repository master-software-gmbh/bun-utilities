import { array, intersect, object, strictTuple, string } from 'valibot';
import { success } from '../../../result/index.ts';
import type { XmlMapperContext } from '../../mapper/context.ts';
import { type Children, LinkUsedOn } from '../../model/link/used-on.ts';
import type { XmlElement } from '../../model/xml/element.ts';
import { BaseFactory } from '../base.ts';

export class LinkUsedOnFactory extends BaseFactory<LinkUsedOn, Children, object> {
  protected override readonly childSchema = intersect([strictTuple([string()]), array(string())]);
  protected override readonly attributeSchema = object({});

  override async map(element: XmlElement, context: XmlMapperContext) {
    const result = await this.parseElement(element, context);

    if (!result.success) {
      return result;
    }

    return success(new LinkUsedOn(element, result.data.children));
  }
}
