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

//Test: removeDuplicatesFromArray
test('if parameter is not an array return message', () => {
  expect(() => removeDuplicatesFromArray(1 as any)).toThrow(
    'please provide an array of numbers or strings',
  );
});

test('if there is only one element in the array return the same element', () => {
  const singleElementArray = [1];
  const actual = removeDuplicatesFromArray(singleElementArray);
  expect(actual).toEqual([1]);
});

test('if there is more than one element in the array remove duplicates', () => {
  const multipleElementsArray = [1, 'bye', 2, 'hello', 'bye', 1, 1];
  const actual = removeDuplicatesFromArray(multipleElementsArray);
  expect(actual).toEqual([1, 'bye', 2, 'hello']);
});
