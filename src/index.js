import os from 'node:os';
import {up} from "./up.js";
import {cd} from "./cd.js";
import {ls} from "./ls.js";

let currentDir;

const printDir = (dir) => {
    process.stdout.write(`You are currently in ${dir}\n`);
};

const onInput = async (data) => {
    const [command, arg1, arg2] = data.toString().trim().split(' ');

    switch (command) {
        case 'up':
            currentDir = up(currentDir);
            printDir(currentDir);
            break;

        case `cd`:
            currentDir = await cd(currentDir, arg1);
            printDir(currentDir);
            break;

        case 'ls':
            await ls(currentDir);
            printDir(currentDir);
            break;
        case '.exit':
            process.exit(0);
            break;
        default:
            console.log(`Invalid command`);
            printDir(currentDir);
            break;
    }
};

const main = async () => {

    currentDir = os.homedir();
    const myArgs = process.argv.slice(2);
    let username;
    
    if(myArgs.length > 0 && myArgs[0].startsWith("--username=")) {
        username = myArgs[0].split("=")[1];
    }

    if (username) {
        console.log(`Welcome to the File Manager, ${username}!`);
        console.log(`You are currently in ${currentDir}`);

        process.stdin.on('data', onInput);

        process.on('SIGINT', () => process.exit(0) );

        process.on('exit', () => {
            console.log(`Thank you for using File Manager, ${username}, goodbye!`);
        });
    } else {
        console.log('Input has no username');
    }
};

await main();