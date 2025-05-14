import type { Cache } from '../../cache';
import { type Result, error } from '../../result';
import { XmlFileResolver } from './file-resolver';
import type { XmlSourceResolver } from './interface';
import { XmlUrlResolver } from './url-resolver';

export class XmlMixedResolver implements XmlSourceResolver {
  private readonly resolvers: XmlSourceResolver[];

  constructor(cache?: Cache<string>) {
    this.resolvers = [new XmlUrlResolver(cache), new XmlFileResolver()];
  }

  canResolve(source: string, base?: string): boolean {
    return this.resolvers.some((resolver) => resolver.canResolve(source, base));
  }

  async resolve(source: string, base?: string): Promise<Result<{ uri: string; content: string }, 'invalid_source'>> {
    for (const resolver of this.resolvers) {
      if (resolver.canResolve(source, base)) {
        return resolver.resolve(source, base);
      }
    }

    return error('invalid_source');
  }
}
