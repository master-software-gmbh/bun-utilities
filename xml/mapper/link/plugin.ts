import { LinkArcroleRefFactory } from '../../factory/link/arcrole-ref.ts';
import { LinkArcroleTypeFactory } from '../../factory/link/arcrole-type.ts';
import { LinkCalculationArcFactory } from '../../factory/link/calculation-arc.ts';
import { LinkCalculationLinkFactory } from '../../factory/link/calculation-link.ts';
import { LinkDefinitionArcFactory } from '../../factory/link/definition-arc.ts';
import { LinkDefinitionLinkFactory } from '../../factory/link/definition-link.ts';
import { LinkDefinitionFactory } from '../../factory/link/definition.ts';
import { LinkDocumentationFactory } from '../../factory/link/documentation.ts';
import { LinkLabelArcFactory } from '../../factory/link/label-arc.ts';
import { LinkLabelLinkFactory } from '../../factory/link/label-link.ts';
import { LinkLabelFactory } from '../../factory/link/label.ts';
import { LinkLinkbaseRefFactory } from '../../factory/link/linkbase-ref.ts';
import { LinkLinkbaseFactory } from '../../factory/link/linkbase.ts';
import { LinkLocFactory } from '../../factory/link/loc.ts';
import { LinkPresentationArcFactory } from '../../factory/link/presentation-arc.ts';
import { LinkPresentationLinkFactory } from '../../factory/link/presentation-link.ts';
import { LinkReferenceArcFactory } from '../../factory/link/reference-arc.ts';
import { LinkReferenceLinkFactory } from '../../factory/link/reference-link.ts';
import { LinkReferenceFactory } from '../../factory/link/reference.ts';
import { LinkRoleRefFactory } from '../../factory/link/role-ref.ts';
import { LinkRoleTypeFactory } from '../../factory/link/role-type.ts';
import { LinkUsedOnFactory } from '../../factory/link/used-on.ts';
import type { LinkArcroleRef } from '../../model/link/arcrole-ref.ts';
import type { LinkArcroleType } from '../../model/link/arcrole-type.ts';
import type { LinkCalculationArc } from '../../model/link/calculation-arc.ts';
import type { LinkCalculationLink } from '../../model/link/calculation-link.ts';
import type { LinkDefinitionArc } from '../../model/link/definition-arc.ts';
import type { LinkDefinitionLink } from '../../model/link/definition-link.ts';
import type { LinkDefinition } from '../../model/link/definition.ts';
import type { LinkDocumentation } from '../../model/link/documentation.ts';
import type { LinkLabelArc } from '../../model/link/label-arc.ts';
import type { LinkLabelLink } from '../../model/link/label-link.ts';
import type { LinkLabel } from '../../model/link/label.ts';
import type { LinkLinkbaseRef } from '../../model/link/linkbase-ref.ts';
import type { LinkLinkbase } from '../../model/link/linkbase.ts';
import type { LinkLoc } from '../../model/link/loc.ts';
import type { LinkPresentationArc } from '../../model/link/presentation-arc.ts';
import type { LinkPresentationLink } from '../../model/link/presentation-link.ts';
import type { LinkReferenceArc } from '../../model/link/reference-arc.ts';
import type { LinkReferenceLink } from '../../model/link/reference-link.ts';
import type { LinkReference } from '../../model/link/reference.ts';
import type { LinkRoleRef } from '../../model/link/role-ref.ts';
import type { LinkRoleType } from '../../model/link/role-type.ts';
import type { LinkUsedOn } from '../../model/link/used-on.ts';
import { XmlNamespaces } from '../../model/namespaces.ts';
import type { XmlElement } from '../../model/xml/element.ts';
import type { XmlMapperContext } from '../context.ts';
import type { XmlMapperPlugin } from '../interface.ts';

type MapperResult =
  | LinkLinkbaseRef
  | LinkRoleType
  | LinkDefinition
  | LinkLinkbase
  | LinkRoleRef
  | LinkPresentationLink
  | LinkDocumentation
  | LinkLoc
  | LinkPresentationArc
  | LinkArcroleRef
  | LinkDefinitionLink
  | LinkDefinitionArc
  | LinkLabelLink
  | LinkLabelArc
  | LinkLabel
  | LinkCalculationLink
  | LinkCalculationArc
  | LinkReferenceLink
  | LinkReferenceArc
  | LinkReference
  | LinkUsedOn
  | LinkArcroleType;

export class LinkbaseMapperPlugin implements XmlMapperPlugin<MapperResult> {
  async map(element: XmlElement, context: XmlMapperContext): Promise<MapperResult | null> {
    if (element.namespace?.uri !== XmlNamespaces.XbrlLinkbase) {
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
      case 'linkbaseRef':
        return new LinkLinkbaseRefFactory();
      case 'roleType':
        return new LinkRoleTypeFactory();
      case 'definition':
        return new LinkDefinitionFactory();
      case 'usedOn':
        return new LinkUsedOnFactory();
      case 'linkbase':
        return new LinkLinkbaseFactory();
      case 'roleRef':
        return new LinkRoleRefFactory();
      case 'presentationLink':
        return new LinkPresentationLinkFactory();
      case 'documentation':
        return new LinkDocumentationFactory();
      case 'loc':
        return new LinkLocFactory();
      case 'presentationArc':
        return new LinkPresentationArcFactory();
      case 'arcroleRef':
        return new LinkArcroleRefFactory();
      case 'definitionLink':
        return new LinkDefinitionLinkFactory();
      case 'definitionArc':
        return new LinkDefinitionArcFactory();
      case 'labelLink':
        return new LinkLabelLinkFactory();
      case 'labelArc':
        return new LinkLabelArcFactory();
      case 'label':
        return new LinkLabelFactory();
      case 'calculationLink':
        return new LinkCalculationLinkFactory();
      case 'calculationArc':
        return new LinkCalculationArcFactory();
      case 'referenceLink':
        return new LinkReferenceLinkFactory();
      case 'referenceArc':
        return new LinkReferenceArcFactory();
      case 'reference':
        return new LinkReferenceFactory();
      case 'arcroleType':
        return new LinkArcroleTypeFactory();
    }
  }
}
