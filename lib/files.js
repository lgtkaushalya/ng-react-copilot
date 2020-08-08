const fs = require('fs');
const path = require('path');
const _ = require('lodash');

module.exports = {
    getCurrentDirectoryBase: () => {
        return path.basename(process.cwd());
    },

    directoryExists: (filePath) => {
        return fs.existsSync(filePath);
    },

    listFiles: () => {
        const dirents = _.without(fs.readdirSync('.', { withFileTypes: true }), '.git', '.gitignore');
        return dirents
            .filter(dirent => dirent.isFile())
            .map(dirent => dirent.name);
    }

};