const TEMP_STACK = []

export const stages = {
    BEFORE_BATTLE: 'before_battle#',
    BEFORE_DAMAGE_COMPUTE: 'before_damage#',
    AFTER_DAMAGE_COMPUTE: 'while_damage#',
    AFTER_DAMAGE_APPLY: 'after_damage#',
}

export const actors = {
    HERO: 'hero',
    TROOP: 'troop'
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

export function pushValue(val) {
    return TEMP_STACK.push(lossyCopy(val))
}

export function popValue() {
    return TEMP_STACK.pop()
}

export function lossyCopy(value) {
    return JSON.parse(JSON.stringify(value))
}

export function isRearTroop(troop) {
    return troop.isRear
}