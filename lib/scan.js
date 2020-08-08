module.exports = {
    scan: (files) => {
        for (file of files) {
            scanAFile(file);
        }
    },
}

function scanAFile(filePath) {
    console.log('Scanning file ' + filePath);
}