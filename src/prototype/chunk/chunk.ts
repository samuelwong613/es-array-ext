export type func<T> = (index: number, offset: number, row: number, column: number) => T;

/**
 * Creates an array of elements split into groups the length of size. If array can't be split evenly, the final chunk will be the remaining elements.
 * 
 * @param {Array<T>} array
 * - the original array
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
 export default function chunk<T>(array: Array<T>, size: number, fillInFunction: func<T>): Array<Array<T>> {
	if (array == null)
		throw new TypeError('Array.prototype.chunk called on null or undefined');
	if (!Number.isInteger(size) || size <= 0)
		throw new TypeError('Array.prototype.chunk parameter 1 must be a positive integer');
  if (typeof fillInFunction !== 'function')
    throw new TypeError('Array.prototype.chunk parameter 2 must be a function');

	const fillingInArray = [];
  const missingSize = (size - array.length % size) % size;
  for (let i=0; i<missingSize; i++)
    fillingInArray.push(fillInFunction(array.length+i, i, Math.ceil(array.length/size), i+size-missingSize));	
		
  const newArray = [];
	for (var idx = 0; idx < array.length; idx += size){
		if (idx + size >= array.length){
			newArray.push( array.slice(idx, idx+size).concat(fillingInArray) );			
		}else{
			newArray.push( array.slice(idx, idx+size) );
		}
	}
	return newArray;
}
