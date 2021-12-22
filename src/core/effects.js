/**
 * @param {{ player }} context 
 */
function effectName(context) { }









export function getEffect(code) {
    return (ctx) => console.log(`Execute effect "${code}" in context: `, ctx);
}

export function applyEffect(effectCode, context) {
    if (!effectCode) return
    return getEffect(effectCode)?.(context)
}

export function applyTroopEffect(effectCode, context) {
    if (!effectCode) return
    return getEffect(effectCode)?.(context)
}