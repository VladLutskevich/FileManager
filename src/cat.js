import fs from 'node:fs';
import path from 'node:path';

export const cat = async (currentDir, newDir) => {
    const newPath = path.resolve(currentDir, newDir);

    const stream = fs.createReadStream(newPath);

    stream.on('data', (chunk) => {
        console.log(chunk.toString());
    });

    stream.on('error', (err) => {
        console.error(`Operation failed: ${err}`);
    });
};