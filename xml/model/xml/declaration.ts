import type { XmlNamespace } from './namespace';

export class XmlNamespaceDeclaration {
  prefix: string;
  namespace: XmlNamespace;

  constructor(prefix: string, namespace: XmlNamespace) {
    this.prefix = prefix;
    this.namespace = namespace;
  }
}
