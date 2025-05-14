import { object, picklist, strictTuple } from 'valibot';
import { success } from '../../../result/index.ts';
import type { XmlMapperContext } from '../../mapper/context.ts';
import {
  type Children,
  HgbrefTradeAccountingNotPermittedFor,
} from '../../model/hgbref/trade-accounting-not-permitted-for.ts';
import type { XmlElement } from '../../model/xml/element.ts';
import { BaseFactory } from '../base.ts';

export class HgbrefTradeAccountingNotPermittedForFactory extends BaseFactory<
  HgbrefTradeAccountingNotPermittedFor,
  Children,
  object
> {
  protected override readonly attributeSchema = object({});
  protected override readonly childSchema = strictTuple([
    picklist(['handelsrechtlich', 'handelsrechtlicher Einzelabschluss', 'handelsrechtlicher Konzernabschluss']),
  ]);

  override async map(element: XmlElement, context: XmlMapperContext) {
    const result = await this.parseElement(element, context);

    if (!result.success) {
      return result;
    }

    return success(new HgbrefTradeAccountingNotPermittedFor(element, result.data.children));
  }
}
