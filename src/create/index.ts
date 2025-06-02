import { extendProperty } from '../_helper';
import create, {func} from './create';

declare global {
  interface ArrayConstructor {
    /**
     * Create an array with specific size.
     * 
     * @param {number} size
     * - a size of the array
     *  
     * @example
     * Array.create(300)   
     * // return [0, 1, 2, ..., 298, 299];
     */
    create(size: number): Array<number>;

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
     * Array.create(300, num => num * 2)   
     * // return [0, 2, 4, ..., 596, 598];
     * Array.create(300, num => num % 2 === 0)   
     * // return [true, false, true, ..., false];
     */
    create<T>(size: number, mappingFunction: func<T>): Array<T>;
  }
}

extendProperty(create,{functionName: 'create'});