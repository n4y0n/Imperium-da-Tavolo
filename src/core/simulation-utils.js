import { applyEffect } from "./effects";
import { getRearDamagePercent, actors, stages, playerFighter } from "./utils"

/**
 * Calcola il danno che `self` infligge a `other` e lo salva in `other.damage`
 * @returns il danno
 */
export function computeDamage(alice, bob) {
    const self = playerFighter(alice)
    const other = playerFighter(bob)

    const damage = self.atk - ((self.atk / 100) * other.def);
    other.damage += damage
    return damage;
}

export function computeRearDamage(alice, bob) {
    const enemy = playerFighter(bob)
    for (const rear of alice.rears) {
        const damage = (rear.atk - ((rear.atk / 100) * enemy.def)) * getRearDamagePercent(rear);
        enemy.damage += damage
    }
}

function setupEffectContext(self, enemy, ctx, def = actors.TROOP) {
    if (def === actors.TROOP)
        return { self: playerFighter(self), selfPlayer: self, other: playerFighter(enemy), otherPlayer: enemy, ...ctx }
    if (def === actors.HERO)
        return { self: self.hero, selfPlayer: self, other: playerFighter(enemy), otherPlayer: enemy, ...ctx }
    if (def === actors.REAR)
        return { self: self, selfPlayer: self.player, other: playerFighter(enemy), otherPlayer: enemy, ...ctx }
}

function applySkills(stage, alice, bob, ctx) {
    const atroop = playerFighter(alice)
    for (const code of atroop.skills) {
        if (!code) continue
        applyEffect(stage, code, setupEffectContext(alice, bob, ctx))
    }
}

function applyRearSkills(stage, alice, bob, ctx) {
    for (let rear of alice.rears) {
        for (const code of rear.skills) {
            if (!code) continue
            rear['player'] = alice
            applyEffect(stage, code, setupEffectContext(rear, bob, ctx, actors.REAR))
            delete rear['player']
        }
    }
}

export function applyAllSkills(stage, alice, bob, ctx) {
    applyRearSkills(stage, alice, bob, ctx)
    applyRearSkills(stage, bob, alice, ctx)
    applySkills(stage, alice, bob, ctx)
    applySkills(stage, bob, alice, ctx)
}

export function applyBeforeBattleSkills(ctx, player, enemy) {
    // Applica le single-use skill
    for (let skill of player.hero.skills)
        applyEffect(stages.BEFORE_BATTLE, skill, setupEffectContext(player, enemy, ctx, actors.HERO))
    for (let skill of player.hero.items)
        applyEffect(stages.BEFORE_BATTLE, skill, setupEffectContext(player, enemy, ctx, actors.HERO))
    if (player.troop)
        for (let skill of player.troop.skills)
            applyEffect(stages.BEFORE_BATTLE, skill, setupEffectContext(player, enemy, ctx))
}

export function applyLevelBoost(player) {
    if (player.troop) {
        player.troop['level'] = player.hero.level
        player.troop.hp += 5 * player.hero.level
    }
}

export function recoverEnergy(iteration, player) {
    for (const troop of player.troops) {
        if (iteration % troop.recoverTime === 0) {
            troop.energy += troop.recoverAmount
            if (troop.energy > troop.maxEnergy) {
                troop.energy = troop.maxEnergy
            }
        }
    }
}
