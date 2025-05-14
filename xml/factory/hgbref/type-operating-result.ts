import { object, picklist, strictTuple } from 'valibot';
import { success } from '../../../result/index.ts';
import type { XmlMapperContext } from '../../mapper/context.ts';
import { type Children, HgbrefTypeOperatingResult } from '../../model/hgbref/type-operating-result.ts';
import type { XmlElement } from '../../model/xml/element.ts';
import { BaseFactory } from '../base.ts';

export class HgbrefTypeOperatingResultFactory extends BaseFactory<HgbrefTypeOperatingResult, Children, object> {
  protected override readonly attributeSchema = object({});
  protected override readonly childSchema = strictTuple([picklist(['GKV', 'neutral', 'UKV'])]);

  override async map(element: XmlElement, context: XmlMapperContext) {
    const result = await this.parseElement(element, context);

    if (!result.success) {
      return result;
    }

    return success(new HgbrefTypeOperatingResult(element, result.data.children));
  }
}
