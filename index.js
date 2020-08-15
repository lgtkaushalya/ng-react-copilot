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
const constants = require('./lib/constants');
const reports = require('./lib/reports');
const errors = require('./lib/errors');

clear();

console.log(
  chalk.yellow(
    figlet.textSync('Ng-React Copilot', { horizontalLayout: 'full' })
  )
);

const run = async () => {
    try {
        let rootPath = getRootPath();
        inquirer.selectModes().then(answers => {
            try {
                let errorsToScan = getErrorsToScan(answers);
                let scanResults = scanFiles(rootPath, answers, errorsToScan);
                postProcessScanResults(scanResults, answers, errorsToScan);
            } catch (e) {
                printErrorMessage(e.message);
            }
        });
    } catch (e) {
        printErrorMessage(e.message);
    }
};


run();

function getErrorsToScan(answers) {
    let allErrors = errors;
    if (answers.errorMode == constants.errorMode_All) {
        return allErrors;
    } else {
        return allErrors.filter(function(error) {
            return answers.errorTypes.includes(error.value);
        });
    }
}

function scanFiles(rootPath, answers, errorsToScan) {
    let status = new Spinner('Scanning for files ...');
    status.start();
    let scanResults = [];
    if (answers.fileMode == constants.fileMode_Single && 'filePath' in answers) {
        scanResults = scan.scanAFile(answers.filePath, errorsToScan);
    } else {
        scanResults = scan.scanADirectory(rootPath, errorsToScan);
    }
    status.stop();
    return scanResults;
}

function postProcessScanResults(scanResults, answers, errorsToScan) {
    reports.printHighlights(scanResults);

    if (scanResults.ERRORS.length > 0 && answers.scanMode == constants.scanMode_Analyze) {
        console.log(chalk.blue('The scan results are ready to be exported.'));
        inquirer.selectReportType().then(answers => {
            reports.printReport(scanResults, answers.reportType, errorsToScan);
        });
    } else if (answers.scanMode == constants.scanMode_Refactor) {

    }
}

function getRootPath() {
    return process.argv[2] ? process.argv[2] : process.cwd();
}

function printErrorMessage(message) {
    console.log(chalk.red('Execution terminated due to an error. Error Message: ' + message));
}
