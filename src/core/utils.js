
export const stages = {
    BEFORE_BATTLE: 'beforeBattle',
    BEFORE_DAMAGE: 'beforeDamage',
    AFTER_DAMAGE: 'afterDamage',
}

export const actors = {
    HERO: 'hero',
    TROOP: 'troop',
    REAR: 'rear',
}

export function getMaxTroops(civilization) {
    switch (civilization) {
        default: return 7;
    }
}

export function truppaCattiva(player) {
    const troop = playerFighter(player)
    return (troop.id === 'britannia#Capi_Normanni' || troop.id === 'gallia#Guerrieri_di_Fand' || troop.id === 'cartagine#Elefanti_da_Guerra')
}

export function playerDead(player) {
    const troop = playerFighter(player)
    return troop.hp <= 0
}

export function playerFighter(player) {
    if (!player.player) {
        return player
    }
    const troop = player.troop ? player.troop : player.hero
    if (!troop) throw new Error("Player has no troop or hero.")
    return troop
}

export function lossyCopy(value) {
    return JSON.parse(JSON.stringify(value))
}

export function isRearTroop(troop) {
    return troop.isRear
}

export function firstTroop({ hero, troops }) {
    for (let position = 0; position < getMaxTroops(hero.civ); position++) {
        const troop = troops[position];
        if (troop && troop.hp > 0) {
            troop['position'] = position
            return troop
        }
    }
    return null
}

export function rearTroops({ hero, troops }) {
    const rears = []
    for (let position = 0; position < getMaxTroops(hero.civ); position++) {
        const troop = troops[position];
        if (troop && troop.hp > 0 && isRearTroop(troop)) {
            troop['position'] = position
            rears.push(troop)
        }
    }
    return rears
}

export function getRearDamagePercent(troop) {
    switch (troop.position) {
        default: return .2;
    }
}

export function flatten(object) {
    const flattened = []
    for (const [key, item] of Object.entries(object)) {
        flattened.push({ ...item, position: key })
    }
    return flattened
}