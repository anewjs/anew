import React from 'react';

function extractPackage(pkg) {
  switch (typeof pkg) {
    case 'function':
      return [pkg];

    default:
      if (!pkg.wrap) {
        return [pkg[0].wrap, pkg[1]];
      }

      return [pkg.wrap];
  }
}

export default function composePackages(packages, isRoot) {
  if (packages.length === 1) {
    var _extractPackage = extractPackage(packages[0]),
        PackageExec = _extractPackage[0],
        packageConfig = _extractPackage[1];

    return function (entry) {
      return PackageExec(entry, packageConfig, isRoot);
    };
  } else {
    return packages.reduce(function (Wrapper, Wrapped) {
      var _extractPackage2 = extractPackage(Wrapper),
          WrapperExec = _extractPackage2[0],
          wrapperConfig = _extractPackage2[1];

      var _extractPackage3 = extractPackage(Wrapped),
          WrappedExec = _extractPackage3[0],
          wrappedConfig = _extractPackage3[1];

      return function (entry) {
        return WrapperExec(WrappedExec(entry, wrappedConfig, isRoot), wrapperConfig, isRoot);
      };
    });
  }
}