'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) { break; } } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) { _i["return"](); } } finally { if (_d) { throw _e; } } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = composePackages;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function extractPackage(pkg) {
    switch (typeof pkg === 'undefined' ? 'undefined' : _typeof(pkg)) {
        case 'function':
            return [pkg, {}];
        default:
            if (!pkg.wrap) {
                return [pkg.package.wrap, pkg.config || {}];
            }

            return [pkg.wrap, {}];
    }
}

function composePackages(packages, isRoot) {
    if (packages.length === 1) {
        var _extractPackage = extractPackage(packages[0]),
            _extractPackage2 = _slicedToArray(_extractPackage, 2),
            PackageExec = _extractPackage2[0],
            packageConfig = _extractPackage2[1];

        packageConfig.isRoot = isRoot;

        return function (entry) {
            return PackageExec(entry, packageConfig);
        };
    } else {
        return packages.reduce(function (Wrapper, Wrapped) {
            var _extractPackage3 = extractPackage(Wrapper),
                _extractPackage4 = _slicedToArray(_extractPackage3, 2),
                WrapperExec = _extractPackage4[0],
                wrapperConfig = _extractPackage4[1];

            var _extractPackage5 = extractPackage(Wrapped),
                _extractPackage6 = _slicedToArray(_extractPackage5, 2),
                WrappedExec = _extractPackage6[0],
                wrappedConfig = _extractPackage6[1];

            wrapperConfig.isRoot = isRoot;
            wrappedConfig.isRoot = isRoot;

            return function (entry) {
                return WrapperExec(WrappedExec(entry, wrappedConfig), wrapperConfig);
            };
        });
    }
}