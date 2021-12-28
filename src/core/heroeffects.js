import { stages } from "./utils"

const esempioEffetto = {
    cost: 1,
    apply: function ({ self, other, logs, selfPlayer, otherPlayer, iteration }) {
    }
}

const effects = {
	charge: {
		cost: 0,
		[stages.BEFORE_BATTLE]: ({ self, logs, selfPlayer }) => {
			logs.push(`${self.name} usa charge e aumenta l'energia di tutte le truppe di 5`)
			for(const troop of selfPlayer.troops) {
				troop.maxEnergy += 5;
				troop.energy = troop.maxEnergy;
			}
			return true;
		}
	},
	teamattack: {
		cost: 0,
		[stages.BEFORE_BATTLE]: ({ self, logs, selfPlayer }) => {
			const add_atk = selfPlayer.troops.length * 2;
			logs.push(`${self.name} usa teamattack e aumenta l'atk di tutte le truppe di ${add_atk}`)
			for(const troop of selfPlayer.troops) {
				troop.atk += add_atk;
			}
			return true;
		}
	},
	teamdefense: {
		cost: 0,
		[stages.BEFORE_BATTLE]: ({ self, logs, selfPlayer }) => {
			const add_def = selfPlayer.troops.length * 2;
			logs.push(`${self.name} usa teamdefense e aumenta l'def di tutte le truppe di ${add_def}`)
			for(const troop of selfPlayer.troops) {
				troop.def += add_def;
			}
			return true;
		}
	},
	epicarmor: {
		cost: 0,
		[stages.BEFORE_BATTLE]: ({ self, logs, selfPlayer }) => {
			logs.push(`${self.name} usa epicarmor e aumenta la sua difesa di 20`)
			self.def += 20;
			return true;
		}
	},
	epicattack: {
		cost: 0,
		[stages.BEFORE_BATTLE]: ({ self, logs, selfPlayer }) => {
			logs.push(`${self.name} usa epicattack e aumenta il suo attacco di 20`)
			self.atk += 20;
			return true;
		}
	},
	epicendurance: {
		cost: 0,
		[stages.BEFORE_BATTLE]: ({ self, logs, selfPlayer }) => {
			logs.push(`${self.name} usa epicendurance e aumenta la sua vita di 1000`)
			self.maxHp += 1000;
			self.hp = self.maxHp;
			return true;
		}
	},
	concealment: {
		cost: 0,
		[stages.BEFORE_DAMAGE]: ({ self, logs, selfPlayer }) => {
			if(Math.round(Math.random() * 99) > 5)
				return;
			logs.push(`${self.name} usa concealment e le truppe schivano il danno nemico.`)
			for(const troop of selfPlayer.troops) {
				troop.def = 100;
			}
			return true;
		}
	},
	concealment: {
		cost: 0,
		[stages.BEFORE_DAMAGE]: ({ self, logs, selfPlayer }) => {
			if(Math.round(Math.random() * 99) > 5)
				return;
			logs.push(`${self.name} usa frenzy e le truppe duplicano il loro danno`)
			for(const troop of selfPlayer.troops) {
				troop.atk *= 2;
			}
			return true;
		}
	},
	battlecry: {
		cost: 0,
		[stages.BEFORE_DAMAGE]: ({ self, logs, selfPlayer, otherPlayer }) => {
			const add_atk = otherPlayer.troops.length * 2;
			logs.push(`${self.name} usa battlecry e aumenta l'atk di tutte le truppe di ${add_atk}`)
			for(const troop of selfPlayer.troops) {
				troop.atk += add_atk;
			}
			return true;
		}
	},
	defensivecry: {
		cost: 0,
		[stages.BEFORE_DAMAGE]: ({ self, logs, selfPlayer, otherPlayer }) => {
			const add_def = otherPlayer.troops.length * 2;
			logs.push(`${self.name} usa defensivecry e aumenta la def di tutte le truppe di ${add_def}`)
			for(const troop of selfPlayer.troops) {
				troop.def += add_def;
			}
			return true;
		}
	},
	divinegrace: {
		cost: 0,
		[stages.BEFORE_DAMAGE]: ({ self, logs }) => {
			if(self.divinegrace == true || self.hp > (self.maxHp * 0.25))
				return;
			self.divinegrace = true;
			const heal_up = 250;
			logs.push(`${self.name} usa divinegrace e si cura di ${heal_up}`)
			self.hp += 250;
			return true;
		}
	},
	euphoria: {
		cost: 0,
		[stages.BEFORE_DAMAGE]: ({ self, other, logs, selfPlayer, otherPlayer }) => {
			if(other.hp > 0)
				return;
			logs.push(`${self.name} usa euphoria e ripristina 5 energia a tutte le sue truppe.`);
			for(const troop of selfPlayer.troops) {
				troop.energy += 5;
				if(troop.energy > troop.maxEnergy)
					troop.energy = troop.maxEnergy;
			}
			return true;
		}
	},
	healing: {
		cost: 0,
		[stages.BEFORE_DAMAGE]: ({ self, other, logs, selfPlayer, otherPlayer }) => {
			if(other.hp > 0)
				return;
			logs.push(`${self.name} usa healing e ripristina 100 pv a tutte le sue truppe.`);
			for(const troop of selfPlayer.troops) {
				troop.hp += 100;
				if(troop.hp > troop.maxHp)
					troop.hp = troop.maxHp;
			}
			return true;
		}
	},

	//###############################################################################################
	//###########################				ITEMS				#################################
	//###############################################################################################

	bear_teeth: {
		cost: 0,
		[stages.BEFORE_BATTLE]: ({ self, logs, selfPlayer }) => {
			logs.push(`${self.name} usa l'oggetto bear teeth aumenta l'attacco di tutte le truppe di 4 punti.`)
			for(const troop of selfPlayer.troops) {
				troop.atk += 4;
			}
			return true;
		}
	},
	charm_of_thot: {
		cost: 0,
		[stages.BEFORE_BATTLE]: ({ self, logs, selfPlayer }) => {
			logs.push(`${self.name} usa l'oggetto charm of thot aumenta l'attacco di tutte le truppe di 4 punti.`)
			for(const troop of selfPlayer.troops) {
				troop.atk += 4;
			}
			return true;
		}
	},
	charm_of_seth: {
		cost: 0,
		[stages.BEFORE_BATTLE]: ({ self, logs, selfPlayer }) => {
			logs.push(`${self.name} usa l'oggetto charm of seth aumenta la difesa di tutte le truppe di 4 punti.`)
			for(const troop of selfPlayer.troops) {
				troop.def += 4;
			}
			return true;
		}
	},
	charm_of_ra: {
		cost: 0,
		[stages.BEFORE_BATTLE]: ({ self, logs, selfPlayer }) => { 
			logs.push(`${self.name} usa l'oggetto charm_of_ra e aumenta la vita di tutte le truppe di 50.`)
			for(const troop of selfPlayer.troops) {
				troop.maxHp += 50;
				troop.hp = troop.maxHp;
			}
			return true;
		}
	},
	golden_ank: {
		cost: 0,
		[stages.BEFORE_BATTLE]: ({ self, logs, selfPlayer }) => {
			const newhp = self.level * 5;
			logs.push(`${self.name} usa l'oggetto golden_ank aumenta gli hp di tutte le truppe di ${newhp}`)
			for(const troop of selfPlayer.troops) {
				troop.maxHp += newhp;
				troop.hp = troop.maxHp;
			}
			return true;
		}
	},
	fur_gloves: {
		cost: 0,
		[stages.BEFORE_BATTLE]: ({ self, logs, selfPlayer }) => {
			logs.push(`${self.name} usa l'oggetto fur_gloves e aumenta i suoi hp di 1000.`)
			self.maxHp += 1000;
			self.hp = self.maxhp;
			return true;
		}
	},
	eagle_feather: {
		cost: 0,
		[stages.BEFORE_BATTLE]: ({ self, logs, selfPlayer }) => {
			logs.push(`${self.name} usa eagle_feather e aumenta i suoi hp di 400 e quelli delle truppe di 200`)
			self.maxhp += 400;
			self.hp = self.maxhp;
			for(const troop of selfPlayer.troops) {
				troop.maxHp += 200;
				troop.hp = troop.maxHp;
			}
			return true;
		}
	},
	silver_ank: {
		cost: 0,
		[stages.BEFORE_BATTLE]: ({ self, logs, selfPlayer }) => {
			logs.push(`${self.name} usa silver ank e tutte le truppe recuperano l'energia ogni 3 scazzottate`)
			self.recoverTime = 3;
			for(const troop of selfPlayer.troops) {
				troop.recoverTime = 3;
			}
			return true;
		}
	},
	fire_stone: {
		cost: 0,
		[stages.BEFORE_BATTLE]: ({ self, logs, selfPlayer }) => {
			logs.push(`${self.name} usa l'oggetto fire_stone aumenta l'attacco di se stesso e di tutte le truppe di 20 punti, ma la difesa diventa 0.`)
			self.atk += 20;
			self.def = 0;
			for(const troop of selfPlayer.troops) {
				troop.atk += 20;
				troop.def = 0;
			}
			return true;
		}
	},
	veteran_offence: {
		cost: 0,
		[stages.BEFORE_BATTLE]: ({ self, logs, selfPlayer }) => {
			logs.push(`${self.name} usa l'oggetto veteran_offence aumenta l'attacco di tutte le truppe di 5 punti.`)
			for(const troop of selfPlayer.troops) {
				troop.atk += 5;
			}
			return true;
		}
	},
	veteran_defender: {
		cost: 0,
		[stages.BEFORE_BATTLE]: ({ self, logs, selfPlayer }) => {
			logs.push(`${self.name} usa l'oggetto veteran_defender aumenta la difesa di tutte le truppe di 10 punti.`)
			for(const troop of selfPlayer.troops) {
				troop.def += 10;
			}
			return true;
		}
	},
	divine_dex: {
		cost: 0,
		[stages.BEFORE_BATTLE]: ({ self, logs, selfPlayer }) => {
			if(Math.round(Math.random() * 99) > 5)
				return;
			logs.push(`${self.name} usa l'oggetto divine_dex che fa schivare l'attacco alle sue truppe.`)
			for(const troop of selfPlayer.troops) {
				troop.def = 100;
			}
			return true;
		}
	},
	triumph_amulet: {
		cost: 0,
		[stages.AFTER_DAMAGE]: ({ self, other, logs, selfPlayer, otherPlayer }) => {
			if(other.hp > 0)
				return;
			logs.push(`${self.name} usa triumph_amulet e ripristina 100 pv a tutte le sue truppe.`);
			self.hp = self.maxHp;
			for(const troop of selfPlayer.troops) {
				troop.hp += 100;
				if(troop.hp > troop.maxHp)
					troop.hp = troop.maxHp;
			}
			return true;
		}
	},
	elephant_thoot: {
		cost: 0,
		[stages.AFTER_DAMAGE]: ({ self, other, logs }) => {
			if(other.hp > 0)
				return;
			logs.push(`${self.name} usa elephant_thoot e si cura di 50 pv.`);
			self.hp += 50;
			if(self.hp > self.maxHp)
				self.hp = self.maxHp;
			return true;
		}
	},
	divine_luck: {
		cost: 0,
		[stages.AFTER_DAMAGE]: ({ self, other, logs, selfPlayer, otherPlayer }) => {
			if(Math.round(Math.random() * 99) > 20 || selfPlayer.troop?.hp > 0)
				return;
			logs.push(`${self.name} usa divine_luck e le sue truppe tornano in vita.`);
			for(const troop of selfPlayer.troops) {
				troop.hp = troop.maxHp * 0.05;
			}
			return true;
		}
	},

}

export default effects