import type { XmlNamespace } from './namespace';

export class XmlAttribute {
  name: string;
  value: string;
  namespace?: XmlNamespace;

  constructor(name: string, value: string, namespace?: XmlNamespace) {
    this.name = name;
    this.value = value;
    this.namespace = namespace;
  }
}
