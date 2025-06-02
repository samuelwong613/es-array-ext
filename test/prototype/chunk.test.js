// Import the chunk function
require('../../dist/prototype/chunk'); 

describe('chunk', () => {
  test('should split array into chunks of specified size', () => {
    const result = [1, 2, 3, 4, 5, 6].chunk(2);
    expect(result).toEqual([[1, 2], [3, 4], [5, 6]]);
  });

  test('should chunk nested arrays when chaining chunk calls', () => {
    const result = [1, 2, 3, 4, 5, 6, 7, 8].chunk(2).chunk(2);
    expect(result).toEqual([[[1, 2], [3, 4]], [[5, 6], [7, 8]]]);
  });

  test('should handle chunking with uneven array', () => {
    const result = [1, 2, 3, 4, 5].chunk(3);
    expect(result).toEqual([[1, 2, 3], [4, 5]]);
  });

  test('should fill in with null when specified', () => {
    const result = [1, 2, 3, 4, 5].chunk(3, ()=>null);
    expect(result).toEqual([[1, 2, 3], [4, 5, null]]);
  });

  test('should use a mapping function for filling in', () => {
    const result = [1, 2, 3, 4, 5].chunk(4, idx => idx + 1);
    expect(result).toEqual([[1, 2, 3, 4], [5, 6, 7, 8]]);
  });

  test('should use a mapping function that takes multiple parameters', () => {
    const result = [1, 2, 3, 4, 5].chunk(4, (idx, offset) => offset);
    expect(result).toEqual([[1, 2, 3, 4], [5, 0, 1, 2]]);
  });

  test('should handle multiple parameters in fill function for uneven chunking', () => {
    const result = [1, 2, 3, 4, 5].chunk(4, (idx, offset, row) => row);
    expect(result).toEqual([[1, 2, 3, 4], [5, 1, 1, 1]]);
  });

  test('should handle multiple parameters in fill function for uneven chunking', () => {
    const result = [1, 2, 3, 4, 5].chunk(4, (idx, offset, row, col) => col);
    expect(result).toEqual([[1, 2, 3, 4], [5, 1, 2, 3]]);
  });

  // Additional tests from the previous examples
  test('should handle empty array', () => {
    const result = [].chunk(2, () => 0);
    expect(result).toEqual([]);
  });

  test('should throw error for non-integer size', () => {
    expect(() => [1, 2, 3].chunk(2.5, () => 0)).toThrow(TypeError);
    expect(() => [1, 2, 3].chunk(-1, () => 0)).toThrow(TypeError);
    expect(() => [1, 2, 3].chunk('size', () => 0)).toThrow(TypeError);
  });

  test('should throw error if fillInFunction is not a function', () => {
    expect(() => [1, 2, 3].chunk(2, 'notAFunction')).toThrow(TypeError);
    expect(() => [1, 2, 3].chunk(2, 123)).toThrow(TypeError);
  });
});