const files = require('./files');

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
        if (scanResult != null) {
            scanResults.REFACTORINGS.push(scanResult);
        }
        return scanResults;
    }
}

function scan(filePath, refactoringsToScan) {
    let fileContent = files.readFileContent(filePath);
    let detectedRefactoringList = [];
    for (var key in refactoringsToScan) {
        var refactoring = refactoringsToScan[key];
        if (refactoring.scan(fileContent, filePath)) {
            detectedRefactoringList.push(refactoring.value);
        }
    }
    if (detectedRefactoringList.length > 0) {
        return {
            file: filePath,
            refactorings: detectedRefactoringList
        }
    }
    return null;
}