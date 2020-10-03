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
const refactorings = require('./lib/refactorings');
var CLIEngine = require("eslint").CLIEngine;
global.htmlhint = require("htmlhint").HTMLHint;
global.htmlhintConfig = JSON.parse(files.readFileContent(".htmlhintrc"));
global.eslintCli = new CLIEngine();

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
                if (answers.scanMode == constants.scanMode_Analyze) {
                    let scanResults = scanFiles(rootPath, answers);
                    postProcessScanResults(scanResults, answers);
                } else if(answers.scanMode == constants.scanMode_Refactor) {
                    refactorFile(answers);
                }
            } catch (e) {
                printErrorMessage(e.message);
            }
        });
    } catch (e) {
        printErrorMessage(e.message);
    }
};


run();

function refactorFile(answers) {
    let refactoringsToPerform = getRefactoringsToScan(answers);
    let fileContent = files.readFileContent(answers.filePath);
    if ('filePath' in answers) {
        for (var key in refactoringsToPerform) {
            var refactoring = refactoringsToPerform[key];
            refactoring.refactor(fileContent, answers.filePath);
        }
    }

}
function getRefactoringsToPerform(answers) {
    let allRefactorings = refactorings;
    return allRefactorings.filter(function(refactoring) {
        return answers.refactoring.includes(refactoring.value);
    });
}

function scanFiles(rootPath, answers) {
    let status = new Spinner('Scanning for files ...');
    status.start();
    let scanResults = [];
    if (answers.fileMode == constants.fileMode_Single && 'filePath' in answers) {
        scanResults = scan.scanAFile(answers.filePath);
    } else {
        scanResults = scan.scanADirectory(rootPath);
    }
    status.stop();
    return scanResults;
}

function postProcessScanResults(scanResults, answers) {
    reports.printHighlights(scanResults);

    if (scanResults.REFACTORINGS.length > 0 && answers.scanMode == constants.scanMode_Analyze) {
        console.log(chalk.blue('The scan results are ready to be exported.'));
        inquirer.selectReportType().then(answers => {
            reports.printReport(scanResults, answers.reportType);
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
