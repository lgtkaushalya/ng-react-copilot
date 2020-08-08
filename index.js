#!/usr/bin/env node
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const CLI = require('clui');
const Spinner = CLI.Spinner;
const minimist = require('minimist');
const files = require('./lib/files');
const inquirer  = require('./lib/inquirer');
const scan  = require('./lib/scan');

clear();

console.log(
  chalk.yellow(
    figlet.textSync('Ng-React Copilot', { horizontalLayout: 'full' })
  )
);

const run = async () => {
    let rootPath = process.argv[2] ? process.argv[2] : process.cwd();
    inquirer.selectScanMode()
        .then(answer => {
            if (answer.mode == 'A single file') {
                inquirer.askAFileToScan().then(fileAnswer => {
                    scan.scan([fileAnswer.filePath]);
                });
            } else {
                if (files.directoryExists(rootPath)) {
                    const status = new Spinner('Scanning for files ...');
                    status.start();
                    const fileList = files.getListOfFilesToAnalyse(rootPath);
                    scan.scan(fileList);
                    status.stop();
                } else {
                    printErrorMessage('Root path does not exists');
                }
            }
        })


    /*


    if (filelist.length) {
        const filesToMigrate = inquirer.selectFilesToMigrate(filelist);
    } else {
        const filesToMigrate = await inquirer.askMigrationFiles();
    }
    console.log(chalk.blue.bgRed.bold(JSON.stringify(filesToMigrate)));*/
};

try {
    run();
} catch (e) {
    printErrorMessage(e.message);
}

function printErrorMessage(message) {
    console.log(chalk.red('Execution terminated due to an error. Error Message: ' + message));
}
