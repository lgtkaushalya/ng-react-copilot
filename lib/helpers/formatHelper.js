module.exports = {
    formatHtmlhintErrors: (errors, filePath, fileContent) => {
        let formmattedErrors = {
            filePath: filePath,
            messages: [],
            errorCount: errors.length,
            warningCount: 0,
            fixableErrorCount: 0,
            fixableWarningCount: 0,
            source: fileContent,
        };

        for (let error of errors) {
            formmattedErrors.messages.push({
                ruleId: error.rule.id,
                severity: error.type == 'error' ? 2 : 1,
                message: error.message,
                line: error.line,
                column: error.col,
                nodeType: '',
                endLine: null,
                endColumn: null
            });
        }
        return formmattedErrors;
    }
}