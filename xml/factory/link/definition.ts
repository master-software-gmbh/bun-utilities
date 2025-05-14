import { object, strictTuple, string } from 'valibot';
import { success } from '../../../result/index.ts';
import type { XmlMapperContext } from '../../mapper/context.ts';
import { type Children, LinkDefinition } from '../../model/link/definition.ts';
import type { XmlElement } from '../../model/xml/element.ts';
import { BaseFactory } from '../base.ts';

export class LinkDefinitionFactory extends BaseFactory<LinkDefinition, Children, object> {
  protected override readonly childSchema = strictTuple([string()]);
  protected override readonly attributeSchema = object({});

  override async map(element: XmlElement, context: XmlMapperContext) {
    const result = await this.parseElement(element, context);

    if (!result.success) {
      return result;
    }

    return success(new LinkDefinition(element, result.data.children));
  }
}
