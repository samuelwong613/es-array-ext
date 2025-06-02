require('../dist/create');

describe('create', () => {
  test('should create an array of specified size with default mapping', () => {
    const result = Array.create(300);
    expect(result).toEqual(Array.from({ length: 300 }, (_, i) => i));
  });

  test('should create an array with mapping function that doubles each index', () => {
    const result = Array.create(300, num => num * 2);
    expect(result).toEqual(Array.from({ length: 300 }, (_, i) => i * 2));
  });

  test('should create an array with mapping function that checks even numbers', () => {
    const result = Array.create(300, num => num % 2 === 0);
    expect(result).toEqual(Array.from({ length: 300 }, (_, i) => i % 2 === 0));
  });

  test('should throw error for non-integer size', () => {
    expect(() => Array.create()).toThrow(TypeError);
    expect(() => Array.create(true)).toThrow(TypeError);
    expect(() => Array.create(3.5)).toThrow(TypeError);
    expect(() => Array.create(-1)).toThrow(TypeError);
    expect(() => Array.create('300')).toThrow(TypeError);
  });

  test('should throw error for negative size', () => {
    expect(() => Array.create(-10)).toThrow(TypeError);
  });

  test('should throw error if mapping function is not a function', () => {
    expect(() => Array.create(300, 'notAFunction')).toThrow(TypeError);
    expect(() => Array.create(300, 123)).toThrow(TypeError);
  });

  test('should create an empty array when size is 0', () => {
    const result = Array.create(0);
    expect(result).toEqual([]);
  });
});