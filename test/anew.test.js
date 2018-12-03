import Anew from '../'

describe('Anew tests', () => {
    it('Package composition', () => {
        const pkgA = { wrap: (comp, config) => () => `A(${comp()}, ${config})` }
        const pkgB = { wrap: (comp, config) => () => `B(${comp()}, ${config})` }
        const pkgC = { wrap: (comp, config) => () => `C(${comp()}, ${config})` }

        Anew.use(pkgA)
            .use(pkgB)
            .use(pkgC)

        const Component = Anew.render(() => 'COMP')
        expect(Component()).toBe('A(B(C(COMP, [object Object]), [object Object]), [object Object])')
    })
})
