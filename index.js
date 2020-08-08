#!/usr/bin/env node
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const CLI = require('clui');
const Spinner = CLI.Spinner;
const minimist = require('minimist');

const files = require('./lib/files');
const inquirer  = require('./lib/inquirer');

clear();

console.log(
  chalk.yellow(
    figlet.textSync('Ng-React Copilot', { horizontalLayout: 'full' })
  )
);

// Read the direct command inputs
const filesToMigrate = minimist(process.argv.slice(2));
if (filesToMigrate._.length > 0) {
    console.log(chalk.blue.bgRed.bold(JSON.stringify(filesToMigrate._)));
}

// Check folder exists
/*if (files.directoryExists('.git')) {
    console.log(chalk.red('Already a Git repository!'));
    process.exit();
}*/

// Run for scan inputs
const run = async () => {
    const status = new Spinner('Scanning for files ...');
    status.start();
    const filelist = files.listFiles();
    await new Promise(r => setTimeout(r, 2000));
    status.stop();

    if (filelist.length) {
        const filesToMigrate = inquirer.selectFilesToMigrate(filelist);
    } else {
        const filesToMigrate = await inquirer.askMigrationFiles();
    }
    console.log(chalk.blue.bgRed.bold(JSON.stringify(filesToMigrate)));
};

run();