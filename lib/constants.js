const scanMode_Analyze = 'ANALYSE';
const scanMode_Refactor = 'REFACTOR';

const fileMode_All = 'ALL';
const fileMode_Single = 'SINGLE';

const errorMode_All = 'ALL';
const errorMode_Subset = 'SUBSET';

const reportType_Summary = 'SUMMARY';
const reportType_DetailedByErrorType = 'DetailedByErrorType';
const reportType_DetailedByFile = 'DetailedByFile';

module.exports = {
    scanMode_Analyze: scanMode_Analyze,
    scanMode_Refactor: scanMode_Refactor,
    scanModes: [
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
    errorMode_All: errorMode_All,
    errorMode_Subset: errorMode_Subset,
    errorModes: [
        {
            name: 'All errors',
            value : errorMode_All
        },
        {
            name: 'Subset of errors',
            value : errorMode_Subset
        }
    ],
    reportType_Summary: reportType_Summary,
    reportType_DetailedByErrorType: reportType_DetailedByErrorType,
    reportType_DetailedByFile: reportType_DetailedByFile,
    reportTypes: [
        {
            name: 'Summary report',
            value : reportType_Summary
        },
        {
            name: 'Detailed reoprt group by error type',
            value : reportType_DetailedByErrorType
        },
        {
            name: 'Detailed reoprt group by file',
            value : reportType_DetailedByFile
        }
    ]
};