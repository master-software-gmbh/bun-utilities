import { object, picklist, strictTuple } from 'valibot';
import { success } from '../../../result/index.ts';
import type { XmlMapperContext } from '../../mapper/context.ts';
import { type Children, HgbrefFiscalRequirement } from '../../model/hgbref/fiscal-requirement.ts';
import type { XmlElement } from '../../model/xml/element.ts';
import { BaseFactory } from '../base.ts';

export class HgbrefFiscalRequirementFactory extends BaseFactory<HgbrefFiscalRequirement, Children, object> {
  protected override readonly attributeSchema = object({});
  protected override readonly childSchema = strictTuple([
    picklist([
      'Mussfeld',
      'Mussfeld, Kontennachweis erwünscht',
      'Rechnerisch notwendig, soweit vorhanden',
      'Summenmussfeld',
    ]),
  ]);

  override async map(element: XmlElement, context: XmlMapperContext) {
    const result = await this.parseElement(element, context);

    if (!result.success) {
      return result;
    }

    return success(new HgbrefFiscalRequirement(element, result.data.children));
  }
}
