import { error, success } from '../../result';
import { XmlBaseResolver } from './base';
import type { XmlSourceResolver } from './interface';

export class XmlUrlResolver extends XmlBaseResolver implements XmlSourceResolver {
  canResolve(source: string, base?: string): boolean {
    try {
      this.getUri(source, base);
    } catch (error) {
      return false;
    }

    return true;
  }

  protected override getUri(source: string, base?: string): string {
    if (source.startsWith('http://') || source.startsWith('https://')) {
      return source;
    }

    return new URL(source, base).toString();
  }

  override async resolveUri(uri: string) {
    const response = await fetch(uri);

    if (!response.ok) {
      return error('invalid_source');
    }

    return success(await response.text());
  }
}
