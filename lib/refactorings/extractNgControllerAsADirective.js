const contentSearchHelper = require('./../helpers/contentSearchHelper');

module.exports = {
    value: 'extractNgControllerAsADirective',
    name: 'Extract ng-controller usages as directives',
    message: 'Behaviors injected using ng-controller are candidates for directives',
    instruction: 'Extract the code under the ng-controller tag as a directive',
    scan: (fileContent, filePath) => {
        if(contentSearchHelper.fileContains(fileContent, 'ng-controller')) {
            return true;
        }
        return false;
    },
    refactor: (fileContent) => {}
}