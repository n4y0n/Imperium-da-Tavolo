import { playerDead, stages, truppaCattiva, playerFighter, unflatten } from "./utils";
import { applyAllSkills, applyBeforeBattleSkills, applyLevelBoost, computeDamage, computeRearDamage, recoverEnergy } from "./simulation-utils"

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
  applyLevelBoost(alice)
  applyLevelBoost(bob)

  ctx.logs.push(`Scontro ${atroop.name} ${atroop.level}LV contro ${btroop.name} ${btroop.level}LV`);

  if (ctx.singleUseSkills) {
    applyBeforeBattleSkills(ctx, alice, bob)
    applyBeforeBattleSkills(ctx, bob, alice)
    ctx.singleUseSkills = false
  }

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

  do {
    if (ctx.iteration !== 1) {
      ctx.logs.push(`--------------------------------------------`);
    }

    turn(ctx, alice, bob)

    recoverEnergy(ctx.iteration, alice)
    recoverEnergy(ctx.iteration, bob)
    ctx.iteration++;

    ctx.p1.troops = unflatten(alice.troops);
    ctx.p2.troops = unflatten(bob.troops);
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

  ctx.p1.troops = unflatten(alice.troops);
  ctx.p2.troops = unflatten(bob.troops);

  ctx.inProgress = false;
  ctx.logs.push("Fine simulazione!")
  yield ctx
}

function turn(ctx, alice, bob) {
  const logs = ctx.logs;
  const self = playerFighter(alice)
  const enemy = playerFighter(bob)
  self["damage"] = 0;
  enemy["damage"] = 0;

  pushState(alice)
  pushState(bob)

  applyAllSkills(stages.BEFORE_DAMAGE, alice, bob, ctx)

  computeRearDamage(bob, alice)
  computeRearDamage(alice, bob)

  computeDamage(alice, bob);
  computeDamage(bob, alice);

  logs.push(`${self.name} [${self.hp.toFixed(2)}hp] -> ${enemy.name} [${enemy.hp.toFixed(2)}hp] -${enemy.damage.toFixed(2)}hp ${(enemy.hp - enemy.damage).toFixed(2)}`)
  logs.push(`${enemy.name} [${enemy.hp.toFixed(2)}hp] -> ${self.name} [${self.hp.toFixed(2)}hp] -${self.damage.toFixed(2)}hp ${(self.hp - self.damage).toFixed(2)}`)

  self.hp -= self.damage;
  enemy.hp -= enemy.damage;

  applyAllSkills(stages.AFTER_DAMAGE, alice, bob, ctx)

  popState(bob)
  popState(alice)
}

export function fastSimulate(ctx, alice, bob) {
  const simulation = createSimulation(ctx, alice, bob)
  let lastState = null

  // Fast foward simulation until it ends
  for (let state of simulation) {
    lastState = state;
  }

  return lastState;
}

const TEMP_STACK = []
function pushState(player) {
  for (const troop of player.rears) {
    TEMP_STACK.push(troop.atk)
    TEMP_STACK.push(troop.def)
  }
  if (player.troop) {
    TEMP_STACK.push(player.troop.atk)
    TEMP_STACK.push(player.troop.def)
  }
  TEMP_STACK.push(player.hero.atk)
  TEMP_STACK.push(player.hero.def)
}

function popState(player) {
  player.hero.def = TEMP_STACK.pop()
  player.hero.atk = TEMP_STACK.pop()
  if (player.troop) {
    player.troop.def = TEMP_STACK.pop()
    player.troop.atk = TEMP_STACK.pop()
  }
  for (let i = player.rears.length - 1; i >= 0; i--) {
    const troop = player.rears[i];
    troop.def = TEMP_STACK.pop()
    troop.atk = TEMP_STACK.pop()
  }
}
