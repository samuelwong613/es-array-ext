export type func<T> = (index: number, size?: number) => T;

/**
 * Create an array with specific size.
 * 
 * @param {number} size
 * - a size of the array
 * 
 * @example
 * arrayCreate(300)   
 * // return [0, 1, 2, ..., 298, 299];
 */
export default function create(size: number): Array<number>;

/**
 * Create an array with specific size and mapping function.
 * 
 * @param {number} size
 * - a size of the array
 * 
 * @param {func<T>} mappingFunction
 * - a mapping function to map the data
 * 
 * @example
 * arrayCreate(300, num => num * 2)   
 * // return [0, 2, 4, ..., 596, 598];
 * arrayCreate(300, num => num % 2 === 0)   
 * // return [true, false, true, ..., false];
 */
export default function create<T>(size: number, mappingFunction?: func<T>): Array<T>;

export default function create<T>(size: number, mappingFunction?: func<T>): Array<T> {
  if (!Number.isInteger(size) || size < 0)
    throw new TypeError('Array.create parameter 1 must be a positive integer');

  if (mappingFunction === undefined)
    mappingFunction = num => num as unknown as T;

  if (typeof mappingFunction !== 'function')
		throw new TypeError('Array.create parameter 2 must be a function');

  const output = [];
  for (let k = 0; k < size; k++)
    output.push(mappingFunction(k, size));
  return output;
}