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
}

// Ha a disposizione la variabile `self.damage` con il danno che gli verrà applicato
effects[stages.AFTER_DAMAGE_COMPUTE] = {

}

effects[stages.AFTER_DAMAGE_APPLY] = {

}


export default effects