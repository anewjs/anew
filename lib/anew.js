import { render as _render } from 'react-dom';
import React from 'react';
import composePackages from './composePackages';
import query from './query';
import isArray from './isArray';
export var Anew =
/*#__PURE__*/
function () {
  function Anew(pkgs) {
    if (pkgs === void 0) {
      pkgs = [];
    }

    this.packages = pkgs;
  }

  var _proto = Anew.prototype;

  _proto.use = function use(pkg, config) {
    if (isArray(pkg)) {
      this.packages = [].concat(this.packages, pkg);
    } else {
      this.packages.push([pkg, config]);
    }

    return this;
  };

  _proto.render = function render(entry, el) {
    if (entry && !el) {
      el = entry;
      entry = undefined;
    }

    var AnewApp = this.packages.length ? composePackages(this.packages, !!el)(entry) : entry;

    if (el) {
      _render(React.createElement(AnewApp, null), query(el));
    }

    return AnewApp;
  };

  return Anew;
}();
export default new Anew();