import heroEffects from './heroeffects'
import unitEffects from './uniteffects'
import { actors } from './utils';

function applyEffectImpl(actor, stage, code, context) {
    if (!code) return
    const effectsMap = (actor !== actors.HERO ? unitEffects : heroEffects);
    if (effectsMap?.[code]) {
        if (context.self.isHero || context.self.energy > effectsMap[code].cost) {
            if (effectsMap[code]?.[stage]?.(context)) {
                context.self.energy -= effectsMap[code].cost
            }
        }
    }
}

export function applyEffect(stage, effectCode, context) {
    applyEffectImpl(context.self.isHero ? actors.HERO : actors.TROOP, stage, effectCode, context)
}
