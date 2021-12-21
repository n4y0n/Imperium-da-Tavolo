export function getMaxTroops (civilization) {
    switch (civilization) {
        default: return 5;
    }
}

export function getImageForHero(loc) {
    const [civCode, name] = loc.split('_')
    const civ = getCiv(civCode)
    return import(`./assets/heroes/${civ}/${name}.png`)
}

function getCiv(civCode) {
    switch(civCode) {
        case 'r': return 'roma'
        case 'e': return 'egitto'
        case 'c': return 'cartagine'
        case 'b': return 'britannia'
        case 't': return 'germania'
        case 'g': return 'gallia'
        case 'i': return 'iberia'
        default: throw new Error("Unknown civilization")
    }
}

//   dead() {
//     for (let i = 0; i < this._MAX_TROOPS; i++) {
//       if (this._troops[i]) {
//         this._troops[i] = null
//         break
//       }
//     }
//   }

//   setTroop(position, troop) {
//     if (position >= 0 && position < this._MAX_TROOPS) {
//       console.log(`Troop at ${position} set to ${troop.name}`);
//       this._troops[position] = troop
//     }
//   }

//   toReactState() {
//     return {
//       toops: this.troops,
//       hero: {
//         name: this.name,
//         hp: this.hp,
//         atk: this.atk,
//         def: this.def,
//         civ: this.civ,
//         skills: this.skills,
//         _level: this.level,
//         _MAX_TROOPS: this.maxTroops
//       }
//     }
//   }

//   fromReactState({ hero, troops }) {
//     for (const [prop, value] of Object.entries(hero)) {
//       this[prop] = value
//     }
//     for (let position = 0; position < troops.length; position++) {
//       const troop = troops[position];
//       this.setTroop(position, troop)
//     }
//   }