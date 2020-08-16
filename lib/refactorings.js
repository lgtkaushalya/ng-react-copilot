module.exports = [
    require('./refactorings/consolidateDirective'),
    require('./refactorings/ngInclude'),
    require('./refactorings/extractNgControllerAsADirective'),
    require('./refactorings/breakLargeTemplatesIntoDirectives')
];
