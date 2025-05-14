import { logger } from '../../logging';
import type { XsSchema } from '../model/xs/schema';
import type { XmlNormalizerContext } from './context';
import { NormalizedSchema } from './schema';

export class XsSchemaNormalizer {
  private readonly schema: NormalizedSchema;

  constructor() {
    this.schema = new NormalizedSchema();
  }

  async normalize(schema: XsSchema, context: XmlNormalizerContext): Promise<NormalizedSchema> {
    this.schema.addSchema(schema, context.base, schema.targetNamespace);

    // Load referenced schemas

    // <xs:import> elements import schemas with other target namespaces
    for (const { schemaLocation } of schema.imports) {
      if (schemaLocation) {
        await this.handleReference(schemaLocation, context);
      }
    }

    // <xs:include> elements include schemas with the same target namespace
    for (const { schemaLocation } of schema.includes) {
      await this.handleReference(schemaLocation, context, schema.targetNamespace);
    }

    return this.schema;
  }

  private async handleReference(reference: string, context: XmlNormalizerContext, fallbackNamespace?: string) {
    const { data } = await context.load(reference, context.base);

    if (!data) {
      logger.warn('Failed to load referenced schema', { reference });
      return;
    }

    const namespace = data.schema.targetNamespace || fallbackNamespace;

    if (!namespace) {
      logger.warn('Referenced schema has no target namespace', { reference });
      return;
    }

    await this.normalize(data.schema, data.context);
  }
}
