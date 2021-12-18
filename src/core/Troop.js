export default class Troop {
    constructor(name, hp, atk, def, civ, skills) {
        this.hp = parseInt(hp)
        this.atk = parseInt(atk)
        this.def = parseInt(def)
        this.name = name
        this.energy = 10
        this.skills = skills ?? []
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
        for (let i = 0; i < this.skils.length; i++) {
            const skill = this.skils[i];
            damage = skill(this, damage)
        }
        this.hp -= damage
    }
}
