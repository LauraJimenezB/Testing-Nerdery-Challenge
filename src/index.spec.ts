import {
  isInteger,
  toLowerCase,
  removeDuplicatesFromArray,
  createRandomProduct,
  createFakeProduct,
  getStarWarsPlanets,
  createProduct,
} from './index';
import { createProductSchema } from './utils/product.schema';
import faker from 'faker';

const goodProduct = {
  name: 'product1',
  description: 'this is a product',
  price: 50,
  tags: ['onSale'],
};

const wrongProductWithID = {
  id: 123456,
  name: 'product2',
  description: 'this is not a good product',
  price: 50,
  tags: ['onSale'],
};

const wrongProductWithMoreTags = {
  name: 'product2',
  description: 'this is not a good product',
  price: 50,
  tags: ['onSale', 'Discount'],
};

faker.datatype.number = jest.fn(() => 123);

faker.commerce.productName = jest.fn(() => 'newProduct');
faker.commerce.productDescription = jest.fn(
  () => 'This is a random generated product',
);
faker.commerce.price = jest.fn(() => 65);
faker.commerce.productMaterial = jest.fn(() => 'the best material');
faker.commerce.color = jest.fn(() => 'yellow');

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

//test: createProduct
test('if product is valid return object with its properties and generated id', () => {
  const actual = createProduct(goodProduct);
  expect(actual).toEqual({
    description: 'this is a product',
    id: faker.datatype.number(),
    name: 'product1',
    price: 50,
    tags: ['onSale'],
  });
});

test('if product is invalid because of ID property return error with error details', () => {
  const isValidValue = createProductSchema.validate(wrongProductWithID);
  const errorDetails = JSON.stringify(isValidValue.error.details);
  expect(() => createProduct(wrongProductWithID)).toThrow(errorDetails);
});

test('if product is invalid because of multiple tags return error with error details', () => {
  const isValidValue = createProductSchema.validate(wrongProductWithMoreTags);
  const errorDetails = JSON.stringify(isValidValue.error.details);
  expect(() => createProduct(wrongProductWithMoreTags)).toThrow(errorDetails);
});

//Test: createFakeProduct
test('generate a product', () => {
  const actual = createFakeProduct();
  expect(actual).toEqual({
    id: 123,
    name: 'newProduct',
    description: 'This is a random generated product',
    price: 65,
    tags: ['the best material', 'yellow'],
  });
});
