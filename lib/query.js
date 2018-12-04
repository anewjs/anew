'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = query;
function query(el) {
    if (typeof el === 'string') {
        return document.querySelector(el);
    }

    return el;
}