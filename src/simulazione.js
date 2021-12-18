const SkillTemplate = (truppa, currentDamage) => { }

export class Truppa {
  constructor(nome = "Legionari", hp = 100, atk = Math.ceil(Math.random() * 10), def = Math.ceil(Math.random() * 5)) {
    this.hp = hp
    this.atk = atk
    this.def = def
    this.nome = nome
    this.energy = 10
    this.skils = []

    this.isHero = false
  }

  get alive() {
    return this.hp > 0
  }

  danno(other) {
    return this.atk - ((this.atk / 100) * other.def);
  }

  applyDanno(danno) {
    // Applica skills qui
    for (let i = 0; i < this.skils.length; i++) {
      const skill = this.skils[i];
      danno = skill(this, danno)
    }

    this.hp -= danno
  }
}

export class Eroe extends Truppa {
  constructor(nome = "Eroe", hp = 100, atk, def) {
    super(nome, hp, atk, def)
    this.isHero = true
    this._TRUPPE_MASSIME = 5
    /**
   * La posizione nel array è la posizione nella linea
   * @type {[Truppa]} truppe
   */
    this.truppe = []
    for (let index = 0; index < this._TRUPPE_MASSIME; index++) {
      this.truppe.push(null)
    }
  }

  /** @returns {Truppa} */
  get primaTruppa() {
    let truppa = this
    for (let i = 0; i < this._TRUPPE_MASSIME; i++) {
      if (this.truppe[i] !== null) {
        truppa = this.truppe[i]
        break
      }
    }
    return truppa;
  }

  dead() {
    for (let i = 0; i < this._TRUPPE_MASSIME; i++) {
      if (this.truppe[i]) {
        this.truppe[i] = null
        break
      }
    }
  }

  setTruppa(row, truppa) {
    if (row >= 0 && row < this._TRUPPE_MASSIME) {
      this.truppe[row] = truppa
    }
  }
}

export let stato = {
  eroe1: null,
  eroe2: null,
}


/**
 * 
 * @param {Eroe} eroe1 
 * @param {Eroe} eroe2 
 * @param {() => void} setRisultati 
 */
export function simulazione(eroe1, eroe2) {
  console.time("Simulazione")
  console.log("Inizio simulazione!")
  console.log(eroe1.primaTruppa);
  console.log(eroe2.primaTruppa);
  console.log(`Convattono ${eroe1.nome} con ${eroe1.primaTruppa.nome} vs. ${eroe2.nome} con ${eroe2.primaTruppa.nome}`)

  const { vincitore, log } = simulaConvattimento(eroe1, eroe2)

  if (vincitore.nome === eroe2.nome) eroe1.dead()
  else if (vincitore.nome === eroe1.nome) eroe2.dead()
  else { eroe2.dead(); eroe1.dead() }

  console.timeEnd("Simulazione")
  console.log(`Fine simulazione! Vincitore ${vincitore.nome}`)
  return log
}

function simulaConvattimento(eroe1, eroe2) {
  const log = []
  let vincitore = null
  let N = 0

  if (eroe1.primaTruppa.isHero && !eroe2.primaTruppa.isHero) {
    eroe2.primaTruppa.hp *= 10
  } else if (!eroe1.primaTruppa.isHero && eroe2.primaTruppa.isHero) {
    eroe1.primaTruppa.hp *= 10
  }

  while (eroe1.primaTruppa.alive && eroe2.primaTruppa.alive) {
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

function iterazioneConvattimento(eroe1, eroe2, log) {
  let vincitore = { nome: "Draw" }

  const danno1 = eroe1.primaTruppa.danno(eroe2.primaTruppa)
  const danno2 = eroe2.primaTruppa.danno(eroe1.primaTruppa)

  eroe1.primaTruppa.applyDanno(danno2)
  eroe2.primaTruppa.applyDanno(danno1)

  log.push(`${eroe1.nome} fa ${Math.round(danno1)} alle truppe di ${eroe2.nome} [${Math.round(eroe2.primaTruppa.hp)}HP]`)
  log.push(`${eroe2.nome} fa ${Math.round(danno2)} alle truppe di ${eroe1.nome} [${Math.round(eroe1.primaTruppa.hp)}HP]`)

  if (eroe1.primaTruppa.alive && !eroe2.primaTruppa.alive) {
    vincitore = Object.assign({}, eroe1)
  } else if (!eroe1.primaTruppa.alive && eroe2.primaTruppa.alive) {
    vincitore = Object.assign({}, eroe2)
  }
  return vincitore
}
