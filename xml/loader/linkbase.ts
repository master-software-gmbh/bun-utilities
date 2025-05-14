import type { Cache } from '../../cache';
import { type Result, error, success } from '../../result';
import { GenMapperPlugin } from '../mapper/gen/plugin';
import { HgbrefMapperPlugin } from '../mapper/hgbref/plugin';
import { LinkbaseMapperPlugin } from '../mapper/link/plugin';
import { XmlMapper } from '../mapper/mapper';
import { RefMapperPlugin } from '../mapper/ref/plugin';
import { XmlSchemaMapperPlugin } from '../mapper/xs/plugin';
import { LinkLinkbase } from '../model/link/linkbase';
import { FastXmlParser } from '../parser/fast-xml/FastXmlParser';
import { XmlMixedResolver } from '../resolver/mixed-resolver';

export class LinkbaseLoader {
  private readonly resolver: XmlMixedResolver;
  private readonly parser = new FastXmlParser();
  private readonly mapper = new XmlMapper<unknown>([
    new XmlSchemaMapperPlugin(),
    new LinkbaseMapperPlugin(),
    new HgbrefMapperPlugin(),
    new RefMapperPlugin(),
    new GenMapperPlugin(),
  ]);

  constructor(cache?: Cache<string>) {
    this.resolver = new XmlMixedResolver(cache);
  }

  async load(filepath: string): Promise<Result<LinkLinkbase, 'invalid_source'>> {
    const result = await this.parse(filepath);

    if (!result.success || !(result.data instanceof LinkLinkbase)) {
      return error('invalid_source');
    }

    return success(result.data);
  }

  private async parse(source: string, filepath?: string) {
    const { data } = await this.resolver.resolve(source, filepath);

    if (!data) {
      return error('invalid_source');
    }

    const result = await this.parser.parse(data.content);

    if (!result.success) {
      return error('invalid_source');
    }

    const mapped = await this.mapper.map(result.data.root);

    return success(mapped);
  }
}
