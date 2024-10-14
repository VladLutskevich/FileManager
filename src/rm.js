import fs from 'node:fs/promises';
import path from 'node:path';

export const rm = async (currentDir, newDir) => {
    const newPath = path.resolve(currentDir, newDir);

    await fs.unlink(newPath).catch((err) => {
        console.error(`Operation failed: ${err}`);
    });
};