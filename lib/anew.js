'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Anew = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) { defineProperties(Constructor.prototype, protoProps); } if (staticProps) { defineProperties(Constructor, staticProps); } return Constructor; }; }();

var _reactDom = require('react-dom');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _composePackages = require('./composePackages');

var _composePackages2 = _interopRequireDefault(_composePackages);

var _query = require('./query');

var _query2 = _interopRequireDefault(_query);

var _isArray = require('./isArray');

var _isArray2 = _interopRequireDefault(_isArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Anew = exports.Anew = function () {
    function Anew() {
        var pkgs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        _classCallCheck(this, Anew);

        this.packages = pkgs;
    }

    _createClass(Anew, [{
        key: 'use',
        value: function use(pkg, config) {
            if ((0, _isArray2.default)(pkg)) {
                this.packages = [].concat(_toConsumableArray(this.packages), _toConsumableArray(pkg));
            } else {
                this.packages.push([pkg, config]);
            }

            return this;
        }
    }, {
        key: 'render',
        value: function render(entry, el) {
            if (entry && !el) {
                el = entry;
                entry = undefined;
            }

            var AnewApp = (0, _composePackages2.default)(this.packages, !!el)(entry);

            if (el) {
                (0, _reactDom.render)(_react2.default.createElement(AnewApp, null), (0, _query2.default)(el));
            }

            return AnewApp;
        }
    }]);

    return Anew;
}();

exports.default = new Anew();