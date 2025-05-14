import { HgbrefFiscalRequirementFactory } from '../../factory/hgbref/fiscal-requirement.ts';
import { HgbrefNotPermittedForFactory } from '../../factory/hgbref/not-permitted-for.ts';
import { HgbrefTradeAccountingNotPermittedForFactory } from '../../factory/hgbref/trade-accounting-not-permitted-for.ts';
import { HgbrefTypeOperatingResultFactory } from '../../factory/hgbref/type-operating-result.ts';
import { XsBooleanFactory } from '../../factory/xs/boolean.ts';
import { XsDateFactory } from '../../factory/xs/date.ts';
import type { HgbrefFiscalRequirement } from '../../model/hgbref/fiscal-requirement.ts';
import type { HgbrefFiscalValidSince } from '../../model/hgbref/fiscal-valid-since.ts';
import type { HgbrefFiscalValidThrough } from '../../model/hgbref/fiscal-valid-through.ts';
import type { HgbrefLegalFormEu } from '../../model/hgbref/legal-form-eu.ts';
import type { HgbrefLegalFormKSt } from '../../model/hgbref/legal-form-kst.ts';
import type { HgbrefLegalFormPg } from '../../model/hgbref/legal-form-pg.ts';
import type { HgbrefNotPermittedFor } from '../../model/hgbref/not-permitted-for.ts';
import type { HgbrefOnlyPermittedSobilErgbil } from '../../model/hgbref/only-permitted-sobil-ergbil.ts';
import { ReferenceName } from '../../model/hgbref/reference-name.ts';
import type { HgbrefTradeAccountingNotPermittedFor } from '../../model/hgbref/trade-accounting-not-permitted-for.ts';
import type { HgbrefTypeOperatingResult } from '../../model/hgbref/type-operating-result.ts';
import type { HgbrefValidSince } from '../../model/hgbref/valid-since.ts';
import type { HgbrefValidThrough } from '../../model/hgbref/valid-through.ts';
import { XmlNamespaces } from '../../model/namespaces.ts';
import type { XmlElement } from '../../model/xml/element.ts';
import type { XmlMapperContext } from '../context.ts';
import type { XmlMapperPlugin } from '../interface.ts';

type MapperResult =
  | HgbrefLegalFormPg
  | HgbrefLegalFormKSt
  | HgbrefLegalFormEu
  | HgbrefValidSince
  | HgbrefValidThrough
  | HgbrefTypeOperatingResult
  | HgbrefFiscalRequirement
  | HgbrefFiscalValidSince
  | HgbrefFiscalValidThrough
  | HgbrefNotPermittedFor
  | HgbrefTradeAccountingNotPermittedFor
  | HgbrefOnlyPermittedSobilErgbil;

export class HgbrefMapperPlugin implements XmlMapperPlugin<MapperResult> {
  async map(element: XmlElement, context: XmlMapperContext): Promise<MapperResult | null> {
    if (element.namespace?.uri !== XmlNamespaces.XbrlHgbref) {
      return null;
    }

    const factory = this.getFactory(element);

    if (!factory) {
      return null;
    }

    const { data = null } = await factory.map(element, context);

    return data;
  }

  private getFactory(element: XmlElement) {
    switch (element.name) {
      case ReferenceName.PBV:
      case ReferenceName.KHBV:
      case ReferenceName.legalFormEU:
      case ReferenceName.legalFormPG:
      case ReferenceName.legalFormKst:
      case ReferenceName.relevanceDiFin:
      case ReferenceName.onlyPermittedForSoBilErgBil:
      case ReferenceName.disabledCalcMinClassification:
        return new XsBooleanFactory();
      case ReferenceName.notPermittedFor:
        return new HgbrefNotPermittedForFactory();
      case ReferenceName.typeOperatingResult:
        return new HgbrefTypeOperatingResultFactory();
      case ReferenceName.fiscalRequirement:
        return new HgbrefFiscalRequirementFactory();
      case ReferenceName.ValidSince:
      case ReferenceName.ValidThrough:
      case ReferenceName.fiscalValidSince:
      case ReferenceName.fiscalValidThrough:
        return new XsDateFactory();
      case ReferenceName.tradeAccountingNotPermittedFor:
        return new HgbrefTradeAccountingNotPermittedForFactory();
    }
  }
}
