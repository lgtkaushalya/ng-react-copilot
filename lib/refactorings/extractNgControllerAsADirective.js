const contentSearchHelper = require('./../helpers/contentSearchHelper');

module.exports = {
    value: 'extractNgControllerAsADirective',
    name: 'Extract ng-controller usage as a directive',
    message: 'Usage of ng-controller are candidates for directives',
    instruction: 'Extract ng-controller usage as a directive',
    scan: (fileContent, filePath) => {
        if(contentSearchHelper.fileContains(fileContent, 'ng-controller')) {
            return true;
        }
        return false;
    },
    refactor: (fileContent) => {}
}