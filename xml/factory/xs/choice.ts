import { array, literal, object, optional, pipe, string, transform, union, unknown } from 'valibot';
import { success } from '../../../result/index.ts';
import type { XmlMapperContext } from '../../mapper/context.ts';
import type { XmlElement } from '../../model/xml/element.ts';
import { type Attributes, type Children, XsChoice } from '../../model/xs/choice.ts';
import { BaseFactory } from '../base.ts';

export class XsChoiceFactory extends BaseFactory<XsChoice, Children, Attributes> {
  protected override readonly childSchema = array(unknown());
  protected override readonly attributeSchema = object({
    id: optional(string()),
    minOccurs: optional(pipe(string(), transform<string, number>(Number)), '1'),
    maxOccurs: optional(union([literal('unbounded'), pipe(string(), transform<string, number>(Number))]), '1'),
  });

  override async map(element: XmlElement, context: XmlMapperContext) {
    const result = await this.parseElement(element, context);

    if (!result.success) {
      return result;
    }

    return success(new XsChoice(element, result.data.children, result.data.attributes));
  }
}
