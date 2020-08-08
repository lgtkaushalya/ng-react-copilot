const inquirer = require('inquirer');

module.exports = {
    askMigrationFiles: () => {
        const questions = [
            {
                name: 'template',
                type: 'input',
                message: 'Enter the template name you want to migrate:',
                validate: function( value ) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'The template doesn\'t exist.';
                    }
                }
            },
            {
                name: 'controller',
                type: 'input',
                message: 'Enter the controller name you want to migrate:',
                validate: function(value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'The controller doesn\'t exist.';
                    }
                }
            }
        ];
        return inquirer.prompt(questions);
    },
    selectFilesToMigrate: (filelist) => {
        const questions = [
            {
                type: 'checkbox',
                name: 'ignore',
                message: 'Select the files and/or folders you wish to migrate:',
                choices: filelist,
                default: ['index.js']
            }
        ];
        return inquirer.prompt(questions);
    }


};