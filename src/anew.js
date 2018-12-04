import { render } from 'react-dom'
import React from 'react'

import composePackages from './composePackages'
import getElement from './getElement'
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

    render(entry, query) {
        if (typeof entry === 'string' && !query) {
            query = entry
            entry = undefined
        }

        const AnewApp = composePackages(this.packages, !!query)(entry)

        if (query) {
            render(<AnewApp />, getElement(query))
        }

        return AnewApp
    }
}

export default new Anew()
