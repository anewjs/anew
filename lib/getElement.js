'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = getElement;
function getElement(query) {
    switch (typeof query === 'undefined' ? 'undefined' : _typeof(query)) {
        case 'string':
            var queryType = query[0];
            var queryName = query.substr(1);

            switch (queryType) {
                case '#':
                    return document.getElementById(queryName);
                case '.':
                    return document.getElementsByClassName(queryName);
                default:
                    return document.querySelector(query);
            }
        default:
            return query;
    }
}