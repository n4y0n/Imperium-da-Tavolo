import csv_file from './imperivm_hero_stats.csv'
import { getMaxTroops } from '../core/utils'


const images = {}

const unitas = {}
for (const element of csv_file) {
    const { hp, atk, def, nome, image } = element;

    const [civ, name] = nome?.split('#')
    if (!civ) continue

    if (unitas[civ]) {
        unitas[civ].push({ name, hp: parseInt(hp), atk: parseInt(atk), def: parseInt(def), civ, hero: true, energy: 10, skills: [], maxTroops: getMaxTroops(civ), image })
    } else {
        unitas[civ] = [{ name, hp: parseInt(hp), atk: parseInt(atk), def: parseInt(def), civ, hero: true, energy: 10, skills: [], maxTroops: getMaxTroops(civ), image }]
    }
}

export { images }
export default unitas