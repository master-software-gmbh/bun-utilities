declare global {
  interface Array<T> {
    /**
     * Returns `true` if the array is empty.
     */
    isEmpty(): boolean;

    /**
     * Returns `true` if the array is not empty.
     */
    isNotEmpty(): this is T & MinLength<T[], 1>;

    /**
     * Returns `true` if the array has at least `length` elements.
     * @param length - The minimum number of elements the array must have.
     * @returns `true` if the array has at least `length` elements.
     */
    lengthAtLeast<L extends number>(length: L): this is T & MinLength<T[], L>;

    /**
     * Shuffles the elements of the array in place.
     * @returns the shuffled array.
     */
    shuffle<T>(): T[];

    /**
     * Transforms the elements of the array using the provided transform function
     * and filters out any `null` or `undefined` values from the result.
     *
     * @param transform - A function that transforms each element of the array.
     * @returns A new array containing the transformed elements, excluding any `null` or `undefined` values.
     */
    compactMap<U = Exclude<T, null | undefined>>(transform?: (element: T) => U | null | undefined): U[];

    /**
     * @see compactMap
     */
    compactMapAsync<U = Exclude<T, null | undefined>>(
      transform?: (element: T) => Promise<U | null | undefined>,
    ): Promise<U[]>;

    /**
     * Maps the elements of the array to the value at `key`
     * @param this
     * @param key
     */
    mapToKey<K extends keyof T>(this: (T & Record<K, unknown>)[], key: K): T[K][];

    /**
     * Calculates the numeric sum of each element's value at `key`
     * @param key
     */
    sum<K extends keyof T>(this: (T & Record<K, number>)[], key: K): number;

    /**
     * Calculates the numeric product of each element in the array.
     */
    product(this: number[]): number | undefined;

    /**
     * Calculates the maximum value in a numeric array.
     * Returns null if the array is empty
     */
    max(this: number[]): number | null;
  }
}

type Indices<L extends number, T extends number[] = []> = T['length'] extends L
  ? T[number]
  : Indices<L, [T['length'], ...T]>;

export type MinLength<T extends readonly unknown[], L extends number> = Pick<Required<T>, Indices<L>>;

Array.prototype.isEmpty = function () {
  return this.length === 0;
};

Array.prototype.isNotEmpty = function <T>(this: unknown[]): this is T & MinLength<T[], 1> {
  return this.length > 0;
};

Array.prototype.lengthAtLeast = function <T, L extends number>(this: T[], length: L): this is T & MinLength<T[], L> {
  return this.length >= length;
};

Array.prototype.shuffle = function () {
  for (let i = this.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [this[i], this[j]] = [this[j], this[i]];
  }

  return this;
};

Array.prototype.compactMap = function <T extends U, U>(
  transform: (element: T) => U | null | undefined = (e) => e,
): U[] {
  return this.reduce((acc, element) => {
    const result = transform(element);

    if (result !== null && result !== undefined) {
      acc.push(result);
    }

    return acc;
  }, []);
};

Array.prototype.compactMapAsync = function <T extends U, U>(
  transform: (element: T) => Promise<U | null | undefined> = async (e) => e,
): Promise<U[]> {
  return this.reduce(async (acc, element) => {
    acc = await acc;

    const result = await transform(element);

    if (result !== null && result !== undefined) {
      acc.push(result);
    }

    return acc;
  }, Promise.resolve([]));
};

Array.prototype.mapToKey = function <T, K extends keyof T>(this: (T & Record<K, unknown>)[], key: K): T[K][] {
  return this.map((element) => element[key]);
};

Array.prototype.sum = function (key) {
  return this.reduce((prev, next) => prev + next[key], 0);
};

Array.prototype.product = function () {
  if (this.length > 0) {
    return this.reduce((previous, next) => previous * next, 1);
  }
};

Array.prototype.max = function () {
  if (this.length > 0) {
    return Math.max(...this);
  }

  return null;
};
