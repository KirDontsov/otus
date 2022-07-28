"use strict";
exports.__esModule = true;
exports.getPath = exports.getNthChild = void 0;
function getNthChild(htmlEl) {
    if (!htmlEl.parentElement)
        return htmlEl.tagName.toLowerCase(); // если нет родителя - вернем tag
    // Если родитель есть, ищем, какой по счету в нем искомый ребенок и возвращаем
    var children = Array.from(htmlEl.parentElement.children);
    var index = children.findIndex(function (child) { return child === htmlEl; });
    return "".concat(htmlEl.tagName.toLowerCase(), ":nth-child(").concat(index + 1, ")");
}
exports.getNthChild = getNthChild;
function getPath(htmlEl) {
    // Если есть id возвращаем его
    if (htmlEl.id)
        return "#".concat(htmlEl.id);
    // Ищем, какой элемент по счету в родителе
    var selector = getNthChild(htmlEl);
    // Если есть классы
    if (htmlEl.hasAttribute('class') && htmlEl.className.length)
        selector = "".concat(selector, ".").concat(htmlEl.className.split(' ').join('.'));
    // Идем вверх по дереву и строим цепочку селектов типа div > div, параллельно добавляем классы и id к элементам
    while ((htmlEl = htmlEl.parentElement)) {
        // Если дошли до body, выходим из цикла
        if (htmlEl.tagName === 'BODY') {
            selector = "body>".concat(selector);
            break;
        }
        else {
            var parentSelector = void 0;
            // если есть родитель с id, выходим и начинаем путь с него
            if (htmlEl.id) {
                selector = "#".concat(htmlEl.id, ">").concat(selector);
                break;
            }
            // добавляем nth-child на каждого найденого родителя
            parentSelector = getNthChild(htmlEl);
            // добавляем классы на каждого найденого родителя
            parentSelector = htmlEl.hasAttribute('class')
                ? "".concat(parentSelector, ".").concat(htmlEl.className.split(' ').join('.'))
                : parentSelector;
            selector = "".concat(parentSelector, ">").concat(selector);
        }
    }
    return selector;
}
exports.getPath = getPath;
