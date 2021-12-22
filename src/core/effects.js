export const stages = {
    BEFORE_DAMAGE: 'before_damage#',
    WHILE_DAMAGE: 'while_damage#',
    AFTER_DAMAGE: 'after_damage#',
}

const heroEffects = {}
const unitEffects = {}

unitEffects[stages.BEFORE_DAMAGE] = {}

unitEffects[stages.WHILE_DAMAGE] = {
    "mirror_damage": {
        cost: 3,
        apply: ({ self, other, logs }) => {
            logs.push(`${self.name} usa mirror_damage riflettendo ${self.damage}hp di danno [${self.energy-3}ep]`)
            self.hp += self.damage;
            other.damage += self.damage;
        }
    }
}

unitEffects[stages.AFTER_DAMAGE] = {
    immunity: {
        cost: 1,
        apply: ({ self, logs }) => {
            logs.push(`${self.name} usa immunity annullando ${self.damage}hp di danno [${self.energy-1}ep]`)
            self.hp += self.damage;
        }
    },
}

export function applyTroopEffect(stage, effectCode, context) {
    if (!effectCode) return
    const skill = unitEffects[stage]?.[effectCode];
    if (!skill) return
    if (context.self.energy > skill.cost) {
        skill.apply(context)
        context.self.energy -= skill.cost
    }
}