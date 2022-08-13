/* eslint-disable no-console */
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

export type TreeFnResilt = { dirs: string[]; files: string[] };

export async function tree(dirPath: string): Promise<TreeFnResilt> {
  if (!dirPath || typeof dirPath !== 'string') {
    throw new Error('Укажите путь до папки');
  }
  const dirs = [];
  const files = [];
  try {
    const filesAndDirs = await readdir(dirPath);
    if (filesAndDirs) {
      await Promise.all(
        filesAndDirs.map(async (name) => {
          const filePath = join(dirPath, name);
          const res = await stat(filePath);
          if (res) {
            if (res.isDirectory()) {
              dirs.push(...[dirPath, filePath]);
              const result = await tree(filePath);
              if (result) {
                dirs.push(...result.dirs);
                files.push(...result.files);
              }
            }
            if (res.isFile()) {
              files.push(filePath);
            }
          }
        }),
      );
    }
  } catch (e) {
    console.log(e);
  }

  return {
    dirs: dirs.filter((item, i) => dirs.indexOf(item) === i),
    files,
  };
}

tree(process.argv[2]).then((res) => {
  console.log(res);
  return res;
});
