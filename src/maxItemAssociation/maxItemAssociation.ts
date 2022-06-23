const input: string[][] = [
  ['q', 'w', 'a'],
  ['a', 'b'],
  ['a', 'c'],
  ['q', 'e'],
  ['q', 'r'],
];

function getUnique<T>(array: T[]): T[] {
  return array.filter((item, i) => array.indexOf(item) === i);
}

function getDuplicates<T>(array: T[]): T[] {
  return array.filter((item, i) => array.indexOf(item) !== i);
}

export function maxItemAssociation(arr: string[][]): string[] {
  const flat: string[] = arr.flat();
  const rawResult: string[][] = [];

  const popularItemsUnique: string[] = getUnique(getDuplicates(flat));

  popularItemsUnique.forEach((uniqItem) => {
    arr.forEach((item) => {
      if (item.includes(uniqItem)) {
        rawResult.push(item);
      }
    });
  });

  if (getUnique(rawResult.flat()).length % 2 === 0) {
    return getUnique(rawResult.flat())
      .sort()
      .slice(0, getUnique(rawResult.flat()).length / 2);
  }

  return getUnique(rawResult.flat()).sort();
}

maxItemAssociation(input);
