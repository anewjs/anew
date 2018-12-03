import React from 'react'

function extractPackage(pkg) {
    switch (typeof pkg) {
        case 'function':
            return [pkg, {}]
        default:
            if (!pkg.wrap) {
                return [pkg.package.wrap, pkg.config || {}]
            }

            return [pkg.wrap, {}]
    }
}

export default function composePackages(packages, isRoot) {
    if (packages.length === 1) {
        const [PackageExec, packageConfig] = extractPackage(packages[0])

        packageConfig.isRoot = isRoot

        return entry => PackageExec(entry, packageConfig)
    } else {
        return packages.reduce((Wrapper, Wrapped) => {
            const [WrapperExec, wrapperConfig] = extractPackage(Wrapper)
            const [WrappedExec, wrappedConfig] = extractPackage(Wrapped)

            wrapperConfig.isRoot = isRoot
            wrappedConfig.isRoot = isRoot

            return entry => WrapperExec(WrappedExec(entry, wrappedConfig), wrapperConfig)
        })
    }
}
