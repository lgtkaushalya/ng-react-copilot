const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const glob = require("glob")
const gitignore = require('parse-gitignore');

module.exports = {
    getCurrentDirectoryBase: () => {
        return path.basename(process.cwd());
    },

    directoryExists: (path) => {
        return fs.existsSync(path);
    },
    fileExists: (path) => {
        try {
            return fs.lstatSync(path).isFile();
        } catch (e) {
            return false;
        }
    },
    getListOfFilesToAnalyse: (rootPath) => {
        let globPatternsToIgnore = getListOfFilePatternsToIgnore(rootPath);
        return glob.sync("**/*.{js,html}", { ignore: globPatternsToIgnore, cwd: rootPath });
    },
    readFileContent: (path) => {
        return fs.readFileSync(path, "utf8")
    },
    getFilePath: (directoryPath, filePath) => {
        return directoryPath.replace(/\/$/, '') + '/' + filePath;
    },
    getFileName: (filePath) => {
        return filePath.replace(/^.*[\\\/]/, '');
    }
};

function getListOfFilesToAnalyse(rootPath) {
    let globPatternsToIgnore = getListOfFilePatternsToIgnore(rootPath);
    return glob.sync("**/*.js", { ignore: globPatternsToIgnore, cwd: rootPath });
}

function getListOfFilePatternsToIgnore(rootPath) {
    let globPatternsToIgnore = [];
    let defaultGlobPatternsToIgnore = [
        'node_modules', 'node_modules/**', '**/node_modules', '**/node_modules/**',
        'bower_components', 'bower_components/**', '**/bower_components', '**/bower_components/**',
        '.git', '.git/**', '**/.git', '**/.git/**',
        'e2e', 'e2e/**', '**/e2e', '**/e2e/**', 'README.md',
        '*.spec.js', '*test*.js'
    ];
    globPatternsToIgnore = [...gitignore(rootPath + "/.gitignore"), ...defaultGlobPatternsToIgnore].filter((pattern) => {
        return !pattern.startsWith("!");
    });
    return globPatternsToIgnore;
}