import { XsAnnotationFactory } from '../../factory/xs/annotation.ts';
import { XsAnyAttributeFactory } from '../../factory/xs/any-attribute.ts';
import { XsAnyFactory } from '../../factory/xs/any.ts';
import { XsAppinfoFactory } from '../../factory/xs/appinfo.ts';
import { XsAttributeGroupFactory } from '../../factory/xs/attribute-group.ts';
import { XsAttributeFactory } from '../../factory/xs/attribute.ts';
import { XsChoiceFactory } from '../../factory/xs/choice.ts';
import { XsComplexContentFactory } from '../../factory/xs/complex-content.ts';
import { XsComplexTypeFactory } from '../../factory/xs/complex-type.ts';
import { XsDocumentationFactory } from '../../factory/xs/documentation.ts';
import { XsElementFactory } from '../../factory/xs/element.ts';
import { XsEnumerationFactory } from '../../factory/xs/enumeration.ts';
import { XsExtensionFactory } from '../../factory/xs/extension.ts';
import { XsImportFactory } from '../../factory/xs/import.ts';
import { XsIncludeFactory } from '../../factory/xs/include.ts';
import { XsLengthFactory } from '../../factory/xs/length.ts';
import { XsMaxExclusiveFactory } from '../../factory/xs/max-exclusive.ts';
import { XsMaxLengthFactory } from '../../factory/xs/max-length.ts';
import { XsMinExclusiveFactory } from '../../factory/xs/min-exclusive.ts';
import { XsMinLengthFactory } from '../../factory/xs/min-length.ts';
import { XsPatternFactory } from '../../factory/xs/pattern.ts';
import { XsRestrictionFactory } from '../../factory/xs/restriction.ts';
import { XsSchemaFactory } from '../../factory/xs/schema.ts';
import { XsSequenceFactory } from '../../factory/xs/sequence.ts';
import { XsSimpleContentFactory } from '../../factory/xs/simple-content.ts';
import { XsSimpleTypeFactory } from '../../factory/xs/simple-type.ts';
import { XsTotalDigitsFactory } from '../../factory/xs/total-digits.ts';
import { XsUnionFactory } from '../../factory/xs/union.ts';
import { XmlNamespaces } from '../../model/namespaces.ts';
import type { XmlElement } from '../../model/xml/element.ts';
import type { XsAnnotation } from '../../model/xs/annotation.ts';
import type { XsAnyAttribute } from '../../model/xs/any-attribute.ts';
import type { XsAny } from '../../model/xs/any.ts';
import type { XsAppinfo } from '../../model/xs/appinfo.ts';
import type { XsAttributeGroup } from '../../model/xs/attribute-group.ts';
import type { XsAttribute } from '../../model/xs/attribute.ts';
import type { XsChoice } from '../../model/xs/choice.ts';
import type { XsComplexContent } from '../../model/xs/complex-content.ts';
import type { XsComplexType } from '../../model/xs/complex-type.ts';
import type { XsDocumentation } from '../../model/xs/documentation.ts';
import type { XsElement } from '../../model/xs/element.ts';
import type { XsEnumeration } from '../../model/xs/enumeration.ts';
import type { XsExtension } from '../../model/xs/extension.ts';
import type { XsImport } from '../../model/xs/import.ts';
import type { XsInclude } from '../../model/xs/include.ts';
import type { XsLength } from '../../model/xs/length.ts';
import type { XsMaxExclusive } from '../../model/xs/max-exclusive.ts';
import type { XsMaxLength } from '../../model/xs/max-length.ts';
import type { XsMinExclusive } from '../../model/xs/min-exclusive.ts';
import type { XsMinLength } from '../../model/xs/min-length.ts';
import type { XsPattern } from '../../model/xs/pattern.ts';
import type { XsRestriction } from '../../model/xs/restriction.ts';
import type { XsSchema } from '../../model/xs/schema.ts';
import type { XsSequence } from '../../model/xs/sequence.ts';
import type { XsSimpleContent } from '../../model/xs/simple-content.ts';
import type { XsSimpleType } from '../../model/xs/simple-type.ts';
import type { XsTotalDigits } from '../../model/xs/total-digits.ts';
import type { XsUnion } from '../../model/xs/union.ts';
import type { XmlMapperContext } from '../context.ts';
import type { XmlMapperPlugin } from '../interface.ts';

type MapperResult =
  | XsSchema
  | XsAnnotation
  | XsAppinfo
  | XsImport
  | XsElement
  | XsComplexType
  | XsSimpleType
  | XsSequence
  | XsAttribute
  | XsAttributeGroup
  | XsChoice
  | XsInclude
  | XsRestriction
  | XsDocumentation
  | XsSimpleContent
  | XsExtension
  | XsEnumeration
  | XsPattern
  | XsMinLength
  | XsMaxLength
  | XsTotalDigits
  | XsUnion
  | XsMinExclusive
  | XsMaxExclusive
  | XsAny
  | XsAnyAttribute
  | XsComplexContent
  | XsLength;

export class XmlSchemaMapperPlugin implements XmlMapperPlugin<MapperResult> {
  async map(element: XmlElement, context: XmlMapperContext): Promise<MapperResult | null> {
    if (element.namespace?.uri !== XmlNamespaces.XmlSchema) {
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
      case 'schema':
        return new XsSchemaFactory();
      case 'annotation':
        return new XsAnnotationFactory();
      case 'appinfo':
        return new XsAppinfoFactory();
      case 'import':
        return new XsImportFactory();
      case 'element':
        return new XsElementFactory();
      case 'complexType':
        return new XsComplexTypeFactory();
      case 'simpleType':
        return new XsSimpleTypeFactory();
      case 'sequence':
        return new XsSequenceFactory();
      case 'attribute':
        return new XsAttributeFactory();
      case 'attributeGroup':
        return new XsAttributeGroupFactory();
      case 'choice':
        return new XsChoiceFactory();
      case 'include':
        return new XsIncludeFactory();
      case 'restriction':
        return new XsRestrictionFactory();
      case 'documentation':
        return new XsDocumentationFactory();
      case 'simpleContent':
        return new XsSimpleContentFactory();
      case 'extension':
        return new XsExtensionFactory();
      case 'enumeration':
        return new XsEnumerationFactory();
      case 'pattern':
        return new XsPatternFactory();
      case 'minLength':
        return new XsMinLengthFactory();
      case 'maxLength':
        return new XsMaxLengthFactory();
      case 'totalDigits':
        return new XsTotalDigitsFactory();
      case 'union':
        return new XsUnionFactory();
      case 'minExclusive':
        return new XsMinExclusiveFactory();
      case 'maxExclusive':
        return new XsMaxExclusiveFactory();
      case 'any':
        return new XsAnyFactory();
      case 'anyAttribute':
        return new XsAnyAttributeFactory();
      case 'complexContent':
        return new XsComplexContentFactory();
      case 'length':
        return new XsLengthFactory();
    }
  }
}
