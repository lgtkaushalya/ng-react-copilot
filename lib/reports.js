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
    printReport: (scanResults, reportType, refactoringsToScan) => {
        switch(reportType) {
            case constants.reportType_Summary:
                printSummaryReport(scanResults, refactoringsToScan);
                break;
        }
    }
}

function printSummaryReport(scanResults, refactoringsToScan) {
    let summary = {};
    for (let key in scanResults.REFACTORINGS) {
        let refactoringListPerFile = scanResults.REFACTORINGS[key].refactorings;
        for (key2 in refactoringListPerFile) {
            let refactoringCode = refactoringListPerFile[key2];
            if (refactoringCode in summary) {
                summary[refactoringCode] = summary[refactoringCode] + 1;
            } else {
                summary[refactoringCode] = 1;
            }
        }
    }

    console.log();
    let p = new Table({
        title: 'Summary Report',
        columns: [
            { name: 'Description', alignment: 'left'},
            { name: 'Number of files', alignment: 'left'},
            { name: 'Instructions', alignment: 'left'}
        ]
    });

    for (var key in refactoringsToScan) {
        var refactoring = refactoringsToScan[key];
        if (refactoring.value in summary) {
            p.addRow({'Description': refactoring.message, 'Number of files': summary[refactoring.value], 'Instructions': refactoring.instruction});
            if (key != refactoringsToScan.length - 1) {
                p.addRow({'Description': '', 'Number of files': '', 'Instructions': ''});
            }
        }
    }

    p.printTable();
    console.log();
}