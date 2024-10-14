import zlib from 'node:zlib';
import { pipeline } from 'stream';
import fs from 'node:fs';
import path from 'node:path';
import { stat } from 'node:fs/promises';

export const decompress = async (currentDir, pathToFile, pathToDestDir) => {
    const decompressedFilename = path.basename(pathToFile).split('.br')[0];

    const filetoToDecompressPath = path.resolve(currentDir, pathToFile);
    const fileDecompressedPath = path.resolve(currentDir, pathToDestDir, decompressedFilename);
    const dirDecompressedPath = path.resolve(currentDir, pathToDestDir);

    try {
        await stat(filetoToDecompressPath).then((file) => {
            if (!file.isFile()) {
                throw Error();
            }
        }).catch(() => {
            throw Error(`${filetoToDecompressPath} is not a file or does not exist.`);
        });

        await stat(dirDecompressedPath).then((dir) => {
            if (!dir.isDirectory()) {
                throw Error();
            }
        }).catch(() => {
            throw Error(`${dirDecompressedPath} is not a directory or does not exist.`);
        });

        const brotli = zlib.createBrotliDecompress();
        const readStream = fs.createReadStream(filetoToDecompressPath);
        const writeStream = fs.createWriteStream(fileDecompressedPath, { flags: 'wx' });

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