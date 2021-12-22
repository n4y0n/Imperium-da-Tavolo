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
        apply: ({ self, damage }) => { self.atk += 40; damage.recompute = true }
    }
}

unitEffects[stages.AFTER_DAMAGE] = {
    immunity: {
        cost: 1,
        apply: ({ self, logs }) => {
            console.log(logs);
            logs.push(`${self.name} usa immunity annullando ${self.damage}hp di danno [${self.energy}ep]`)
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