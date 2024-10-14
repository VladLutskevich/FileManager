import fs from 'node:fs/promises';

function TableModel(name, type) {
    this.name = name;
    this.type = type;
}

export const ls = async (dir) => {
    try {
        const items = await fs.readdir(dir, { withFileTypes: true });
        const tableData = items.sort(el => el.isFile() ? 1 : -1).map(el => new TableModel(el.name, el.isFile() ? 'file' : 'directory'));
        console.table(tableData);
    } catch (err) {
        console.error(`Operation failed: ${err}`);
    }
};