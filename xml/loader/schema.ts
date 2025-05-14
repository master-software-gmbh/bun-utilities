import type { Cache } from '../../cache';
import { logger } from '../../logging';
import { type Result, error, success } from '../../result';
import { LinkbaseMapperPlugin } from '../mapper/link/plugin';
import { XmlMapper } from '../mapper/mapper';
import { XmlSchemaMapperPlugin } from '../mapper/xs/plugin';
import { XsSchema } from '../model/xs/schema';
import { XsSchemaNormalizer } from '../normalizer';
import type { XmlNormalizerContext } from '../normalizer/context';
import type { NormalizedSchema } from '../normalizer/schema';
import { FastXmlParser } from '../parser/fast-xml/FastXmlParser';
import { XmlMixedResolver } from '../resolver/mixed-resolver';

export class XmlSchemaLoader {
  private readonly filepath: string;
  private readonly resolver: XmlMixedResolver;
  private readonly parser = new FastXmlParser();
  private readonly normalizer = new XsSchemaNormalizer();
  private readonly mapper = new XmlMapper<unknown>([new XmlSchemaMapperPlugin(), new LinkbaseMapperPlugin()]);

  constructor(filepath: string, cache?: Cache<string>) {
    this.filepath = filepath;
    this.resolver = new XmlMixedResolver(cache);
  }

  async load(): Promise<Result<NormalizedSchema, 'invalid_source'>> {
    const result = await this.loadSchema(this.filepath);

    if (!result.success || !(result.data.schema instanceof XsSchema)) {
      return error('invalid_source');
    }

    const schema = await this.normalizer.normalize(result.data.schema, this.context);

    return success(schema);
  }

  get context(): XmlNormalizerContext {
    return {
      base: this.filepath,
      load: this.loadSchema.bind(this),
    };
  }

  private async loadSchema(
    source: string,
    base?: string,
  ): Promise<Result<{ schema: XsSchema; context: XmlNormalizerContext }, 'invalid_source' | 'invalid_data'>> {
    logger.debug('Resolving schema', { source });

    const { data } = await this.resolver.resolve(source, base);

    if (!data) {
      logger.warn('Failed to resolve schema', { source });
      return error('invalid_source');
    }

    const { data: schema } = await this.parseSchema(data.content);

    logger.debug('Parsing schema', { source });

    if (!schema) {
      logger.warn('Failed to parse schema', { source });
      return error('invalid_data');
    }

    return success({
      schema,
      context: {
        base: data.uri,
        load: this.loadSchema.bind(this),
      },
    });
  }

  private async parseSchema(data: string) {
    const result = await this.parser.parse(data);

    if (!result.success) {
      return error('invalid_data');
    }

    const mapResult = await this.mapper.map(result.data.root);

    if (!(mapResult instanceof XsSchema)) {
      return error('invalid_data');
    }

    return success(mapResult);
  }
}
