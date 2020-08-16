const files = require('./../files');
const NO_OF_LINES = 50;

module.exports = {
    value: 'breakLargeTemplatesIntoDirectives',
    name: 'Break large templates into directives',
    message: 'Large templates tend to have mixed responsibilities',
    instruction: 'Break the large templates into directives',
    scan: (fileContent, filePath) => {
        if (files.checkFileExtension(filePath, 'html') && files.countNumberOfLines(fileContent) > NO_OF_LINES) {
            return true;
        }
        return false;
    },
    refactor: (fileContent) => {}
}