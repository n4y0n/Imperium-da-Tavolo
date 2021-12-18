export function getMaxTroops (civilization) {
    switch (civilization) {
        default: return 5;
    }
}

export function getImageForHero(loc) {
    const [civCode, name] = loc.split('_')
    const civ = getCiv(civCode)
    return import(`./assets/heroes/${civ}/${name}.png`)
}

function getCiv(civCode) {
    switch(civCode) {
        case 'r': return 'roma'
        case 'e': return 'egitto'
        case 'c': return 'cartagine'
        case 'b': return 'britannia'
        case 't': return 'germania'
        case 'g': return 'gallia'
        case 'i': return 'iberia'
        default: throw new Error("Unknown civilization")
    }
}