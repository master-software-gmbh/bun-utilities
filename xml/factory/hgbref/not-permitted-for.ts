import { object, picklist, strictTuple } from 'valibot';
import { success } from '../../../result/index.ts';
import type { XmlMapperContext } from '../../mapper/context.ts';
import { type Children, HgbrefNotPermittedFor } from '../../model/hgbref/not-permitted-for.ts';
import type { XmlElement } from '../../model/xml/element.ts';
import { BaseFactory } from '../base.ts';

export class HgbrefNotPermittedForFactory extends BaseFactory<HgbrefNotPermittedFor, Children, object> {
  protected override readonly attributeSchema = object({});
  protected override readonly childSchema = strictTuple([
    picklist(['steuerlich', 'Einreichung an Finanzverwaltung', 'handelsrechtlich']),
  ]);

  override async map(element: XmlElement, context: XmlMapperContext) {
    const result = await this.parseElement(element, context);

    if (!result.success) {
      return result;
    }

    return success(new HgbrefNotPermittedFor(element, result.data.children));
  }
}
