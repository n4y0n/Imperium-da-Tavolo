// Durante il conbattimento

import { playerDead, popValue, pushValue, stages, truppaCattiva, playerFighter, getRearDamagePercent } from "./utils";
import { applyEffect } from "./effects";

const TURNS_PER_ENERGY_RECOVER = 4;


// Effetti
// Hero Level, Oggetti, Skills (Eroe), Skills (Truppe)

// Priorita
// # - 10 * troop hp if troop vs hero
// 1 - Hero level (troop hp + 5 * hero Level)
// 2 - Hero Skills
// 3 - Oggetti
// 4 - Troop Skills

// Ordine
// Calcolo il danno
// Eseguo le skill
// Applico il danno

export function* createSimulation(ctx, alice, bob) {
  ctx.logs.push("Inizio simulazione!")
  ctx.logs.push(`Scontro tra Alice con ${alice.hero.name} e Bob con ${bob.hero.name}`)
  const atroop = playerFighter(alice)
  const btroop = playerFighter(bob)
  ctx.inProgress = true;

  // 1 - Hero level (troop hp + 5 * hero Level)
  if (alice.troop) {
    alice.troop['level'] = alice.hero.level
    alice.troop.hp += 5 * alice.hero.level
  }
  if (bob.troop) {
    bob.troop['level'] = bob.hero.level
    bob.troop.hp += 5 * bob.hero.level
  }

  // Applica le single-use skill
  for (let skill of alice.hero.skills)
    applyEffect(stages.BEFORE_BATTLE, skill, setupEffectContext(alice, bob, ctx, 'hero'))
  for (let skill of bob.hero.skills)
    applyEffect(stages.BEFORE_BATTLE, skill, setupEffectContext(alice, bob, ctx, 'hero'))
  for (let skill of alice.hero.items)
    applyEffect(stages.BEFORE_BATTLE, skill, setupEffectContext(alice, bob, ctx, 'hero'))
  for (let skill of bob.hero.items)
    applyEffect(stages.BEFORE_BATTLE, skill, setupEffectContext(alice, bob, ctx, 'hero'))
  if (alice.troop)
    for (let skill of alice.troop.skills)
      applyEffect(stages.BEFORE_BATTLE, skill, setupEffectContext(alice, bob, ctx))
  if (bob.troop)
    for (let skill of bob.troop.skills)
      applyEffect(stages.BEFORE_BATTLE, skill, setupEffectContext(bob, alice, ctx))

  do {
    if (ctx.iteration === 1) {
      ctx.logs.push(`Scontro ${atroop.name} ${atroop.level}LV contro ${btroop.name} ${btroop.level}LV`);
      if (truppaCattiva(btroop) && !truppaCattiva(atroop) && !atroop.isHero) {
        atroop.hp *= 4
      }
      if (!truppaCattiva(btroop) && truppaCattiva(atroop) && !btroop.isHero) {
        btroop.hp *= 4
      }
      if (atroop.isHero && !btroop.isHero && !truppaCattiva(btroop)) {
        btroop.hp *= 10
      }
      if (!atroop.isHero && btroop.isHero && !truppaCattiva(atroop)) {
        atroop.hp *= 10
      }
    } else {
      ctx.logs.push(`--------------------------------------------`);
    }

    if (ctx.iteration % atroop.recoverTime === 0) {
      atroop.energy += atroop.recoverAmount
      if (atroop.energy > atroop.maxEnergy) {
        atroop.energy = atroop.maxEnergy
      }
    }

    if (ctx.iteration % btroop.recoverTime === 0) {
      btroop.energy += btroop.recoverAmount
      if (btroop.energy > btroop.maxEnergy) {
        btroop.energy = btroop.maxEnergy
      }
    }

    turn(ctx, alice, bob)
    ctx.iteration++;
    yield ctx
  } while (!playerDead(alice) && !playerDead(bob));

  ctx.logs.push(`${atroop.name} ${atroop.hp.toFixed(2)}hp`);
  ctx.logs.push(`${btroop.name} ${btroop.hp.toFixed(2)}hp`);
  if (playerDead(alice) && playerDead(bob)) {
    ctx.logs.push("Draw");
  } else if (playerDead(alice) && !playerDead(bob)) {
    ctx.logs.push(`${bob.hero.name} Win`);
  } else if (!playerDead(alice) && playerDead(bob)) {
    ctx.logs.push(`${alice.hero.name} Win`);
  }

  ctx.inProgress = false;
  ctx.logs.push("Fine simulazione!")
  yield ctx
}

