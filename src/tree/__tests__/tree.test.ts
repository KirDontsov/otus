/* eslint-disable no-console */
import { readdir } from 'fs/promises';

import { tree } from '..';

jest.mock('fs/promises', () => ({
  readdir: jest.fn(),
}));

const resMock = {
  files: ['foo/f1.txt', 'foo/f2.txt', 'foo/bar/bar1.txt', 'foo/bar/bar2.txt'],
  dirs: ['foo', 'foo/bar', 'foo/bar/baz'],
};

describe('node-tree', () => {
  const { log } = console;
  beforeEach(() => {
    console.log = jest.fn();
  });
  afterAll(() => {
    console.log = log;
  });

  test('node-tree', async () => {
    await tree('foo');
    await expect(readdir).toHaveBeenCalledWith('foo');
  });
  test('node-tree result', async () => {
    const result = await tree('foo');
    await expect(result).toBe(resMock);
  });
});
