import React from 'react'

function extractPackage(pkg) {
    switch (typeof pkg) {
        case 'function':
            return [pkg]
        default:
            if (!pkg.wrap) {
                return [pkg[0].wrap, pkg[1]]
            }

            return [pkg.wrap]
    }
}

export default function composePackages(packages, isRoot) {
    if (packages.length === 1) {
        const [PackageExec, packageConfig] = extractPackage(packages[0])

        return entry => PackageExec(entry, packageConfig, isRoot)
    } else {
        return packages.reduce((Wrapper, Wrapped) => {
            const [WrapperExec, wrapperConfig] = extractPackage(Wrapper)
            const [WrappedExec, wrappedConfig] = extractPackage(Wrapped)

            return entry => WrapperExec(WrappedExec(entry, wrappedConfig, isRoot), wrapperConfig, isRoot)
        })
    }
}
