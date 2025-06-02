const {arrayCreate} = require('../dist/clean');

describe('create', () => {
  test('should create an array of specified size with default mapping', () => {
    const result = arrayCreate(300);
    expect(result).toEqual(Array.from({ length: 300 }, (_, i) => i));
  });

  test('should create an array with mapping function that doubles each index', () => {
    const result = arrayCreate(300, num => num * 2);
    expect(result).toEqual(Array.from({ length: 300 }, (_, i) => i * 2));
  });

  test('should create an array with mapping function that checks even numbers', () => {
    const result = arrayCreate(300, num => num % 2 === 0);
    expect(result).toEqual(Array.from({ length: 300 }, (_, i) => i % 2 === 0));
  });

  test('should throw error for non-integer size', () => {
    expect(() => arrayCreate()).toThrow(TypeError);
    expect(() => arrayCreate(true)).toThrow(TypeError);
    expect(() => arrayCreate(3.5)).toThrow(TypeError);
    expect(() => arrayCreate(-1)).toThrow(TypeError);
    expect(() => arrayCreate('300')).toThrow(TypeError);
  });

  test('should throw error for negative size', () => {
    expect(() => arrayCreate(-10)).toThrow(TypeError);
  });

  test('should throw error if mapping function is not a function', () => {
    expect(() => arrayCreate(300, 'notAFunction')).toThrow(TypeError);
    expect(() => arrayCreate(300, 123)).toThrow(TypeError);
  });

  test('should create an empty array when size is 0', () => {
    const result = arrayCreate(0);
    expect(result).toEqual([]);
  });
});