import { logger } from '../../logging';
import type { XmlElement } from '../model/xml/element';
import type { XmlMapperContext } from './context';
import type { XmlMapperPlugin } from './interface';
import '../../array';

export class XmlMapper<T> {
  private readonly plugins: XmlMapperPlugin<T>[] = [];

  constructor(plugins: XmlMapperPlugin<T>[]) {
    this.plugins = plugins;
  }

  async map(element: XmlElement): Promise<T | null> {
    const context: XmlMapperContext = {
      mapElements: async (elements) =>
        Promise.all(
          await elements.compactMapAsync(async (element) => {
            if (typeof element === 'string') {
              return element;
            }

            return this.map(element);
          }),
        ),
    };

    for (const plugin of this.plugins) {
      const result = await plugin.map(element, context);

      if (result !== null) {
        return result;
      }
    }

    logger.warn('Mapping of element failed', {
      name: element.name,
      namespace: element.namespace?.uri,
    });

    return null;
  }
}
