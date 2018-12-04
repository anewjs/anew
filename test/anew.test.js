import { Anew } from '../'

describe('Anew tests', () => {
    it('Package composition using chained method', () => {
        const pkgA = { wrap: (comp, config, isRoot) => () => `A(${comp()}, ${config}, ${isRoot})` }
        const pkgB = { wrap: (comp, config, isRoot) => () => `B(${comp()}, ${config}, ${isRoot})` }
        const pkgC = { wrap: (comp, config, isRoot) => () => `C(${comp()}, ${config}, ${isRoot})` }

        const anew = new Anew()
        anew.use(pkgA, 1)
            .use(pkgB, 2)
            .use(pkgC)

        const Component = anew.render(() => 'COMP')
        expect(Component()).toBe('A(B(C(COMP, undefined, false), 2, false), 1, false)')
    })

    it('Package compoistion using array', () => {
        const pkgA = { wrap: (comp, config, isRoot) => () => `A(${comp()}, ${config}, ${isRoot})` }
        const pkgB = { wrap: (comp, config, isRoot) => () => `B(${comp()}, ${config}, ${isRoot})` }
        const pkgC = { wrap: (comp, config, isRoot) => () => `C(${comp()}, ${config}, ${isRoot})` }

        const anew = new Anew()
        anew.use([[pkgA, 1], [pkgB, 2], pkgC])

        const Component = anew.render(() => 'COMP')
        expect(Component()).toBe('A(B(C(COMP, undefined, false), 2, false), 1, false)')
    })
})
