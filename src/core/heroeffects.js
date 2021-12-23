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

}

effects[stages.AFTER_DAMAGE] = {

}


export default effects