/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
export type AsyncFnType = () => Promise<number>;
export type ReduceFnType = (value, name) => number;

const fn1 = (): Promise<number> => {
  console.log('fn1');
  return Promise.resolve(1);
};

const fn2 = (): Promise<number> =>
  new Promise((resolve) => {
    console.log('fn2');
    setTimeout(() => resolve(2), 1000);
  });

const reduce = (memo, value) => {
  console.log('reduce');
  return memo * value;
};

export async function promiseReduce(
  asyncFunctions: AsyncFnType[],
  reduceFn: ReduceFnType,
  initialValue,
): Promise<void> {
  let result;
  for (let i = 0; i < asyncFunctions.length; i += 1) {
    try {
      result = reduce(initialValue, await asyncFunctions[i].call(this));
    } catch (e) {
      console.warn(`${asyncFunctions[i].name} failed with ${e}`);
    }
  }
  return Promise.resolve(result);
}
promiseReduce([fn1, fn2], reduce, 1).then(console.log);
