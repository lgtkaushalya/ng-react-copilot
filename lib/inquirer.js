const inquirer = require('inquirer');
const files = require('./files');
const constants = require('./constants');
const errors = require('./errors');

module.exports = {
    askAFileToScan: () => {
        const questions = [
            {
                name: 'filePath',
                type: 'input',
                message: 'Enter the file path to scan:',
                validate: function( value ) {
                    if (value.length && files.fileExists(value)) {
                        return true;
                    } else {
                        return 'Invalid file path';
                    }
                }
            }
        ];
        return inquirer.prompt(questions);
    },
    selectModes: (filelist) => {
        const questions = [
            {
                type: 'list',
                name: 'scanMode',
                message: 'Select the scan mode:',
                choices: constants.scanModes,
                default: constants.scanMode_Analyze
            },
            {
                type: 'list',
                name: 'fileMode',
                message: 'Select the file mode:',
                choices: constants.fileModes,
                default: constants.fileMode_All
            },
            {
                name: 'filePath',
                type: 'input',
                message: 'Enter the file path to scan:',
                validate: function( value ) {
                    if (value.length && files.fileExists(value)) {
                        return true;
                    } else {
                        return 'Invalid file path';
                    }
                },
                when: (answers) => answers.fileMode === constants.fileMode_Single
            },
            {
                type: 'list',
                name: 'errorMode',
                message: 'Select the error mode:',
                choices: constants.errorModes,
                default: constants.errorMode_All
            },
            {
                type: 'checkbox',
                name: 'errorTypes',
                message: 'Select the error types for scan:',
                choices: errors,
                validate: function( value ) {
                    if (value.length > 0) {
                        return true;
                    } else {
                        return 'Error types cannot be empty';
                    }
                },
                when: (answers) => answers.errorMode === constants.errorMode_Subset
            },
        ];
        return inquirer.prompt(questions);
    },
    selectReportType: () => {
        const questions = [
            {
                type: 'list',
                name: 'reportType',
                message: 'Select the report type:',
                choices: constants.reportTypes,
                default: constants.reportType_Summary
            }
        ];
        return inquirer.prompt(questions);
    }
};