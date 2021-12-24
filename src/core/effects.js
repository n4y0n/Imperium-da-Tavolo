import heroEffects from './heroeffects'
import unitEffects from './uniteffects'
import { actors } from './utils';

function applyEffectImpl(actor, stage, code, context) {
    if (!code) return
    const skill = (actor !== actors.HERO ? unitEffects : heroEffects)[stage]?.[code];
    if (!skill) return
    if (context.self.energy > skill.cost) {
        if (skill.apply(context))
            context.self.energy -= skill.cost
    }
}

export function applyEffect(stage, effectCode, context) {
    applyEffectImpl(context.self.isHero ? actors.HERO : actors.TROOP, stage, effectCode, context)
}
