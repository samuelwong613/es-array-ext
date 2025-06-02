import { extendPrototype } from '../../_helper';
import _chunk, {func} from './chunk';

declare global {
  interface Array<T> {
    /**
     * Creates an array of elements split into groups the length of size. If array can't be split evenly, the final chunk will be the remaining elements.
     * 
     * @param {number} size
     * - the column size of each row
     * @param {func<T>} fillInFunction
     * - a mapping function to return the element for filling in
     * 
     * @return {Array<Array<T>>} 
     * A new array of chunks
     * 
     * @example
     * [1,2,3,4,5].chunk(3, () => 0)   
     * // return [[1,2,3],[4,5,0]]
     * [1,2,3,4,5].chunk(2, () => null)   
     * // return [[1,2],[3,4],[5,null]]
     */
     chunk(size: number, fillInFunction: func<T>): Array<Array<T>>;
  }
}

function chunk<T>(this: Array<T>, size: number, fillInFunction: func<T>): Array<Array<T>>{
  if (!(this instanceof Array))
    throw TypeError('Array.prototype.chunk called on a non-Array instance');

  return _chunk(this, size, fillInFunction);
}

extendPrototype(chunk);