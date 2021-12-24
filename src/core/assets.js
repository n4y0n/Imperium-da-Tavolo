import { images as unitsImages } from '../assets/units'
import { images as heroesImages } from '../assets/heroes'

const images = { heroes: { ...heroesImages }, units: { ...unitsImages } }

export const getHeroImage = code => images.heroes[code]
export const getUnitImage = code => images.units[code]