const { Table } = require('console-table-printer');
const constants = require('./constants');

module.exports = {
    printHighlights: (scanResults) => {
        console.log();
        let p = new Table({
            title: 'Highlights (Number of files)',
            columns: [
                { name: 'Total', alignment: 'left', color: 'yellow' },
                { name: 'Passed', alignment: 'left', color: 'green' },
                { name: 'Refactoring required', alignment: 'left', color: 'red' },
            ]
        });

        let numberOfTotalFiles = scanResults.ALL.length;
        let numberOfFilesWithRefactorings = scanResults.REFACTORINGS.length;

        p.addRow({ 'Total': numberOfTotalFiles, 'Passed': numberOfTotalFiles - numberOfFilesWithRefactorings, 'Refactoring required': numberOfFilesWithRefactorings});
        p.printTable();
        console.log();
    },
    printReport: (scanResults, reportType) => {
        switch(reportType) {
            case constants.reportType_Summary:
                printSummaryReport(scanResults);
                break;
            case constants.reportType_DetailedByFile:
                printDetailedByFileReport(scanResults);
                break;
        }
    }
}

function printSummaryReport(scanResults) {
    let summary = {};

    for (let detectedRefactorings of scanResults.REFACTORINGS) {
        for (let message of detectedRefactorings.messages) {
            let refactoringCode = message.ruleId;
            if (refactoringCode in summary) {
                summary[refactoringCode].count = summary[refactoringCode].count + 1;
            } else {
                summary[refactoringCode] = {count: 1, message: message.message};
            }
        }
    }


    console.log();
    let p = new Table({
        title: 'Summary Report',
        columns: [
            { name: 'Refactoring Id', alignment: 'left'},
            { name: 'Number of files', alignment: 'left'}
        ]
    });

    for (const refactoring in summary) {
        p.addRow({'Refactoring Id': refactoring, 'Number of files': summary[refactoring].count});
    }

    p.printTable();
    console.log();
}

function printDetailedByFileReport(scanResults) {
    for (let detectedRefactorings of scanResults.REFACTORINGS) {
        var formatter = global.eslintCli.getFormatter();
        console.log(formatter([detectedRefactorings]));
    }
}