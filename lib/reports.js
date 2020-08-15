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
        let numberOfFilesWithErrors = scanResults.ERRORS.length;

        p.addRow({ 'Total': numberOfTotalFiles, 'Passed': numberOfTotalFiles - numberOfFilesWithErrors, 'Refactoring required': numberOfFilesWithErrors});
        p.printTable();
        console.log();
    },
    printReport: (scanResults, reportType, errorsToScan) => {
        switch(reportType) {
            case constants.reportType_Summary:
                printSummaryReport(scanResults, errorsToScan);
                break;
        }
    }
}

function printSummaryReport(scanResults, errorsToScan) {
    let summary = {};
    for (let key in scanResults.ERRORS) {
        let errorListPerFile = scanResults.ERRORS[key].errors;
        for (key2 in errorListPerFile) {
            let errorCode = errorListPerFile[key2];
            if (errorCode in summary) {
                summary[errorCode] = summary[errorCode] + 1;
            } else {
                summary[errorCode] = 1;
            }
        }
    }

    console.log();
    let p = new Table({
        title: 'Summary Report',
        columns: [
            { name: 'Error Code', alignment: 'left'},
            { name: 'Description', alignment: 'left'},
            { name: 'Number of files', alignment: 'left'},
        ]
    });

    for (var key in errorsToScan) {
        var error = errorsToScan[key];
        if (error.value in summary) {
            p.addRow({ 'Error Code': error.value, 'Description': error.message, 'Number of files': summary[error.value]});
        }
    }

    p.printTable();
    console.log();
}