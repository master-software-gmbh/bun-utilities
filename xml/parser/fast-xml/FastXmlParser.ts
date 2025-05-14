import { loadModule } from '../../../esm';
import { type Result, error, success } from '../../../result';
import { XmlNamespaces } from '../../model/namespaces';
import { XmlAttribute } from '../../model/xml/attribute';
import { XmlDocument } from '../../model/xml/document';
import { XmlElement } from '../../model/xml/element';
import { XmlNamespace } from '../../model/xml/namespace';
import type { XmlParser } from '../interface';
import type { FastXmlParserObject, NamespaceMap } from './types';

export class FastXmlParser implements XmlParser {
  private readonly defaultNamespaces: NamespaceMap = {
    xml: new XmlNamespace(XmlNamespaces.Xml),
  };

  async parse(xml: string): Promise<Result<XmlDocument, 'invalid_root_element'>> {
    const { data: module } = await loadModule<typeof import('fast-xml-parser')>('fast-xml-parser');

    if (!module) {
      throw new Error('Missing dependency fast-xml-parser');
    }

    const fastXmlParser = new module.XMLParser({
      preserveOrder: true,
      parseTagValue: false,
      attributeNamePrefix: '',
      ignoreAttributes: false,
      ignoreDeclaration: true,
      alwaysCreateTextNode: true,
      allowBooleanAttributes: true,
    });

    const [obj]: FastXmlParserObject[] = fastXmlParser.parse(xml);

    if (!obj) {
      return error('invalid_root_element');
    }

    const rootElement = this.parseElement(obj, this.defaultNamespaces);

    if (typeof rootElement === 'string') {
      return error('invalid_root_element');
    }

    return success(new XmlDocument(rootElement));
  }

  private parseElement(from: FastXmlParserObject, namespaces: NamespaceMap): XmlElement | string {
    const { ':@': attributeData = {}, '#text': textContent, ...tags } = from;

    // Element is a plain text node

    if (textContent !== undefined) {
      return textContent;
    }

    const [tag, ...rest] = Object.entries(tags);

    if (!tag) {
      throw new Error('No tag found in XML element');
    }

    if (rest.length > 0) {
      throw new Error('Multiple tags found in XML element');
    }

    // Get new namespaces from parent and attributes

    const newNamespaces = this.getNewNamespaces(namespaces, attributeData);

    // Get the element's attributes

    const attributes: XmlAttribute[] = [];

    for (const [key, value] of Object.entries(attributeData)) {
      if (key === 'xmlns' || key.startsWith('xmlns:')) {
        // Namespace declarations are not treated as attributes
        continue;
      }

      const [name, namespace] = this.parseQualifiedIdentity(key, newNamespaces);
      attributes.push(new XmlAttribute(name, value, namespace));
    }

    // Get the element's name and namespace

    const [tagName, tagContent] = tag;
    const [name, namespace] = this.parseQualifiedIdentity(tagName, newNamespaces, true);

    // Get the element's children

    const children = tagContent.map((child) => this.parseElement(child, newNamespaces));

    return new XmlElement(name, namespace, attributes, children);
  }

  private getNewNamespaces(namespaces: NamespaceMap, attributes: Record<string, string>): NamespaceMap {
    // Copy parent namespace map. New namespaces declared in this element
    // will be added without side effects to the parent namespaces

    const newNamespaces: NamespaceMap = {
      ...namespaces,
    };

    for (const [key, value] of Object.entries(attributes)) {
      if (key.startsWith('xmlns')) {
        const [, name] = key.split(':');

        if (name) {
          // Add new namespace declaration
          newNamespaces[name] = new XmlNamespace(value);
        } else if (key === 'xmlns') {
          // Set the default namespace
          newNamespaces[''] = new XmlNamespace(value);
        }
      }
    }

    return newNamespaces;
  }

  private parseQualifiedIdentity(
    source: string,
    namespaces: NamespaceMap,
    allowDefaultNamespace?: boolean,
  ): [string, XmlNamespace | undefined] {
    const [prefix, name] = source.split(':');

    let namespace: XmlNamespace | undefined;

    if (prefix && name && prefix !== 'xmlns') {
      namespace = namespaces[prefix];
    } else if (allowDefaultNamespace) {
      namespace = namespaces[''];
    }

    return [name ?? source, namespace];
  }
}
