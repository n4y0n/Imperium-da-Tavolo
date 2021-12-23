// Durante il conbattimento

import { getMaxTroops, stages, truppaCattiva } from "./utils";
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
  for (const [key, val] of Object.entries(obj)) {
    if (key !== 'energy')
      if (top[key])
        obj[key] = top[key]
  }
}

export function scontro({ alice, bob, context }) {
  const iteration = 1
  return new Promise((resolve, reject) => {
    context.logs.push("Inizio simulazione!")
    const { hero: ahero, troop: atroop } = alice;
    const { hero: bhero, troop: btroop } = bob;
    context.logs.push(`Scontro tra Alice con ${ahero.name} e Bob con ${bhero.name}`)

    // 1 - Hero level (troop hp + 5 * hero Level)
    if (atroop) {
      atroop['level'] = ahero.level
      atroop.hp += 5 * ahero.level
    }
    if (btroop) {
      btroop['level'] = bhero.level
      btroop.hp += 5 * bhero.level
    }

    // 2 - Hero Skills

    // 3 - Oggetti

    // Applica le single-use skill
    for (let skill of ahero.skills)
      applyHeroEffect(stages.BEFORE_BATTLE, skill, { self: alice, ...context })
    for (let skill of bhero.skills)
      applyHeroEffect(stages.BEFORE_BATTLE, skill, { self: bob, ...context })


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

  if (context.iteration === 1) {
    logs.push(`Scontro ${atroop.name} ${atroop.level}LV contro ${btroop.name} ${btroop.level}LV`);
    if (truppaCattiva(atroop) && !truppaCattiva(btroop))
      btroop.hp *= 4
    if (!truppaCattiva(atroop) && truppaCattiva(btroop))
      atroop.hp *= 4
  } else
    logs.push(`--------------------------------------------`);

  pushState(atroop)
  pushState(btroop)

  applySkills(stages.BEFORE_DAMAGE_COMPUTE, btroop, atroop, context)
  computeDamage(btroop, atroop);
  computeDamage(atroop, btroop);

  popState(btroop)
  popState(atroop)

  applySkills(stages.AFTER_DAMAGE_COMPUTE, btroop, atroop, context)

  logs.push(`${atroop.name} [${atroop.hp.toString().substring(0, 5)}hp] -> ${btroop.name} [${btroop.hp.toString().substring(0, 5)}hp] -${btroop.damage}hp ${(btroop.hp - btroop.damage).toString().substring(0, 5)}`)
  logs.push(`${btroop.name} [${btroop.hp.toString().substring(0, 5)}hp] -> ${atroop.name} [${atroop.hp.toString().substring(0, 5)}hp] -${atroop.damage}hp ${(atroop.hp - atroop.damage).toString().substring(0, 5)}`)
  atroop.hp -= atroop.damage;
  btroop.hp -= btroop.damage;

  applySkills(stages.AFTER_DAMAGE_APPLY, btroop, atroop, context)
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

  if (context.iteration === 1) {
    logs.push(`Scontro ${hero.name} contro ${troop.name}`);
    // # - 10 * troop hp if troop vs hero
    troop.hp = troop.hp * 10;
  } else {
    logs.push(`--------------------------------------------`);
  }

  pushState(troop)
  pushState(hero)
  applySkills1(stages.BEFORE_DAMAGE_COMPUTE, troop, hero, context)

  computeDamage(troop, hero);
  computeDamage(hero, troop);

  popState(hero)
  popState(troop)

  applySkills1(stages.AFTER_DAMAGE_COMPUTE, troop, hero, context)

  logs.push(`${hero.name} [${hero.hp.toString().substring(0, 5)}hp] -> ${troop.name} [${troop.hp.toString().substring(0, 5)}hp] -${troop.damage}hp ${(troop.hp - troop.damage).toString().substring(0, 5)}`)
  logs.push(`${troop.name} [${troop.hp.toString().substring(0, 5)}hp] -> ${hero.name} [${hero.hp.toString().substring(0, 5)}hp] -${hero.damage}hp ${(hero.hp - hero.damage).toString().substring(0, 5)}`)
  hero.hp -= hero.damage;
  troop.hp -= troop.damage;

  applySkills1(stages.AFTER_DAMAGE_APPLY, troop, hero, context)
  context.iteration += 1
  return herovstroop(context)
}

function herovshero(ctx) {
  const { ahero, bhero, logs } = ctx;
  if (ahero.hp <= 0 || bhero.hp <= 0) {
    logs.push(`${ahero.name} ${ahero.hp.toString().substring(0, 5)}hp`);
    logs.push(`${bhero.name} ${bhero.hp.toString().substring(0, 5)}hp`);
    if (ahero.hp <= 0 && bhero.hp <= 0) {
      logs.push("Draw");
    } else if (ahero.hp <= 0 && !(bhero.hp <= 0)) {
      logs.push(`${bhero.name} Win`);
    } else if (bhero.hp <= 0 && !(ahero.hp <= 0)) {
      logs.push(`${ahero.name} Win`);
    }
    return
  }

  if (context.iteration % TURNS_PER_ENERGY_RECOVER === 0) {
    ahero.energy += 1
    bhero.energy += 1
  }

  if (context.iteration === 1) {
    logs.push(`Scontro ${ahero.name} contro ${bhero.name}`);
  } else {
    logs.push(`--------------------------------------------`);
  }

  pushState(bhero)
  pushState(ahero)
  applySkills2(stages.BEFORE_DAMAGE_COMPUTE, bhero, ahero, context)

  computeDamage(bhero, ahero);
  computeDamage(ahero, bhero);

  popState(ahero)
  popState(bhero)

  applySkills2(stages.AFTER_DAMAGE_COMPUTE, bhero, ahero, context)

  logs.push(`${ahero.name} [${ahero.hp.toString().substring(0, 5)}hp] -> ${bhero.name} [${bhero.hp.toString().substring(0, 5)}hp] -${bhero.damage}hp ${(bhero.hp - bhero.damage).toString().substring(0, 5)}`)
  logs.push(`${bhero.name} [${bhero.hp.toString().substring(0, 5)}hp] -> ${ahero.name} [${ahero.hp.toString().substring(0, 5)}hp] -${ahero.damage}hp ${(ahero.hp - ahero.damage).toString().substring(0, 5)}`)
  ahero.hp -= ahero.damage;
  bhero.hp -= bhero.damage;

  applySkills2(stages.AFTER_DAMAGE_APPLY, bhero, ahero, context)
  context.iteration += 1
  return herovstroop(context)

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
    applyHeroEffect(stage, code, { self: hero, other: troop, ...context })
  }
  for (const code of troop.skills ?? []) {
    if (!code) continue
    applyTroopEffect(stage, code, { self: troop, other: hero, ...context })
  }
}

function applySkills2(stage, ahero, bhero, context) {
  for (const code of ahero.skills ?? []) {
    if (!code) continue
    applyHeroEffect(stage, code, { self: ahero, other: bhero, ...context })
  }
  for (const code of bhero.skills ?? []) {
    if (!code) continue
    applyHeroEffect(stage, code, { self: bhero, other: ahero, ...context })
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