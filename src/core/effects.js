import heroEffects from './heroeffects'
import unitEffects from './uniteffects'
import { actors } from './utils';

function appyEffect(actor, stage, code, context) {
    if (!code) return
    const skill = (actor !== actors.HERO ? unitEffects : heroEffects)[stage]?.[code];
    if (!skill) return
    if (context.self.energy > skill.cost) {
        if (skill.apply(context))
            context.self.energy -= skill.cost
    }
}

export function applyTroopEffect(stage, effectCode, context) {
    appyEffect(actors.TROOP, stage, effectCode, context)
}

export function applyHeroEffect(stage, effectCode, context) {
    appyEffect(actors.HERO, stage, effectCode, context)
}