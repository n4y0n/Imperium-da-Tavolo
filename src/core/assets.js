import { images as unitsImages } from '../assets/units'
import { images as heroesImages } from '../assets/heroes'
import heroSkillInfo, { images as heroeSkillsImages } from '../assets/heroskills'
import heroItemInfo, { images as heroeItemsImages } from '../assets/heroitems'
import unitSkillInfo, { images as unitSkillsImages } from '../assets/unitskills'

export const getHeroImage = code => heroesImages[code]
export const getUnitImage = code => unitsImages[code]

export const getHeroSkillImage = code => heroeSkillsImages[code]
export const getHeroSkill = code => {
    return { ...heroSkillInfo[code], img: getHeroSkillImage(code) }
}

export const getHeroItemImage = code => heroeItemsImages[code]
export const getHeroItem = code => {
    return { ...heroItemInfo[code], img: getHeroItemImage(code) }
}

export const getUnitSkillImage = code => unitSkillsImages[code]
export const getUnitSkill = code => {
    return { ...unitSkillInfo[code], img: getUnitSkillImage(code) }
}