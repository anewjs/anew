import { render } from 'react-dom'
import React from 'react'

import composePackages from './composePackages'
import query from './query'
import isArray from './isArray'

export class Anew {
    constructor(pkgs = []) {
        this.packages = pkgs
    }

    use(pkg, config) {
        if (isArray(pkg)) {
            this.packages = [...this.packages, ...pkg]
        } else {
            this.packages.push([pkg, config])
        }

        return this
    }

    render(entry, el) {
        if (entry && !el) {
            el = entry
            entry = undefined
        }

        const AnewApp = composePackages(this.packages, !!el)(entry)

        if (el) {
            render(<AnewApp />, query(el))
        }

        return AnewApp
    }
}

export default new Anew()
