import { array, literal, object, optional, picklist, pipe, string, transform, unknown } from 'valibot';
import { success } from '../../../result/index.ts';
import type { XmlMapperContext } from '../../mapper/context.ts';
import { type Attributes, type Children, LinkCalculationArc } from '../../model/link/calculation-arc.ts';
import type { XmlElement } from '../../model/xml/element.ts';
import { BaseFactory } from '../base.ts';

export class LinkCalculationArcFactory extends BaseFactory<LinkCalculationArc, Children, Attributes> {
  protected override readonly childSchema = array(unknown());
  protected override readonly attributeSchema = object({
    to: string(),
    from: string(),
    arcrole: string(),
    type: literal('arc'),
    show: optional(string()),
    title: optional(string()),
    actuate: optional(string()),
    weight: pipe(string(), transform(Number)),
    order: optional(pipe(string(), transform(Number))),
    use: optional(picklist(['optional', 'prohibited'])),
    priority: optional(pipe(string(), transform(Number))),
  });

  override async map(element: XmlElement, context: XmlMapperContext) {
    const result = await this.parseElement(element, context);

    if (!result.success) {
      return result;
    }

    return success(new LinkCalculationArc(element, result.data.children, result.data.attributes));
  }
}
