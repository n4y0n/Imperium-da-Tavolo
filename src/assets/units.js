import csv_file from './imperivm_stats.csv'

const unitas = {}

for (const { nome, hp, atk, def, image, ability1, ability2 } of csv_file) {
    const [civ, name] = nome?.split('#')
    if (!civ) continue

    if (unitas[civ]) {
        unitas[civ].push({ name, hp: parseInt(hp), atk: parseInt(atk), def: parseInt(def), civ, hero: false, energy: 10, skills: [ability1, ability2] })
    } else {
        unitas[civ] = [{ name, hp: parseInt(hp), atk: parseInt(atk), def: parseInt(def), civ, hero: false, energy: 10, skills: [ability1, ability2] }]
    }
}

export default unitas