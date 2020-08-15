const files = require('./files');

module.exports = {
    scanADirectory: (directoryPath, errorsToScan) => {
        if (files.directoryExists(directoryPath)) {
            let fileList = files.getListOfFilesToAnalyse(directoryPath);
            let scanResults = {ALL: [], ERRORS: []};
            for (filePath of fileList) {
                let scanResult = scan( files.getFilePath(directoryPath, filePath), errorsToScan);
                scanResults.ALL.push(filePath);
                if (scanResult != null) {
                    scanResults.ERRORS.push(scanResult);
                }
            }
            return scanResults;
        } else {
            throw ('Directory path does not exists');
        }
    },
    scanAFile: (filePath, errorsToScan) => {
        let scanResults = {ALL: [], ERRORS: []};
        let scanResult = scan(filePath, errorsToScan);
        scanResults.ALL.push(filePath);
        if (scanResult != null) {
            scanResults.ERRORS.push(scanResult);
        }
        return scanResults;
    }
}

function scan(filePath, errorsToScan) {
    let fileContent = files.readFileContent(filePath);
    let detectedErrorList = [];
    for (var key in errorsToScan) {
        var error = errorsToScan[key];
        if (error.scan(fileContent)) {
            detectedErrorList.push(error.value);
        }
    }
    if (detectedErrorList.length > 0) {
        return {
            file: filePath,
            errors: detectedErrorList
        }
    }
    return null;
}