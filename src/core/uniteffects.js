import { stages } from "./utils"

const effects = {}

const esempioNome = 'example'
const esempioEffetto = {
    cost: 1,
    apply: function ({ self, other, logs }) {
    }
}

// NON ha a disposizione la variabile `self.damage` con il danno che gli verrà applicato
effects[stages.BEFORE_DAMAGE] = {
    [esempioNome]: esempioEffetto
}

// Ha a disposizione la variabile `self.damage` con il danno che gli verrà applicato
effects[stages.WHILE_DAMAGE] = {
    "mirror_damage": {
        cost: 1,
        apply: ({ self, other, logs }) => {
            logs.push(`${self.name} usa mirror_damage riflettendo ${self.damage}hp di danno [${self.energy - 1}ep]`)
            self.hp += self.damage;
            other.damage += self.damage;
        }
    }
}

effects[stages.AFTER_DAMAGE] = {
    immunity: {
        cost: 1,
        apply: ({ self, logs }) => {
            logs.push(`${self.name} usa immunity annullando ${self.damage}hp di danno [${self.energy - 1}ep]`)
            self.hp += self.damage;
        }
    },
}


export default effects