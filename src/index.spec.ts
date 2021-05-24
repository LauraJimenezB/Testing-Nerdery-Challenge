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
import fetch from 'node-fetch';
import { mocked } from 'ts-jest/utils';
const { Response } = jest.requireActual('node-fetch');

jest.mock('node-fetch', () => {
  return jest.fn();
});

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

//Test: createRandomProduct
test('if email has the role of "creator", generate a random product', () => {
  const email = 'clark@kent.com';
  const actual = createRandomProduct(email);
  expect(actual).toEqual({
    id: 123,
    name: 'newProduct',
    description: 'This is a random generated product',
    price: 65,
    tags: ['the best material', 'yellow'],
  });
});

test('if email does not have the role of "creator", generate a random product', () => {
  const email = 'bruce@wayne.com';
  expect(() => createRandomProduct(email)).toThrow(
    'You are not allowed to create products',
  );
});

//Test: getStarWarsPlanet
test('it should return star wars planets', async () => {
  const planets = {
    count: 60,
    results: [{ name: 'Tatooine' }, { name: 'Alderaan' }],
  };
  const response = new Response(JSON.stringify(planets));
  mocked(fetch).mockResolvedValueOnce(Promise.resolve(response));
  const actual = await getStarWarsPlanets();
  expect(actual).toEqual({
    count: 60,
    results: [{ name: 'Tatooine' }, { name: 'Alderaan' }],
  });
  expect(fetch).toBeCalledWith('https://swapi.dev/api/planets');
  expect(fetch).toHaveBeenCalledTimes(1);
});

test('it should throw an error: unable to make request', async () => {
  try {
    mocked(fetch).mockRejectedValue(Promise.reject());
    await getStarWarsPlanets();
  } catch (e) {
    expect(e.message).toBe('unable to make request');
  }
});
