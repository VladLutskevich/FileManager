import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';

export const hash = async (currentDir, pathTofile) => {

    const newPath = path.resolve(currentDir, pathTofile);

    try {
        const readFile = await fs.readFile(newPath);
        const hash = createHash('sha256').update(readFile).digest('hex');
        console.log(`Hash: ${hash}`);
    } catch (err) {
        console.error(`Operation failed: ${err}`);
    }

};