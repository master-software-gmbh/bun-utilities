import { logger } from '../logging';

/**
 * Function to dynamically load a module
 * @param name module name
 * @returns loaded module
 * @throws {@link Error} module failed to load
 */
export async function loadModule<T>(name: string): Promise<T> {
  try {
    const module = await import(name);

    if ('default' in module) {
      return module.default;
    }

    return module;
  } catch (error) {
    logger.error('Failed to dynamically load module', { name, error });
    throw new Error(`Failed to dynamically load module ${name}`);
  }
}
