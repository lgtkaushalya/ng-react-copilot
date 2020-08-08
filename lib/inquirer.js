const inquirer = require('inquirer');
const files = require('./files');

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
    selectScanMode: (filelist) => {
        const questions = [
            {
                type: 'list',
                name: 'mode',
                message: 'Select the scan mode:',
                choices: ['All files', 'A single file'],
                default: ['All files']
            }
        ];
        return inquirer.prompt(questions);
    }


};