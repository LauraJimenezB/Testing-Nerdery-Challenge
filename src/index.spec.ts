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

// Test: toLowerCase
test('if string parameter is empty get message', () => {
  const emptyString = '';
  const actual = toLowerCase(emptyString);
  expect(actual).toEqual('Please provide a string');
});

test('string parameter transforms to lower case', () => {
  const stringParameter = 'hELlo';
  const actual = toLowerCase(stringParameter);
  expect(actual).toEqual('hello');
});
