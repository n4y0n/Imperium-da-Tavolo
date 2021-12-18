import Troop from './Troop'
import { getMaxTroops } from '../utils'

export default class Hero extends Troop {
  constructor(name = "Eroe", hp = 100, atk, def, civ, skills) {
    super(name, hp, atk, def, civ, skills)
    this.isHero = true
    this._MAX_TROOPS = getMaxTroops(civ)
    this._level = 0

    /**
     * La posizione nel array è la posizione nella linea
     * @type {[Troop]} truppe
     */
    this._troops = {}
  }

  /** @returns {Troop} */
  get firstTroupAvailable() {
    let troop = this
    for (let i = 0; i < this._MAX_TROOPS; i++) {
      if (this._troops[i]) {
        troop = this._troops[i]
        break
      }
    }
    return troop;
  }

  get troops() {
    let flattenTroops = []

    for(let [position, troop] of Object.entries(this._troops)) {
      flattenTroops.push(troop)
    }

    return flattenTroops
  }

  get maxTroops() {
    return this._MAX_TROOPS
  }

  get level() {
    return this._level
  }
 
  dead() {
    for (let i = 0; i < this._MAX_TROOPS; i++) {
      if (this._troops[i]) {
        this._troops[i] = null
        break
      }
    }
  }

  setTroop(position, troop) {
    if (position >= 0 && position < this._MAX_TROOPS) {
      this._troops[position] = troop
    }
  }
}
