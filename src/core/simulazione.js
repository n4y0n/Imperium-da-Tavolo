// Durante il conbattimento

import { getMaxTroops } from "./utils";
import { applyTroopEffect, stages } from "./effects";

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


export function scontro({ alice, bob, context }) {
  const iteration = 0
  return new Promise((resolve, reject) => {
    context.logs.push("Inizio simulazione!")
    const { hero: ahero, troop: atroop } = alice;
    const { hero: bhero, troop: btroop } = bob;
    context.logs.push(`Scontro tra Alice con ${ahero.name} e Bob con ${bhero.name}`)

    // 1 - Hero level (troop hp + 5 * hero Level)
    if (atroop) atroop.hp + 5 * ahero.level
    if (btroop) btroop.hp + 5 * bhero.level

    // 2 - Hero Skills

    // 3 - Oggetti

    // Se tutti e due hanno truppe
    if (atroop && btroop) troopvstroop({ atroop, btroop, iteration, ...context })
    // Bob non ha truppe
    else if (!btroop && atroop) herovstroop({ bhero, atroop, iteration, ...context })
    // Alice non ha truppe
    else if (!atroop && btroop) herovstroop({ ahero, btroop, iteration, ...context })
    // Nessuno dei due ha truppe
    else herovshero({ ahero, bhero, ...context })

    context.logs.push("Fine simulazione!")
    resolve()
  })
}

function troopvstroop(context) {
  const { atroop, btroop } = context;
  if (atroop.hp <= 0 || btroop.hp <= 0) {
    context.logs.push(`${atroop.name} ${atroop.hp.toString().substring(0, 5)}hp`);
    context.logs.push(`${btroop.name} ${btroop.hp.toString().substring(0, 5)}hp`);
    if (atroop.hp <= 0 && btroop.hp <= 0) {
      context.logs.push("Draw");
    } else if (atroop.hp <= 0 && !(btroop.hp <= 0)) {
      context.logs.push(`${btroop.name} Win`);
    } else if (btroop.hp <= 0 && !(atroop.hp <= 0)) {
      context.logs.push(`${atroop.name} Win`);
    }
    return
  }

  if (context.iteration % TURNS_PER_ENERGY_RECOVER === 0) {
    atroop.energy += 1
    btroop.energy += 1
  }

  context.logs.push(`Scontro ${atroop.name} contro ${btroop.name}`);
  applySkills(stages.BEFORE_DAMAGE, btroop, atroop, context)

  computeDamage(btroop, atroop);
  computeDamage(atroop, btroop);

  if (applySkills(stages.WHILE_DAMAGE, btroop, atroop, context)) {
    computeDamage(btroop, atroop)
    computeDamage(atroop, btroop)
  }

  atroop.hp -= atroop.damage;
  btroop.hp -= btroop.damage;

  context.logs.push(`${atroop.name} [${atroop.hp.toString().substring(0, 5)}hp] -> ${btroop.name} [${btroop.hp.toString().substring(0, 5)}hp] -${btroop.damage}hp`)
  context.logs.push(`${btroop.name} [${btroop.hp.toString().substring(0, 5)}hp] -> ${atroop.name} [${atroop.hp.toString().substring(0, 5)}hp] -${atroop.damage}hp`)

  applySkills(stages.AFTER_DAMAGE, btroop, atroop, context)
  context.iteration += 1
  return troopvstroop(context)
}

function herovstroop(ctx) {
  const { hero, troop } = ctx;
  // # - 10 * troop hp if troop vs hero
  troop.hp = troop.hp * 10;
  console.log(`Scontro ${hero.name} contro ${troop.name}`);
}

function herovshero(ctx) {
  const { ahero, bhero } = ctx;
  console.log(`Scontro ${ahero.name} contro ${bhero.name}`);
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
  const damage = { recompute: false }
  for (const code of alice.skills ?? []) {
    if (!code) continue
    applyTroopEffect(stage, code, { self: alice, ...context, damage })
  }
  for (const code of bob.skills ?? []) {
    if (!code) continue
    applyTroopEffect(stage, code, { self: bob, ...context, damage })
  }
  return damage.recompute
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