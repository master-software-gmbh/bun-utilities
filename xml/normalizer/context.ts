import type { Result } from '../../result';
import type { XsSchema } from '../model/xs/schema';

export interface XmlNormalizerContext {
  base: string;
  load: (
    source: string,
    base?: string,
  ) => Promise<
    Result<
      {
        schema: XsSchema;
        context: XmlNormalizerContext;
      },
      'invalid_source' | 'invalid_data'
    >
  >;
}
