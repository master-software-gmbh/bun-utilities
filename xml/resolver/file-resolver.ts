import { dirname, resolve } from 'path';
import { readFile } from 'fs/promises';
import { type Result, error, success } from '../../result';
import { XmlBaseResolver } from './base';
import type { XmlSourceResolver } from './interface';

export class XmlFileResolver extends XmlBaseResolver implements XmlSourceResolver {
  canResolve(source: string): boolean {
    return !source.startsWith('http://') && !source.startsWith('https://');
  }

  protected override getUri(source: string, base?: string): string {
    if (base) {
      return resolve(dirname(base), source);
    }

    return source;
  }

  protected override async resolveUri(uri: string): Promise<Result<string, 'invalid_source'>> {
    try {
      const content = await readFile(uri, 'utf-8');
      return success(content);
    } catch {
      return error('invalid_source');
    }
  }
}
