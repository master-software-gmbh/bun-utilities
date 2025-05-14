import type { Result } from '../../result';

export interface XmlSourceResolver {
  canResolve(source: string, base?: string): boolean;

  resolve(
    source: string,
    base?: string,
  ): Promise<
    Result<
      {
        uri: string;
        content: string;
      },
      'invalid_source'
    >
  >;
}
