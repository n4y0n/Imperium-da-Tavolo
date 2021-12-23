import { stages } from "./utils"

const effects = {}

const esempioNome = 'example'
const esempioEffetto = {
    cost: 1,
    apply: function ({ self, other, logs }) {
    }
}

// NON ha a disposizione la variabile `self.damage` con il danno che gli verrà applicato
// `self` ha a disposizione self.hero e self.troop rispettivamente l'eroe che ha attivato la skill e la truppa corrente
effects[stages.BEFORE_BATTLE] = {
}

// NON ha a disposizione la variabile `self.damage` con il danno che gli verrà applicato
effects[stages.BEFORE_DAMAGE_COMPUTE] = {
    defense_skill: {
        cost: 1,
        apply: ({ self, logs }) => {
            const new_def = (self.energy * 2);
            logs.push(`${self.name} aumenta la sua difesa di: ${new_def}`);
            self.def += new_def;
            return true;
        }
    },
    attack_skill: {
        cost: 1,
        apply: ({ self, logs }) => {
            const new_atk = (self.energy * 2);
            logs.push(`${self.name} aumenta il suo attacco di: ${new_atk}`);
            self.atk += new_atk;
            return true;
        }
    },
    expertise: {
        cost: 4,
        apply: ({ self, logs, other }) => {
            if ((self.level > other.level + 10) && !other.isHero) {
                const new_atk = 9999;
                logs.push(`${self.name} uccide all'istante: ${other.name}`);
                self.atk += new_atk;
                return true;
            }
        }
    },
    penetration: {
        cost: 1,
        apply: ({ self, logs, other }) => {
            logs.push(`${self.name} ignora l'armatura di: ${other.name}`);
            other.def = 0;
            return true;
        }
    },
    triple_strike: {
        cost: 1,
        apply: ({ self, logs, other }) => {
            const new_atk = self.atk * 3;
            logs.push(`${self.name} usa triple_strike ed infligge ${new_atk} danni ad ${other.name}`);
            self.atk = new_atk;
            return true;
        }
    },
    offensive_tactics: {
        cost: 1,
        apply: ({ self, logs, other }) => {
            const new_atk = self.atk + self.level;
            logs.push(`${self.name} usa offensive_tactics ed infligge ${new_atk} danni ad ${other.name}`);
            self.atk = new_atk;
            return true;
        }
    },
    cripple_off: {
        cost: 1,
        apply: ({ self, logs, other }) => {
            logs.push(`${self.name} usa cripple_off e manda a 0 l'energia di ${other.name}`);
            other.energy = 0;
            return true;
        }
    },
}

// Ha a disposizione la variabile `self.damage` con il danno che gli verrà applicato
effects[stages.AFTER_DAMAGE_COMPUTE] = {
    spike_armor: {
        cost: 1,
        apply: ({ self, other, logs }) => {
            logs.push(`${self.name} usa mirror_damage riflettendo ${self.damage}hp di danno [${self.energy - 1}ep]`)
            other.damage += self.damage;
            return true;
        }
    },
    death_blow: {
        cost: 4,
        apply: ({ self, logs, other }) => {
            if (other.hp < (other.maxHp * 0.2) && !other.isHero) {
                logs.push(`${self.name} usa death_blow eliminando ${other.name} che aveva ${other.hp}hp.`)
                other.damage += other.hp + 1;
                return true;
            }
        }
    },
    bleeding_attack: {
        cost: 1,
        apply: ({ self, logs, other }) => {
            if (other.isHero)
                return;
            const new_damage = other.maxHp * 0.1;
            logs.push(`${self.name} usa bleeding attack ed infligge ${new_damage} danni.`)
            other.damage += new_damage;
            return true;
        }
    },
    power_strike: {
        cost: 4,
        apply: ({ self, logs, other }) => {
            if(other.isHero || self.hp <= other.hp * 2)
                return;
            logs.push(`${self.name} usa bleeding attack ed infligge ${new_damage} danni.`)
            other.damage += other.hp + 1;
            return true;
        }
    },
    charge: {
        cost: 0,
        apply: ({ self, logs, other }) => {
            if(context.iteration != 1)
                return;        
            logs.push(`${self.name} usa charge ed infligge: ${self.atk * 8} danni.`);
            other.damage = self.atk * 8;
            return true;
        }
    },
}

effects[stages.AFTER_DAMAGE_APPLY] = {
    deflection: {
        cost: 1,
        apply: ({ self, other, logs }) => {
            if (other.skills.includes('penetration') && other.energy > 0) return;
            logs.push(`${self.name} usa deflection annullando ${self.damage}hp di danno [${self.energy - 1}ep]`)
            self.hp += self.damage;
            return true
        }
    },
    regeneration: {
        cost: 4,
        apply: ({ self, logs }) => {
            if (self.hp > self.maxHp * 0.75)
                return;
            const add_hp = self.maxHp * 0.25;
            logs.push(`${self.name} usa regeneration e si cura di ${add_hp}hp`)
            self.hp += add_hp;
            return true;
        }
    },
    revenge: {
        cost: 4,
        apply: ({ self, logs, other }) => {
            if (self.hp > 0)
                return;
            logs.push(`${self.name} usa revenge ed infligge 100 danni ad ${other.name}`)
            other.hp -= 100;
            return true;
        }
    },
    triumph: {
        cost: 3,
        apply: ({ self, logs, other }) => {
            if (other.hp > 0)
                return;
            logs.push(`${self.name} usa triumph e si cura completamente.`)
            self.hp = self.maxHp;
            return true;
        }
    },
    life_steal: {
        cost: 1,
        apply: ({ self, logs, other }) => {
            logs.push(`${self.name} si cura di ${other.damage}hp`)
            self.hp += other.damage;
            if(self.hp > self.maxHp)
                self.hp = self.maxHp;
            return true;
        }
    },
    determination: {
        cost: 0,
        apply: ({ self, logs }) => {
            logs.push(`${self.name} usa determination e ripristina 1 punto energia.`)
            self.energy += 1;
            if(self.energy > self.maxEnergy)
                self.energy = self.maxEnergy;
            return true;
        }
    },
    combat_skill: {
        cost: 0,
        apply: ({ self, logs }) => {
            logs.push(`${self.name} usa combat_skill e ripristina 1 punto energia.`)
            self.energy += 1;
            if(self.energy > self.maxEnergy)
                self.energy = self.maxEnergy;
            return true;
        }
    },
    drain: {
        cost: 1,
        apply: ({ self, logs, other }) => {
            other.energy -= 2;
            if (other.energy < 0)
                other.energy = 0;
            logs.push(`${self.name} usa drain e riduce di 2 l'energia dell'avversario. ${other.energy}`)
            return true;
        }
    },
    ferocity: {
        cost: 0,
        apply: ({ self, logs, other }) => {
            if(other.hp > 0)
                return;
            self.energy = self.maxEnergy;
            logs.push(`${self.name} usa ferocity e ripristina tutta l'energia.`);
            return true;
        }
    },
}



//CIAO!!!!


export default effects