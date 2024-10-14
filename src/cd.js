import { stat } from 'node:fs/promises';
import path from 'node:path';

export const cd = async (currentDir, newDir) => {
    const newPath = path.resolve(currentDir, newDir);
    try {
        const statDir = await stat(newPath);
        if (statDir.isFile()) {
            throw Error('This is file, not a directory!');
        }
        return newPath;
    } catch(err) {
        console.error(`Operation failed: ${err}`);
        return currentDir;
    }
};