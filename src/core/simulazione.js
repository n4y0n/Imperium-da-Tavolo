// Durante il conbattimento

import { getMaxTroops, playerDead, popValue, pushValue, stages, truppaCattiva, playerFighter, isRearTroop } from "./utils";
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

export function scontro(alice, bob) {
  const iteration = 1
  return new Promise((resolve, reject) => {
    try {
      this.logs.push("Inizio simulazione!")
      this.logs.push(`Scontro tra Alice con ${alice.hero.name} e Bob con ${bob.hero.name}`)

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
        applyHeroEffect(stages.BEFORE_BATTLE, skill, { self: alice, ...this })
      for (let skill of bob.hero.skills)
        applyHeroEffect(stages.BEFORE_BATTLE, skill, { self: bob, ...this })
      for (let skill of alice.hero.items)
        applyHeroEffect(stages.BEFORE_BATTLE, skill, { self: alice, ...this })
      for (let skill of bob.hero.items)
        applyHeroEffect(stages.BEFORE_BATTLE, skill, { self: bob, ...this })
      if (alice.troop)
        for (let skill of alice.troop.skills)
          applyEffect(stages.BEFORE_BATTLE, skill, { self: alice, ...this })
      if (bob.troop)
        for (let skill of bob.troop.skills)
          applyEffect(stages.BEFORE_BATTLE, skill, { self: bob, ...this })

      // Se tutti e due hanno truppe
      iniziaScontro.call({ ...this, iteration }, alice, bob)

      this.logs.push("Fine simulazione!")
      resolve()
    } catch (e) {
      reject(e)
    }
  })
}

function iniziaScontro(alice, bob) {
  const logs = this.logs
  const atroop = playerFighter(alice)
  const btroop = playerFighter(bob)

  do {
    if (this.iteration === 1) {
      logs.push(`Scontro ${atroop.name} ${atroop.level}LV contro ${btroop.name} ${btroop.level}LV`);
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
      logs.push(`--------------------------------------------`);
    }

    if (this.iteration % TURNS_PER_ENERGY_RECOVER === 0) {
      atroop.energy++
      btroop.energy++

      if (atroop.energy > atroop.maxEnergy) {
        atroop.energy = atroop.maxEnergy
      }
      if (btroop.energy > btroop.maxEnergy) {
        atroop.energy = atroop.maxEnergy
      }
    }

    turn(this, { alice, bob })
    this.iteration++;
  } while (!playerDead(alice) && !playerDead(bob))

  logs.push(`${atroop.name} ${atroop.hp.toFixed(2)}hp`);
  logs.push(`${btroop.name} ${btroop.hp.toFixed(2)}hp`);
  if (playerDead(alice) && playerDead(bob)) {
    logs.push("Draw");
  } else if (playerDead(alice) && !playerDead(bob)) {
    logs.push(`${btroop.name} Win`);
  } else if (!playerDead(alice) && playerDead(bob)) {
    logs.push(`${atroop.name} Win`);
  }
}

function turn(ctx, { alice, bob }) {
  const logs = ctx.logs;
  const self = playerFighter(alice)
  const enemy = playerFighter(bob)
  self["damage"] = 0;
  enemy["damage"] = 0;

  pushValue(self.atk)
  pushValue(self.def)
  pushValue(enemy.atk)
  pushValue(enemy.def)

  applySkills(stages.BEFORE_DAMAGE_COMPUTE, alice, bob, ctx)

  computeDamage(enemy, self);
  computeDamage(self, enemy);

  computeRearDamage(bob, alice)
  computeRearDamage(alice, bob)

  applySkills(stages.AFTER_DAMAGE_COMPUTE, alice, bob, ctx)

  logs.push(`${self.name} [${self.hp.toFixed(2)}hp] -> ${enemy.name} [${enemy.hp.toFixed(2)}hp] -${enemy.damage.toFixed(2)}hp ${(enemy.hp - enemy.damage).toFixed(2)}`)
  logs.push(`${enemy.name} [${enemy.hp.toFixed(2)}hp] -> ${self.name} [${self.hp.toFixed(2)}hp] -${self.damage.toFixed(2)}hp ${(self.hp - self.damage).toFixed(2)}`)

  self.hp -= self.damage;
  enemy.hp -= enemy.damage;

  applySkills(stages.AFTER_DAMAGE_APPLY, alice, bob, ctx)

  enemy.def = popValue()
  enemy.atk = popValue()
  self.def = popValue()
  self.atk = popValue()
}


/**
 * Calcola il danno che `self` infligge a `other` e lo salva in `other.damage`
 * @returns il danno
 */
function computeDamage(self, other) {
  const damage = self.atk - ((self.atk / 100) * other.def);
  other.damage += damage
  return damage;
}

function computeRearDamage(self, other) {
  for (const rear of self.rears) {
    computeDamage(rear, playerFighter(other))
  }
}

function applySkills(stage, alice, bob, context) {
  const atroop = playerFighter(alice)
  const btroop = playerFighter(bob)
  for (const code of atroop.skills) {
    if (!code) continue
    applyEffect(stage, code, { self: atroop, selfPlayer: alice, other: btroop, ...context })
  }
  for (const code of btroop.skills) {
    if (!code) continue
    applyEffect(stage, code, { self: btroop, selfPlayer: bob, other: atroop, ...context })
  }
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