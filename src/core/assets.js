import { images as unitsImages } from '../assets/units'
import { images as heroesImages } from '../assets/heroes'
import heroSkillInfo, { images as heroeSkillsImages } from '../assets/heroskills'
import heroItemInfo, { images as heroeItemsImages } from '../assets/heroitems'
import unitSkillInfo, { images as unitSkillsImages } from '../assets/unitskills'

export const getHeroImage = code => heroesImages[code]
export const getUnitImage = code => unitsImages[code]

export const getHeroSkillImage = code => heroeSkillsImages[code]
export const getHeroSkill = code => heroSkillInfo[code]

export const getHeroItemImage = code => heroeItemsImages[code]
export const getHeroItem = code => heroItemInfo[code]

export const getUnitSkillImage = code => unitSkillsImages[code]
export const getUnitSkill = code => unitSkillInfo[code]