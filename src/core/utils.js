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
