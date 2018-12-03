export default function getElement(query) {
    switch (typeof query) {
        case 'string':
            const queryType = query[0]
            const queryName = query.substr(1)

            switch (queryType) {
                case '#':
                    return document.getElementById(queryName)
                case '.':
                    return document.getElementsByClassName(queryName)
                default:
                    return document.querySelector(query)
            }
        default:
            return query
    }
}
