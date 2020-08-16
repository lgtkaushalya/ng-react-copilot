module.exports = {
    value: 'ngInclude',
    name: 'Refactor ng-includes',
    message: 'ng-include tag is detected',
    instruction: 'Move the included template as a directive',
    scan: (fileContent, filePath) => {
        if(fileContent.includes('ng-include')) {
            return true;
        }
        return false;
    },
    refactor: (fileContent) => {}
}