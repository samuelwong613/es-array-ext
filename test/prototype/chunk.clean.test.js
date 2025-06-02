// Import the chunk function
const {chunk} = require('../../dist/clean'); 

describe('chunk', () => {
  test('should split array into chunks of specified size', () => {
    const result = chunk([1, 2, 3, 4, 5, 6], 2);
    expect(result).toEqual([[1, 2], [3, 4], [5, 6]]);
  });

  test('should chunk nested arrays when chaining chunk calls', () => {
    const result = chunk(chunk([1, 2, 3, 4, 5, 6, 7, 8], 2), 2);
    expect(result).toEqual([[[1, 2], [3, 4]], [[5, 6], [7, 8]]]);
  });

  test('should handle chunking with uneven array', () => {
    const result = chunk([1, 2, 3, 4, 5], 3);
    expect(result).toEqual([[1, 2, 3], [4, 5]]);
  });

  test('should fill in with null when specified', () => {
    const result = chunk([1, 2, 3, 4, 5], 3, ()=>null);
    expect(result).toEqual([[1, 2, 3], [4, 5, null]]);
  });

  test('should use a mapping function for filling in', () => {
    const result = chunk([1, 2, 3, 4, 5], 4, idx => idx + 1);
    expect(result).toEqual([[1, 2, 3, 4], [5, 6, 7, 8]]);
  });

  test('should use a mapping function that takes multiple parameters', () => {
    const result = chunk([1, 2, 3, 4, 5], 4, (idx, offset) => offset);
    expect(result).toEqual([[1, 2, 3, 4], [5, 0, 1, 2]]);
  });

  test('should handle multiple parameters in fill function for uneven chunking', () => {
    const result = chunk([1, 2, 3, 4, 5], 4, (idx, offset, row) => row);
    expect(result).toEqual([[1, 2, 3, 4], [5, 1, 1, 1]]);
  });

  test('should handle multiple parameters in fill function for uneven chunking', () => {
    const result = chunk([1, 2, 3, 4, 5], 4, (idx, offset, row, col) => col);
    expect(result).toEqual([[1, 2, 3, 4], [5, 1, 2, 3]]);
  });

  // Additional tests from the previous examples
  test('should handle empty array', () => {
    const result = chunk([], 2, () => 0);
    expect(result).toEqual([]);
  });

  test('should throw error for null or undefined array', () => {
    expect(() => chunk(null, 2, () => 0)).toThrow(TypeError);
    expect(() => chunk(undefined, 2, () => 0)).toThrow(TypeError);
  });

  test('should throw error for non-integer size', () => {
    expect(() => chunk([1, 2, 3], 2.5, () => 0)).toThrow(TypeError);
    expect(() => chunk([1, 2, 3], -1, () => 0)).toThrow(TypeError);
    expect(() => chunk([1, 2, 3], 'size', () => 0)).toThrow(TypeError);
  });

  test('should throw error if fillInFunction is not a function', () => {
    expect(() => chunk([1, 2, 3], 2, 'notAFunction')).toThrow(TypeError);
    expect(() => chunk([1, 2, 3], 2, 123)).toThrow(TypeError);
  });
});