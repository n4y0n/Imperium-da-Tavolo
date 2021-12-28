import { stages } from "./utils"
import cost  from "./effectscost"

const esempioEffetto = {
	cost: 1,
	apply: function ({ self, other, logs, selfPlayer, iteration }) {
	}
}

// NON ha a disposizione la variabile `self.damage` con il danno che gli verrà applicato
// `self` ha a disposizione self.hero e self.troop rispettivamente l'eroe che ha attivato la skill e la truppa corrente

// NON ha a disposizione la variabile `self.damage` con il danno che gli verrà applicato
const effects = {
	active: {
		cost: cost.active,
		[stages.BEFORE_DAMAGE]: ({ self, other, logs }) => {
			self.recoverAmount = 2;
			return true
		}
	},
	deflection: {
		cost: cost.deflection,
		[stages.BEFORE_DAMAGE]: ({ self, other, logs }) => {
			if (other.skills.includes('penetration') && other.energy > 0) return;
			logs.push(`${self.name} usa deflection annullando il danno`)
			self.def = 100;
			return true
		}
	},
	curse: {
		cost: cost.curse,
		[stages.BEFORE_DAMAGE]: ({ self, other, logs }) => {
			logs.push(`${self.name} usa curse e setta l'atk di ${other.name} a ${other.atk.toFixed(2)}`)
			other.atk = 0;
			return true
		}
	},
	defense_skill: {
		cost: cost.defense_skill,
		[stages.BEFORE_DAMAGE]: ({ self, logs }) => {
			const new_def = (self.energy * 2);
			logs.push(`${self.name} aumenta la sua difesa di: ${new_def.toFixed(2)}`);
			self.def += new_def;
			return true;
		}
	},
	charge: {
		cost: cost.charge,
		[stages.BEFORE_DAMAGE]: ({ self, logs, iteration }) => {
			if(iteration != 1)
				return;
			const new_atk = (self.atk * 8);
			logs.push(`${self.name} aumenta il suo attacco di: ${new_atk.toFixed(2)}`);
			self.def += new_def;
			return true;
		}
	},
	attack_skill: {
		cost: cost.attack_skill,
		[stages.BEFORE_DAMAGE]: ({ self, logs }) => {
			const new_atk = (self.energy * 2);
			logs.push(`${self.name} aumenta il suo attacco di: ${new_atk.toFixed(2)}`);
			self.atk += new_atk;
			return true;
		}
	},
	penetration: {
		cost: cost.penetration,
		[stages.BEFORE_DAMAGE]: ({ self, logs, other }) => {
			logs.push(`${self.name} ignora l'armatura di: ${other.name}`);
			other.def = 0;
			return true;
		}
	},
	triple_strike: {
		cost: cost.triple_strike,
		[stages.BEFORE_DAMAGE]: ({ self, logs, other }) => {
			const new_atk = self.atk * 3;
			logs.push(`${self.name} usa triple_strike ed infligge ${new_atk.toFixed(2)} danni ad ${other.name}`);
			self.atk = new_atk;
			return true;
		}
	},
	offensive_tactics: {
		cost: cost.offensive_tactics,
		[stages.BEFORE_DAMAGE]: ({ self, logs, other }) => {
			const new_atk = self.atk + self.level;
			logs.push(`${self.name} usa offensive_tactics ed infligge ${new_atk.toFixed(2)} danni ad ${other.name}`);
			self.atk = new_atk;
			return true;
		}
	},
	spike_armor: {
		cost: cost.spike_armor,
		[stages.AFTER_DAMAGE]: ({ self, other, logs }) => {
			logs.push(`${self.name} usa mirror_damage riflettendo ${self.damage.toFixed(2)}hp di danno [${self.energy - 1}ep]`)
			other.damage += self.damage;
			return true;
		}
	},
	expertise: {
		cost: cost.expertise,
		[stages.AFTER_DAMAGE]: ({ self, logs, other }) => {
			if ((self.level > other.level + 10) && !other.isHero) {
				other.hp = 0;
				logs.push(`${self.name} uccide all'istante: ${other.name}`);
				return true;
			}
		}
	},
	death_blow: {
		cost: cost.death_blow,
		[stages.AFTER_DAMAGE]: ({ self, logs, other }) => {
			if (other.hp < (other.maxHp * 0.2) && !other.isHero) {
				logs.push(`${self.name} usa death_blow eliminando ${other.name} che aveva ${other.hp.toFixed(2)}hp.`)
				other.hp = 0;
				return true;
			}
		}
	},
	power_strike: {
		cost: cost.power_strike,
		[stages.AFTER_DAMAGE]: ({ self, logs, other }) => {
			if (self.hp > (other.hp * 2) && !other.isHero) {
				logs.push(`${self.name} usa power_strike eliminando ${other.name} che aveva ${other.hp.toFixed(2)}hp.`)
				other.hp = 0;
				return true;
			}
		}
	},
	bleeding_attack: {
		cost: cost.bleeding_attack,
		[stages.AFTER_DAMAGE]: ({ self, logs, other }) => {
			if (other.isHero)
				return;
			const new_damage = other.maxHp * 0.1;
			logs.push(`${self.name} usa bleeding attack ed infligge ${new_damage.toFixed(2)} danni.`)
			other.damage += new_damage;
			return true;
		}
	},
	revenge: {
		cost: cost.revenge,
		[stages.AFTER_DAMAGE]: ({ self, logs, other }) => {
			if (self.hp > 0)
				return;
			logs.push(`${self.name} usa revenge ed infligge 100 danni ad ${other.name}`)
			other.hp -= 100;
			return true;
		}
	},
	regeneration: {
		cost: cost.regeneration,
		[stages.AFTER_DAMAGE]: ({ self, logs }) => {
			if (self.hp > self.maxHp * 0.75)
				return;
			const add_hp = self.maxHp * 0.15;
			logs.push(`${self.name} usa regeneration e si cura di ${add_hp.toFixed(2)}hp`)
			self.hp += add_hp;
			return true;
		}
	},
	healing: {
		cost: cost.healing,
		[stages.AFTER_DAMAGE]: ({ self, logs, selfPlayer }) => {
			selfPlayer.troop.hp += (20 + self.level);
			if(selfPlayer.troop.hp > selfPlayer.troop.maxHp)
				selfPlayer.troop.hp = selfPlayer.troop.maxHp;
			logs.push(`${self.name} usa healing e cura ${selfPlayer.troop.name} di ${20 + self.level}`);
			return true;
		}
	},
	triumph: {
		cost: cost.triumph,
		[stages.AFTER_DAMAGE]: ({ self, logs, other }) => {
			if (other.hp > 0)
				return;
			logs.push(`${self.name} usa triumph e si cura completamente.`)
			self.hp = self.maxHp;
			return true;
		}
	},
	life_steal: {
		cost: cost.life_steal,
		[stages.AFTER_DAMAGE]: ({ self, logs, other }) => {
			logs.push(`${self.name} si cura di ${other.damage.toFixed(2)}hp`)
			self.hp += other.damage;
			if (self.hp > self.maxHp)
				self.hp = self.maxHp;
			return true;
		}
	},
	determination: {
		cost: cost.determination,
		[stages.AFTER_DAMAGE]: ({ self, logs }) => {
			logs.push(`${self.name} usa determination e ripristina 1 punto energia.`)
			self.energy++;
			if (self.energy > self.maxEnergy) {
				self.energy = self.maxEnergy
			}
			return true;
		}
	},
	combat_skill: {
		cost: cost.combat_skill,
		[stages.AFTER_DAMAGE]: ({ self, logs }) => {
			logs.push(`${self.name} usa combat_skill e ripristina 1 punto energia.`)
			self.energy++;
			if (self.energy > self.maxEnergy) {
				self.energy = self.maxEnergy
			}
			return true;
		}
	},
	drain: {
		cost: cost.drain,
		[stages.AFTER_DAMAGE]: ({ self, logs, other }) => {
			self.energy -= 2;
			if (self.energy < 0) {
				self.energy = 0
			}
			logs.push(`${self.name} usa drain e riduce di 2 l'energia dell'avversario. ${other.energy.toFixed(2)}`)
			return true;
		}
	},
	cripple: {
		cost: cost.cripple,
		[stages.AFTER_DAMAGE]: ({ self, logs, other }) => {
			other.energy = 0;
			logs.push(`${self.name} usa cripple e azzera l'energia dell'avversario.`)
			return true;
		}
	},
}

export default effects