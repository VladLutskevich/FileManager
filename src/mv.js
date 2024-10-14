import fs from 'node:fs';
import path from 'node:path';

export const mv = async (currentDir, pathToFile, pathToNewDir) => {
    const filename = path.basename(pathToFile);
    const fullPathToFile = path.resolve(currentDir, pathToFile);
    const pathDir = path.resolve(currentDir, pathToNewDir, filename);

    const readStream = fs.createReadStream(fullPathToFile);
    const writeStream = fs.createWriteStream(pathDir, { flags: 'wx' });

    readStream.pipe(writeStream);

    readStream.on('end', () => {
        fs.unlink(fullPathToFile, (err) => {
            if (err) {
                console.error(`Operation failed: ${err}`);
            };
        });
    });

    readStream.on('error', (err) => {
        console.error(`Operation failed: ${err}`);
    });
    writeStream.on('error', (err) => {
        console.error(`Operation failed: ${err}`);
    });
};