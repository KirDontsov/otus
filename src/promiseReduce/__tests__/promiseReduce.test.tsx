/* eslint-disable no-console */
import { promiseReduce } from '..';

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

describe('promiseReduce', () => {
  const { log } = console;
  beforeEach(() => {
    console.log = jest.fn();
  });
  afterAll(() => {
    console.log = log;
  });
  test('promiseReduce result and console.log', async () => {
    const result = await promiseReduce([fn1, fn2], reduce, 1);
    expect(console.log).toHaveBeenCalledWith('fn1');
    expect(console.log).toHaveBeenCalledWith('reduce');
    expect(console.log).toHaveBeenCalledWith('fn2');
    expect(console.log).toHaveBeenCalledWith('reduce');
    expect(result).toEqual(2);
  });
});
