const files = require('./../files');
const HTMLtoJSX = require('htmltojsx');
const _ = require('lodash');
const indentString = require('indent-string');

module.exports = {
    value: 'convertDirectiveTemplateToAComponent',
    name: 'Convert directive template to a component',
    instruction: 'Create a React component using an angular directive template',
    refactor: (fileContent, filePath) => {
        let fileName = files.getFileName(filePath);
        let componentName = getTheComponentName(fileName);
        let converter = new HTMLtoJSX({
            createClass: false,
            outputClassName: componentName
        });
        let outputFileContent = converter.convert(fileContent);
        outputFileContent = performAdditionalFormattings(outputFileContent, componentName);
        let outputFilePath = filePath.replace(fileName, '') + componentName + '.js';
        files.writeToFile(outputFileContent, outputFilePath);
    }
}

function performAdditionalFormattings(content, componentName) {
    content = content.replace(/{'{'}{'{'}/g, '{');
    content = content.replace(/{'}'}{'}'}/g, '}');
    content = indentString(content, 6);

    content = 'import React from \'react\'\n' +
        'import { Component } from \'react\'\n' +
        '\n' +
        'class '+ componentName +' extends Component {\n' +
        '  render() {\n' +
        '    return (' +
        '\n' +
        content +
        '\n' +
        '    );\n' +
        '  }\n' +
        '}\n' +
        '\n' +
        'export default ' + componentName+ ';';

    return content;
}

function getTheComponentName(fileName) {
    let componentName = fileName.replace(/\.template\.html$/, '');
    componentName = componentName.replace(/\.html$/, '');
    componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1)

    return _.upperFirst(_.camelCase(componentName + 'Component'));
}