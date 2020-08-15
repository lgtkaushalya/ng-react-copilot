module.exports = {
    value: 'ngInclude',
    name: 'Refactor ng-includes',
    message: 'ng-include tag is detected',
    instruction: '',
    scan: (fileContent) => {
        if(fileContent.includes('ng-include')) {
            return true;
        }
        return false;
    },
    refactor: (fileContent) => {}
}