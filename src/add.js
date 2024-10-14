import fs from 'node:fs/promises';
import path from 'node:path';

export const add = async (currentDir, newDir) => {
    const newPath = path.resolve(currentDir, newDir);

    fs.writeFile(newPath, '', { flag: 'wx' })
      .catch((err) => {
        console.error(`Operation failed: ${err}`);
      });
};