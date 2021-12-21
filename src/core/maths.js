export const computeDamage = (self, other) => {
    return self.atk - ((self.atk / 100) * other.def);
}