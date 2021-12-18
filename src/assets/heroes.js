import Hero from "../core/Hero";
import csv_file from './imperivm_hero_stats.csv'

const unitas = {}
console.log(csv_file);

for (const element of csv_file) {
    const { hp, atk, def, nome } = element;

    const [civ, unit] = nome?.split('#')
    if (!civ) continue
    
    if (unitas[civ]) {
        unitas[civ].push(new Hero(unit, hp, atk, def, civ))
    } else {
        unitas[civ] = [new Hero(unit, hp, atk, def, civ)]
    }
}

console.log(unitas);
export default unitas