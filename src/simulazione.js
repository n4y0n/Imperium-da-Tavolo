import Hero from './core/Hero'
import Troop from './core/Troop'

/**
 * 
 * @param {Hero} eroe1 
 * @param {Hero} eroe2 
 */
export function simulazione(eroe1, eroe2) {
  console.log("Inizio simulazione!")
  console.log(`Convattono ${eroe1.name} con ${eroe1.firstTroupAvailable.name} vs. ${eroe2.name} con ${eroe2.firstTroupAvailable.name}`)

  const { vincitore, log } = simulaConvattimento(eroe1, eroe2)

  if (vincitore.name === eroe2.name) eroe1.dead()
  else if (vincitore.name === eroe1.name) eroe2.dead()
  else { eroe2.dead(); eroe1.dead() }

  console.log(`Fine simulazione! Vincitore ${vincitore.name}`)
  return log
}

function simulaConvattimento(eroe1, eroe2) {
  const log = []
  let vincitore = null
  let N = 0

  if (eroe1.firstTroupAvailable.isHero && !eroe2.firstTroupAvailable.isHero) {
    eroe2.firstTroupAvailable.hp *= 10
  } else if (!eroe1.firstTroupAvailable.isHero && eroe2.firstTroupAvailable.isHero) {
    eroe1.firstTroupAvailable.hp *= 10
  }

  while (eroe1.firstTroupAvailable.alive && eroe2.firstTroupAvailable.alive) {
    log.push(`---- Inizio Iterazione ${N}`)
    vincitore = iterazioneConvattimento(eroe1, eroe2, log)
    log.push(`---- Fine Iterazione ${N}`)
    N++;
  }

  return {
    vincitore,
    log
  }
}

/**
 * 
 * @param {Hero} eroe1 
 * @param {Hero} eroe2 
 */
function iterazioneConvattimento(eroe1, eroe2, log) {
  let vincitore = { name: "Draw" }

  const danno1 = eroe1.firstTroupAvailable.computeDamage(eroe2.firstTroupAvailable)
  const danno2 = eroe2.firstTroupAvailable.computeDamage(eroe1.firstTroupAvailable)

  eroe1.firstTroupAvailable.applyDamage(danno2)
  eroe2.firstTroupAvailable.applyDamage(danno1)

  log.push(`${eroe1.name} fa ${Math.round(danno1)} alle truppe di ${eroe2.name} [${Math.round(eroe2.firstTroupAvailable.hp)}HP]`)
  log.push(`${eroe2.name} fa ${Math.round(danno2)} alle truppe di ${eroe1.name} [${Math.round(eroe1.firstTroupAvailable.hp)}HP]`)

  if (eroe1.firstTroupAvailable.alive && !eroe2.firstTroupAvailable.alive) {
    vincitore = Object.assign({}, eroe1)
  } else if (!eroe1.firstTroupAvailable.alive && eroe2.firstTroupAvailable.alive) {
    vincitore = Object.assign({}, eroe2)
  }
  return vincitore
}
