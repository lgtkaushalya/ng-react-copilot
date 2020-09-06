const files = require('./files');
const formatHelper = require('./helpers/formatHelper');

module.exports = {
    scanADirectory: (directoryPath, refactoringsToScan) => {
        if (files.directoryExists(directoryPath)) {
            let fileList = files.getListOfFilesToAnalyse(directoryPath);
            let scanResults = {ALL: [], REFACTORINGS: []};
            for (filePath of fileList) {
                let scanResult = scan( files.getFilePath(directoryPath, filePath), refactoringsToScan);
                scanResults.ALL.push(filePath);
                if (scanResult != null) {
                    scanResults.REFACTORINGS.push(scanResult);
                }
            }
            return scanResults;
        } else {
            throw ('Directory path does not exists');
        }
    },
    scanAFile: (filePath, refactoringsToScan) => {
        let scanResults = {ALL: [], REFACTORINGS: []};
        let scanResult = scan(filePath, refactoringsToScan);
        scanResults.ALL.push(filePath);
        if (scanResult.messages.length > 0) {
            scanResults.REFACTORINGS.push(scanResult);
        }
        return scanResults;
    }
}

function scan(filePath, refactoringsToScan) {
    let fileContent = files.readFileContent(filePath);
    let detectedRefactoringList = [];
    var results = [];
    if (files.checkFileExtension(filePath, 'js')) {
        results = global.eslintCli.executeOnText(fileContent, filePath).results.pop();
    } else if (files.checkFileExtension(filePath, 'html')) {
        var rawResults = global.htmlhint.verify(fileContent, global.htmlhintConfig);
        results = formatHelper.formatHtmlhintErrors(rawResults, filePath, fileContent);
    }

    return results;
}