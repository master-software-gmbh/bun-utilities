import type { GenericSchema } from 'valibot';
import { logger } from '../../logging';
import { type Result, error, success } from '../../result';
import type { XmlMapperContext } from '../mapper/context';
import type { XmlElement } from '../model/xml/element';

type ParseResult<C, A> = {
  children: C;
  attributes: A;
};

export abstract class BaseFactory<T, C, A> {
  protected abstract readonly childSchema: GenericSchema<C>;
  protected abstract readonly attributeSchema: GenericSchema<unknown, A>;

  abstract map(
    element: XmlElement,
    context: XmlMapperContext,
  ): Promise<Result<T, 'invalid_children' | 'invalid_attributes'>>;

  async parseElement(
    element: XmlElement,
    context: XmlMapperContext,
  ): Promise<Result<ParseResult<C, A>, 'invalid_children' | 'invalid_attributes'>> {
    const result = await this.attributeSchema['~standard'].validate(element.getAttributes());

    if (result.issues) {
      logger.warn('Element has invalid attributes', {
        name: element.name,
        issues: result.issues,
        namespace: element.namespace?.uri,
      });

      return error('invalid_attributes');
    }

    const children = await context.mapElements(element.children);
    const childResult = await this.childSchema['~standard'].validate(children);

    if (childResult.issues) {
      logger.warn('Element has invalid children', {
        name: element.name,
        namespace: element.namespace?.uri,
      });

      return error('invalid_children');
    }

    return success({
      attributes: result.value,
      children: childResult.value,
    });
  }
}
