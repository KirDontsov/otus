/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
export type AsyncFnResultType = Promise<number>;
export type AsyncFnType = () => AsyncFnResultType;
export type ReduceFnType = (value, name) => number;

const fn1 = (): AsyncFnResultType => {
  console.log('fn1');
  return Promise.resolve(1);
};

const fn2 = (): AsyncFnResultType =>
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
): Promise<number> {
  return asyncFunctions.reduce(
    (acc: AsyncFnResultType, fn) =>
      acc
        .then(async (result) => reduceFn(result, await fn.call(this)))
        .catch((e) => console.warn(`${fn.name} failed with ${e}`)),
    Promise.resolve(initialValue),
  );
}

promiseReduce([fn1, fn2], reduce, 1).then(console.log);
