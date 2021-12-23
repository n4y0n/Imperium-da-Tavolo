export const stages = {
    BEFORE_DAMAGE: 'before_damage#',
    WHILE_DAMAGE: 'while_damage#',
    AFTER_DAMAGE: 'after_damage#',
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
