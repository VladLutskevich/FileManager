import path from 'node:path';

export const up = (dir) => {
    return path.join(dir, '..');
}