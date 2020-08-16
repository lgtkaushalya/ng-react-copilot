module.exports = {
    directiveExists: (fileContent) => {
        if(fileContent.match('\\.\\s*directive\\s*\\(')) {
            return true;
        }
        return false;
    },
    fileContains: (fileContent, searchString) => {
        if(fileContent.match(searchString)) {
            return true;
        }
        return false
    }
}