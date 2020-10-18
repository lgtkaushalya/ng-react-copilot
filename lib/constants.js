const scanMode_Analyze = 'ANALYSE';
const scanMode_Refactor = 'REFACTOR';
const scanMode_Extract_Data = 'Extract Data';

const fileMode_All = 'ALL';
const fileMode_Single = 'SINGLE';

const refactoringMode_All = 'ALL';
const refactoringMode_Subset = 'SUBSET';

const reportType_Summary = 'SUMMARY';
const reportType_DetailedByRefactoringType = 'DetailedByRefactoringType';
const reportType_DetailedByFile = 'DetailedByFile';

module.exports = {
    scanMode_Analyze: scanMode_Analyze,
    scanMode_Refactor: scanMode_Refactor,
    scanMode_Extract_Data: scanMode_Extract_Data,
    scanModes: [
        {
            name: 'Extract Data',
            value : scanMode_Extract_Data
        },
        {
            name: 'Analyze',
            value : scanMode_Analyze
        },
        {
            name: 'Refactor',
            value : scanMode_Refactor
        }
    ],
    fileMode_All: fileMode_All,
    fileMode_Single: fileMode_Single,
    fileModes: [
        {
            name: 'All files',
            value : fileMode_All
        },
        {
            name: 'Single file',
            value : fileMode_Single
        }
    ],
    reportType_Summary: reportType_Summary,
    reportType_DetailedByRefactoringType: reportType_DetailedByRefactoringType,
    reportType_DetailedByFile: reportType_DetailedByFile,
    reportTypes: [
        {
            name: 'Summary report',
            value : reportType_Summary
        },
        {
            name: 'Detailed reoprt group by file',
            value : reportType_DetailedByFile
        },
        {
            name: 'Detailed reoprt group by refactoring type',
            value : reportType_DetailedByRefactoringType
        }
    ]
};