// TODO: RESET REAR ATK, DEF
// TODO: RECOVER REAR ENERGY

function turn(ctx, alice, bob) {
  const logs = ctx.logs;
  const self = playerFighter(alice)
  const enemy = playerFighter(bob)
  self["damage"] = 0;
  enemy["damage"] = 0;

  pushState(self)
  pushState(enemy)

  applySkills(stages.BEFORE_DAMAGE_COMPUTE, alice, bob, ctx)

  computeDamage(alice, bob);
  computeDamage(bob, alice);

  applySkills(stages.BEFORE_REAR_DAMAGE_COMPUTE, alice, bob, ctx)

  computeRearDamage(bob, alice)
  computeRearDamage(alice, bob)

  applySkills(stages.AFTER_DAMAGE_COMPUTE, alice, bob, ctx)

  logs.push(`${self.name} [${self.hp.toFixed(2)}hp] -> ${enemy.name} [${enemy.hp.toFixed(2)}hp] -${enemy.damage.toFixed(2)}hp ${(enemy.hp - enemy.damage).toFixed(2)}`)
  logs.push(`${enemy.name} [${enemy.hp.toFixed(2)}hp] -> ${self.name} [${self.hp.toFixed(2)}hp] -${self.damage.toFixed(2)}hp ${(self.hp - self.damage).toFixed(2)}`)

  self.hp -= self.damage;
  enemy.hp -= enemy.damage;

  applySkills(stages.AFTER_DAMAGE_APPLY, alice, bob, ctx)
  applySkills(stages.REAR_EFFECT, alice, bob, ctx)

  popState(enemy)
  popState(self)
}

export function fastSimulate(ctx, alice, bob) {
  const simulation = createSimulation(ctx, alice, bob)

  // Fast foward simulation until it ends
  for (let state of simulation);
}

/**
 * Calcola il danno che `self` infligge a `other` e lo salva in `other.damage`
 * @returns il danno
 */
function computeDamage(alice, bob) {
  const self = playerFighter(alice)
  const other = playerFighter(bob)

  const damage = self.atk - ((self.atk / 100) * other.def);
  other.damage += damage
  return damage;
}

function computeRearDamage(alice, bob) {
  const enemy = playerFighter(bob)
  const tmp = enemy.damage;
  enemy.damage = 0;
  for (const rear of alice.rears) {
    const damage = (rear.atk - ((rear.atk / 100) * enemy.def)) * getRearDamagePercent(rear);
    enemy.damage += damage
  }
  enemy.damage += tmp
}

function setupEffectContext(self, enemy, ctx, def = 'troop') {
  if (def === 'troop')
    return { self: playerFighter(self), selfPlayer: self, other: playerFighter(enemy), ...ctx }
  if (def === 'hero')
    return { self: self.hero, selfPlayer: self, other: playerFighter(enemy), ...ctx }
}

function applySkills(stage, alice, bob, ctx) {
  const atroop = playerFighter(alice)
  const btroop = playerFighter(bob)
  for (const code of atroop.skills) {
    if (!code) continue
    applyEffect(stage, code, setupEffectContext(alice, bob, ctx))
  }
  for (const code of btroop.skills) {
    if (!code) continue
    applyEffect(stage, code, setupEffectContext(bob, alice, ctx))
  }
}

function pushState(troop) {
  pushValue(troop.atk)
  pushValue(troop.def)
}

function popState(troop) {
  troop.def = popValue()
  troop.atk = popValue()
}
