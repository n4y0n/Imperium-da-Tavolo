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

export function truppaCattiva(troop) {
    return (troop.id === 'britannia#Capi_Normanni' || troop.id === 'gallia#Guerrieri_di_Fand' || troop.id === 'cartagine#Elefanti_da_Guerra')
}