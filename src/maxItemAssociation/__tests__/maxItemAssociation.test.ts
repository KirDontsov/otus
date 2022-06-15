import { maxItemAssociation } from '../index';

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

describe('maxItemAssociation', () => {
  test('maxItemAssociation with input', () => {
    const result = maxItemAssociation(input);
    expect(result).toEqual(['a', 'b', 'c']);
  });

  test('maxItemAssociation with input2', () => {
    const result = maxItemAssociation(input2);
    expect(result).toEqual(['a', 'b', 'c', 'e', 'q', 'r', 'w']);
  });
});
