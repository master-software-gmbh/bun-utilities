import type { Cache } from '../../cache';
import { type Result, success } from '../../result';

export abstract class XmlBaseResolver {
  protected readonly cache: Cache<string> | undefined;

  constructor(cache?: Cache<string>) {
    this.cache = cache;
  }

  async resolve(source: string, base?: string) {
    const uri = this.getUri(source, base);

    let content: string | undefined;

    content = await this.cache?.get(source);

    if (!content) {
      const result = await this.resolveUri(uri);

      if (!result.success) {
        return result;
      }

      content = result.data;
      await this.cache?.set(source, content);
    }

    return success({
      uri: uri,
      content: content,
    });
  }

  protected abstract getUri(source: string, base?: string): string;
  protected abstract resolveUri(uri: string): Promise<Result<string, 'invalid_source'>>;
}
