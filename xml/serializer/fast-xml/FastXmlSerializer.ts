import { loadModule } from '../../../esm';
import { logger } from '../../../logging';
import type { XmlAttribute } from '../../model/xml/attribute';
import type { XmlNamespaceDeclaration } from '../../model/xml/declaration';
import type { XmlDocument } from '../../model/xml/document';
import type { XmlElement } from '../../model/xml/element';
import type { XmlNamespace } from '../../model/xml/namespace';
import type { XmlSerializer } from '../interface';
import type { NamespaceMap, XmlObject } from '../types';

export class FastXmlSerializer implements XmlSerializer {
  private readonly textNodeName = '#text';
  private readonly attributeNamePrefix = '';
  private readonly attributesGroupName = ':@';

  async serialize(document: XmlDocument): Promise<string> {
    const { data: module } = await loadModule<typeof import('fast-xml-parser')>('fast-xml-parser');

    if (!module) {
      throw new Error('Missing dependency fast-xml-parser');
    }

    const fastXmlBuilder = new module.XMLBuilder({
      format: true,
      ignoreAttributes: false,
      suppressEmptyNode: true,
      textNodeName: this.textNodeName,
      suppressBooleanAttributes: false,
      attributesGroupName: this.attributesGroupName,
      attributeNamePrefix: this.attributeNamePrefix,
    });

    const obj: XmlObject = {};

    this.serializeElement(obj, document.root);

    return fastXmlBuilder.build(obj);
  }

  private serializeElement(object: XmlObject, element: XmlElement, namespaces: NamespaceMap = {}) {
    const elementObj = {
      [this.textNodeName]: '',
      [this.attributesGroupName]: {} as Record<string, string>,
    };

    const newNamespaces = this.updateNamespaceMap(namespaces, element.declarations);

    for (const declaration of element.declarations) {
      this.addDeclaration(elementObj, declaration);
    }

    for (const attribute of element.attributes) {
      this.addAttribute(elementObj, attribute, newNamespaces);
    }

    for (const child of element.children) {
      this.addChild(elementObj, child, newNamespaces);
    }

    const elementName = this.getQualifiedName(element, newNamespaces);
    const existingElements = object[elementName];

    if (Array.isArray(existingElements)) {
      existingElements.push(elementObj);
    } else {
      object[elementName] = [elementObj];
    }
  }

  private addDeclaration(obj: { [':@']: Record<string, string> }, declaration: XmlNamespaceDeclaration) {
    const attributeName = `${this.attributeNamePrefix}xmlns:${declaration.prefix}`;
    obj[this.attributesGroupName][attributeName] = declaration.namespace.uri;
  }

  private addAttribute(obj: { [':@']: Record<string, string> }, attribute: XmlAttribute, namespaces: NamespaceMap) {
    const qualifiedName = this.getQualifiedName(attribute, namespaces);
    const attributeName = `${this.attributeNamePrefix}${qualifiedName}`;
    obj[this.attributesGroupName][attributeName] = attribute.value;
  }

  private addChild(obj: XmlObject, child: XmlElement | string, namespaces: NamespaceMap) {
    if (typeof child === 'string') {
      obj[this.textNodeName] = child;
    } else {
      this.serializeElement(obj, child, namespaces);
    }
  }

  private getQualifiedName(element: { name: string; namespace?: XmlNamespace }, namespaces: NamespaceMap): string {
    if (element.namespace) {
      const prefix = namespaces[element.namespace.uri];

      if (prefix) {
        return `${prefix}:${element.name}`;
      }

      logger.warn('Missing namespace prefix', {
        namespace: element.namespace.uri,
      });
    }

    return element.name;
  }

  private updateNamespaceMap(namespaces: NamespaceMap, declarations: XmlNamespaceDeclaration[]): NamespaceMap {
    const newNamespaces: NamespaceMap = { ...namespaces };

    for (const declaration of declarations) {
      newNamespaces[declaration.namespace.uri] = declaration.prefix;
    }

    return newNamespaces;
  }
}
