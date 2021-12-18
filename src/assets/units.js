import Troop from '../core/Troop'
import csv_file from './imperivm_stats.csv'

const unitas = {}

for (const { nome, hp, atk, def, image, ability1, ability2 } of csv_file) {
    const [civ, unit] = nome?.split('#')
    if (!civ) continue

    if (unitas[civ]) {
        unitas[civ].push(new Troop(unit, hp, atk, def, civ, [ability1, ability2]))
    } else {
        unitas[civ] = [new Troop(unit, hp, atk, def, civ, [ability1, ability2])]
    }
}

export default unitas