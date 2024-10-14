import os from 'node:os';

const main = async () => {

    let currentDir = os.homedir();
    const myArgs = process.argv.slice(2);
    let username;
    
    if(myArgs.length > 0 && myArgs[0].startsWith("--username=")) {
        username = myArgs[0].split("=")[1];
    }

    if (username) {
        console.log(`Welcome to the File Manager, ${username}!`)
        console.log(`You are currently in ${currentDir}`)
    } else {
        console.log('Input has no username')
    }
};

await main();