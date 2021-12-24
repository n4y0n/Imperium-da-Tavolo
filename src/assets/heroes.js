import csv_file from './imperivm_hero_stats.csv'
import { getMaxTroops } from '../core/utils'

const images = {}

const unitas = {}
for (const element of csv_file) {
    const { hp, atk, def, nome, image } = element;

    const [civ, name] = nome?.split('#')
    if (!civ) continue

    if (unitas[civ]) {
        unitas[civ].push({ name, id: nome, hp: parseInt(hp), atk: parseInt(atk), def: parseInt(def), civ, energy: 10, maxEnergy: 10, skills: [], maxTroops: getMaxTroops(civ), level: 0, image, maxHp: parseInt(hp), isHero: true, items: [] })
    } else {
        unitas[civ] = [{ name, id: nome, hp: parseInt(hp), atk: parseInt(atk), def: parseInt(def), civ, energy: 10, maxEnergy: 10, skills: [], maxTroops: getMaxTroops(civ), level: 0, image, maxHp: parseInt(hp), isHero: true, items: [] }]
    }
}

export { images }
export default unitas