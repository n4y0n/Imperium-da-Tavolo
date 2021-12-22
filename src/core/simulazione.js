// Durante il conbattimento

import { getMaxTroops } from "./utils";
import { applyEffect, applyTroopEffect } from "./effects";

// Effetti
// Hero Level, Oggetti, Skills (Eroe), Skills (Truppe)

// Priorita
// # - 10 * troop hp if troop vs hero
// 1 - Hero level (troop hp + 5 * hero Level)
// 2 - Hero Skills
// 3 - Oggetti
// 4 - Troop Skills


export function scontro({ alice, bob, context }) {
  return new Promise((resolve, reject) => {
    console.log("Inizio simulazione!")
    const { hero: ahero, troop: atroop } = alice;
    const { hero: bhero, troop: btroop } = bob;

    console.log(`Scontro tra Alice con ${ahero.name} e Bob con ${bhero.name}`);

    // 1 - Hero level (troop hp + 5 * hero Level)
    if (atroop) atroop.hp + 5 * ahero.level
    if (btroop) btroop.hp + 5 * bhero.level

    // 2 - Hero Skills
    for (const code of ahero.skills ?? []) {
      applyEffect(code, { alice, bob })
    }
    for (const code of bhero.skills ?? []) {
      applyEffect(code, { alice, bob })
    }

    // 3 - Oggetti
    for (const code of ahero.items ?? []) {
      applyEffect(code, { alice, bob })
    }
    for (const code of bhero.items ?? []) {
      applyEffect(code, { alice, bob })
    }

    // Se tutti e due hanno truppe
    if (atroop && btroop) troopvstroop({ atroop, btroop, ...context })
    // Bob non ha truppe
    else if (!btroop && atroop) herovstroop({ bhero, atroop, ...context })
    // Alice non ha truppe
    else if (!atroop && btroop) herovstroop({ ahero, btroop, ...context })
    // Nessuno dei due ha truppe
    else herovshero({ ahero, bhero, ...context })

    console.log("Fine simulazione!");
    resolve()
  })
}

function troopvstroop(ctx) {
  const { atroop, btroop } = ctx
  console.log(`Scontro ${atroop.name} contro ${btroop.name}`);

  for (const code of atroop.skills ?? []) {
    applyTroopEffect(code, ctx)
  }
  for (const code of btroop.skills ?? []) {
    applyTroopEffect(code, ctx)
  }
}

function herovstroop(ctx) {
  const { hero, troop } = ctx

  // # - 10 * troop hp if troop vs hero
  troop.hp = troop.hp * 10
  console.log(`Scontro ${hero.name} contro ${troop.name}`);

}

function herovshero(ctx) {
  const { ahero, bhero } = ctx
  console.log(`Scontro ${ahero.name} contro ${bhero.name}`);

}

export function firstTroop({ hero, troops }) {
  for (let position = 0; position < getMaxTroops(hero.civ); position++) {
    const troop = troops[position];
    if (troop && troop.hp > 0) return troop
  }
  return null
}