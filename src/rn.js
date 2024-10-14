import fs from 'node:fs/promises';
import path from 'node:path';

export const rn = async (currentDir, curDir, newDir) => {

    const curPath = path.resolve(currentDir, curDir);
    const newPath = path.resolve(currentDir, newDir);

    await fs.rename(curPath, newPath)
      .catch((err) => {
        console.error(`Operation failed: ${err}`);
      });
};