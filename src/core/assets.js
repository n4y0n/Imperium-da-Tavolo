import { images as unitsImages } from '../assets/units'
import { images as heroesImages } from '../assets/heroes'
import heroSkillInfo, { images as heroeSkillsImages } from '../assets/heroskills'

export const getHeroImage = code => heroesImages[code]
export const getUnitImage = code => unitsImages[code]
export const getHeroSkillImage = code => heroeSkillsImages[code]
export const getHeroSkill = code => heroSkillInfo[code]