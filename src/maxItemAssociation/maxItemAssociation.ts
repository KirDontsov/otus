const input: string[][] = [
  ['q', 'w', 'a'],
  ['a', 'b'],
  ['a', 'c'],
  ['q', 'e'],
  ['q', 'r'],
];

function getUnique<T extends string>(array: T[]): string[] {
  return array.filter((item: T, i: number) => array.indexOf(item) === i);
}

function getDuplicates<T extends string>(array: T[]): string[] {
  return array.filter((item: T, i: number) => array.indexOf(item) !== i);
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

  return getUnique(rawResult.flat()).sort();
}

maxItemAssociation(input);
