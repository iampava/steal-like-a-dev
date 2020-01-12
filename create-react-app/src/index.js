#!/usr/bin/env node

'use strict';

let fs = require('fs');
let path = require('path');
let { exec } = require('child_process');
let { ncp } = require('ncp');
let { version } = require('../package.json');

let { argv } = process;

const GREEN = '\x1b[32m%s\x1b[0m';
const RED = '\x1b[31m%s\x1b[0m';

if (argv.length !== 3) {
    console.error(RED, "Wrong CLI format. Here's the help \n");
    return printHelp();
}

if (argv[2] === '-h' || argv[2] === '-help') {
    return printHelp();
}

createApp(argv[2]);

function createApp(appName) {
    process.stdout.write(`\nCreating a new React app in \x1b[32m ~/${appName} \x1B[0m\n`);

    console.log('1/2: Copying template files...');

    fs.mkdir(`./${appName}`, err => {
        if (err) {
            return console.error(RED, err);
        }

        ncp(path.resolve(`${__dirname}/../template`), `./${appName}`, err => {
            if (err) {
                return console.error(RED, err);
            }

            console.log(GREEN, '✔ Copied template files');
            console.log('2/2: Installing dependencies via NPM...');
            installDeps(appName);
        });
    });
}

function installDeps(appName) {
    fs.readFile(`./${appName}/package.json`, 'utf-8', (err, fileContent) => {
        if (err) {
            return console.error(RED, err);
        }

        const json = JSON.parse(fileContent);
        json.name = appName;
        fs.writeFile(`./${appName}/package.json`, JSON.stringify(json, null, 4), err => {
            if (err) {
                return console.error(RED, err);
            }

            exec(`cd ./${appName} && npm install`, err => {
                if (err) {
                    return console.error(RED, err);
                }
                
                console.log(GREEN, '✔ Dependecies installed');
                console.log(GREEN, '✔ All done!');
            });
        });
    });
}

function printHelp() {
    console.log(`/************* @steal-like-a-dev/create-react-app v${version} ************/`);
    console.log('HOW TO: \n');
    console.log(GREEN, '$ @steal-like-a-dev/create-react-app my-app-name');
    console.log(
        '      -- create a new React started app in a folder called "my-app-name", and install all dependencies via NPM \n'
    );
    console.log(GREEN, '$ @steal-like-a-dev/create-react-app -h | -help');
    console.log('      -- print helper info \n');
    console.log('/*************************/');
}
