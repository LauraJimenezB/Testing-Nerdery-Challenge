import {
  isInteger,
  toLowerCase,
  removeDuplicatesFromArray,
  createRandomProduct,
  getStarWarsPlanets,
  createProduct,
} from './index';

// Test: isInteger
test('returns an integer from type number', () => {
  const numberValue: number = 1;
  const actual = isInteger(numberValue);
  expect(actual).toEqual(true);
});

test('returns an integer from type string', () => {
  const stringValue: string = '1';
  const actual = isInteger(stringValue);
  expect(actual).toEqual(false);
});
