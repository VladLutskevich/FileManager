import zlib from 'node:zlib';
import { pipeline } from 'stream';
import fs from 'node:fs';
import path from 'node:path';
import { stat } from 'node:fs/promises';

export const compress = async (currentDir, pathToFile, pathToDestDir) => {
    const filename = path.basename(pathToFile);
    const compressedFile = `${filename}.br`;

    const fileToCompressPath = path.resolve(currentDir, pathToFile);
    const fileCompressedPath = path.resolve(currentDir, pathToDestDir, compressedFile);
    const dirCompressedPath = path.resolve(currentDir, pathToDestDir);

    try {
        await stat(fileToCompressPath).then((file) => {
            if (!file.isFile()) {
                throw Error();
            }
        }).catch(() => {
            throw Error(`${fileToCompressPath} is not a file or does not exist.`);
        });

        await stat(dirCompressedPath).then((dir) => {
            if (!dir.isDirectory()) {
                throw Error();
            }
        }).catch(() => {
            throw Error(`${dirCompressedPath} is not a directory or does not exist.`);
        });

        const brotli = zlib.createBrotliCompress();
        const readStream = fs.createReadStream(fileToCompressPath);
        const writeStream = fs.createWriteStream(fileCompressedPath, { flags: 'wx' });

        pipeline(readStream, brotli, writeStream, (err) => {
            if (err) {
                console.error(`Operation failed: ${err}`);
                process.exitCode = 1;
            }
        });
    } catch (err) {
        console.error(`Operation failed: ${err}`);
    }
};