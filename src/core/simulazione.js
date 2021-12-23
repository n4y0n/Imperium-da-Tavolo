// Durante il conbattimento

import { getMaxTroops, stages } from "./utils";
import { applyTroopEffect, applyHeroEffect } from "./effects";

const TURNS_PER_ENERGY_RECOVER = 4;
const STACK = []

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

function pushState(obj) {
  STACK.push({ ...obj })
}

function popState(obj) {
  const top = STACK.pop()
  for (const [key, val] of Object.entries(top)) {
    obj[key] = val
  }
}

export function scontro({ alice, bob, context }) {
  const iteration = 0
  return new Promise((resolve, reject) => {
    context.logs.push("Inizio simulazione!")
    const { hero: ahero, troop: atroop } = alice;
    const { hero: bhero, troop: btroop } = bob;
    context.logs.push(`Scontro tra Alice con ${ahero.name} e Bob con ${bhero.name}`)

    // 1 - Hero level (troop hp + 5 * hero Level)
    if (atroop) {
      atroop['level'] = ahero.level
      atroop.hp + 5 * ahero.level
    }
    if (btroop) {
      btroop['level'] = bhero.level
      btroop.hp + 5 * bhero.level
    }

    // 2 - Hero Skills

    // 3 - Oggetti

    // Se tutti e due hanno truppe
    if (atroop && btroop) {
      troopvstroop({ atroop, btroop, iteration, ...context })
    }
    // Bob non ha truppe
    else if (!btroop && atroop) {
      herovstroop({ hero: bhero, troop: atroop, iteration, ...context })
    }
    // Alice non ha truppe
    else if (!atroop && btroop) {
      herovstroop({ hero: ahero, troop: btroop, iteration, ...context })
    }
    // Nessuno dei due ha truppe
    else {
      herovshero({ ahero, bhero, ...context })
    }

    context.logs.push("Fine simulazione!")
    resolve()
  })
}

function troopvstroop(context) {
  const { atroop, btroop, logs } = context;
  if (atroop.hp <= 0 || btroop.hp <= 0) {
    logs.push(`${atroop.name} ${atroop.hp.toString().substring(0, 5)}hp`);
    logs.push(`${btroop.name} ${btroop.hp.toString().substring(0, 5)}hp`);
    if (atroop.hp <= 0 && btroop.hp <= 0) {
      logs.push("Draw");
    } else if (atroop.hp <= 0 && !(btroop.hp <= 0)) {
      logs.push(`${btroop.name} Win`);
    } else if (btroop.hp <= 0 && !(atroop.hp <= 0)) {
      logs.push(`${atroop.name} Win`);
    }
    return
  }

  if (context.iteration % TURNS_PER_ENERGY_RECOVER === 0) {
    atroop.energy += 1
    btroop.energy += 1
  }

  if (context.iteration === 0)
    logs.push(`Scontro ${atroop.name} contro ${btroop.name}`);
  else
    logs.push(`--------------------------------------------`);

  pushState(atroop)
  pushState(btroop)

  applySkills(stages.BEFORE_DAMAGE, btroop, atroop, context)
  computeDamage(btroop, atroop);
  computeDamage(atroop, btroop);

  popState(btroop)
  popState(atroop)

  applySkills(stages.WHILE_DAMAGE, btroop, atroop, context)

  logs.push(`${atroop.name} [${atroop.hp.toString().substring(0, 5)}hp] -> ${btroop.name} [${btroop.hp.toString().substring(0, 5)}hp] -${btroop.damage}hp ${(btroop.hp - btroop.damage).toString().substring(0, 5)}`)
  logs.push(`${btroop.name} [${btroop.hp.toString().substring(0, 5)}hp] -> ${atroop.name} [${atroop.hp.toString().substring(0, 5)}hp] -${atroop.damage}hp ${(atroop.hp - atroop.damage).toString().substring(0, 5)}`)
  atroop.hp -= atroop.damage;
  btroop.hp -= btroop.damage;

  applySkills(stages.AFTER_DAMAGE, btroop, atroop, context)
  context.iteration += 1
  return troopvstroop(context)
}

function herovstroop(context) {
  const { hero, troop, logs } = context;
  if (hero.hp <= 0 || troop.hp <= 0) {
    logs.push(`${hero.name} ${hero.hp.toString().substring(0, 5)}hp`);
    logs.push(`${troop.name} ${troop.hp.toString().substring(0, 5)}hp`);
    if (hero.hp <= 0 && troop.hp <= 0) {
      logs.push("Draw");
    } else if (hero.hp <= 0 && !(troop.hp <= 0)) {
      logs.push(`${troop.name} Win`);
    } else if (troop.hp <= 0 && !(hero.hp <= 0)) {
      logs.push(`${hero.name} Win`);
    }
    return
  }

  if (context.iteration % TURNS_PER_ENERGY_RECOVER === 0) {
    hero.energy += 1
    troop.energy += 1
  }

  if (context.iteration === 0) {
    logs.push(`Scontro ${hero.name} contro ${troop.name}`);
    // # - 10 * troop hp if troop vs hero
    troop.hp = troop.hp * 10;
  } else {
    logs.push(`--------------------------------------------`);
  }

  applySkills1(stages.BEFORE_DAMAGE, troop, hero, context)

  computeDamage(troop, hero);
  computeDamage(hero, troop);

  applySkills1(stages.WHILE_DAMAGE, troop, hero, context)

  logs.push(`${hero.name} [${hero.hp.toString().substring(0, 5)}hp] -> ${troop.name} [${troop.hp.toString().substring(0, 5)}hp] -${troop.damage}hp ${(troop.hp - troop.damage).toString().substring(0, 5)}`)
  logs.push(`${troop.name} [${troop.hp.toString().substring(0, 5)}hp] -> ${hero.name} [${hero.hp.toString().substring(0, 5)}hp] -${hero.damage}hp ${(hero.hp - hero.damage).toString().substring(0, 5)}`)
  hero.hp -= hero.damage;
  troop.hp -= troop.damage;

  applySkills1(stages.AFTER_DAMAGE, troop, hero, context)
  context.iteration += 1
  return herovstroop(context)
}

function herovshero(ctx) {
  const { ahero, bhero, logs } = ctx;
  logs.push(`Scontro ${ahero.name} contro ${bhero.name}`);

}

/**
 * Calcola il danno che `self` infligge a `other` e lo salva in `other.damage`
 * @returns il danno
 */
function computeDamage(self, other) {
  const damage = self.atk - ((self.atk / 100) * other.def);
  other['damage'] = damage
  return damage;
}

function applySkills(stage, alice, bob, context) {
  for (const code of alice.skills ?? []) {
    if (!code) continue
    applyTroopEffect(stage, code, { self: alice, other: bob, ...context })
  }
  for (const code of bob.skills ?? []) {
    if (!code) continue
    applyTroopEffect(stage, code, { self: bob, other: alice, ...context })
  }
}

function applySkills1(stage, hero, troop, context) {
  for (const code of hero.skills ?? []) {
    if (!code) continue
    applyHeroEffect(stage, code, { self: alice, other: bob, ...context })
  }
  for (const code of troop.skills ?? []) {
    if (!code) continue
    applyTroopEffect(stage, code, { self: bob, other: alice, ...context })
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