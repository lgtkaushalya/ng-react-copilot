const files = require('./../files');
const contentSearchHelper = require('./../helpers/contentSearchHelper');

module.exports = {
    value: 'consolidateDirective',
    name: 'Consolidate directive code',
    message: 'Directive template code is in a different file',
    instruction: 'Rename the files with same prefix or move into a folder',
    scan: (fileContent, filePath) => {
        if(contentSearchHelper.directiveExists(fileContent)
            && contentSearchHelper.fileContains(fileContent, 'templateUrl')
            && !foundAMatchingTemplate(fileContent, filePath)
        ) {
            return true;
        }
        return false;
    },
    refactor: (fileContent) => {}
}

function foundAMatchingTemplate(fileContent, directiveFilePath) {
    let templatePath = directiveFilePath.replace(/\.directive\.js$/, '') + '.html';
    let templateName = files.getFileName(directiveFilePath).replace(/\.directive\.js$/, '') + '.html';
    if (files.fileExists(templatePath)
        && contentSearchHelper.fileContains(fileContent, templateName)) {
        return true;
    }
    return false;
}