export default class Troop {
    constructor(name = "Legionari", hp = 100, atk = Math.ceil(Math.random() * 10), def = Math.ceil(Math.random() * 5), civ) {
        this.hp = hp
        this.atk = atk
        this.def = def
        this.name = name
        this.energy = 10
        this.skils = []
        this.civ = civ

        this.isHero = false
    }

    get alive() {
        return this.hp > 0
    }

    computeDamage(other) {
        return this.atk - ((this.atk / 100) * other.def);
    }

    applyDamage(damage) {
        // Applica skills qui
        for (let i = 0; i < this.skils.length; i++) {
            const skill = this.skils[i];
            damage = skill(this, damage)
        }

        this.hp -= damage
    }
}
