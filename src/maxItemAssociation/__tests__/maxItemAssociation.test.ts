import { maxItemAssociation } from '..';

const input: string[][] = [
  ['a', 'b'],
  ['a', 'c'],
  ['d', 'e'],
];

const input2: string[][] = [
  ['q', 'w', 'a'],
  ['a', 'b'],
  ['a', 'c'],
  ['q', 'e'],
  ['q', 'r'],
];

const input3: string[][] = [
  ['d', 'm'],
  ['a', 'b'],
  ['a', 'c'],
  ['d', 'e'],
];

const input4: string[][] = [
  ['d', 'm'],
  ['a', 'b'],
  ['a', 'c'],
  ['d', 'e'],
  ['d', 'j'],
];

describe('maxItemAssociation', () => {
  test('maxItemAssociation with input', () => {
    const result = maxItemAssociation(input);
    expect(result).toEqual(['a', 'b', 'c']);
  });

  test('maxItemAssociation with input2', () => {
    const result = maxItemAssociation(input2);
    expect(result).toEqual(['a', 'b', 'c', 'e', 'q', 'r', 'w']);
  });
  test('maxItemAssociation with input3', () => {
    const result = maxItemAssociation(input3);
    expect(result).toEqual(['a', 'b', 'c']);
  });
  test('maxItemAssociation with input4', () => {
    const result = maxItemAssociation(input4);
    expect(result).toEqual(['a', 'b', 'c', 'd', 'e', 'j', 'm']);
  });
});
