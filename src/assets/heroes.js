import csv_file from './imperivm_hero_stats.csv'
import { getMaxTroops } from '../core/utils'
import conf from '../core/configs'

import b_hero1 from './heroes/britannia/b_hero1.png'
import b_hero2 from './heroes/britannia/b_hero2.png'
import b_hero3 from './heroes/britannia/b_hero3.png'
import b_hero4 from './heroes/britannia/b_hero4.png'
import b_hero5 from './heroes/britannia/b_hero5.png'
import c_hero1 from './heroes/cartagine/c_hero1.png'
import c_hero2 from './heroes/cartagine/c_hero2.png'
import c_hero3 from './heroes/cartagine/c_hero3.png'
import c_hero4 from './heroes/cartagine/c_hero4.png'
import c_hero5 from './heroes/cartagine/c_hero5.png'
import e_hero1 from './heroes/egitto/e_hero1.png'
import e_hero2 from './heroes/egitto/e_hero2.png'
import e_hero3 from './heroes/egitto/e_hero3.png'
import e_hero4 from './heroes/egitto/e_hero4.png'
import e_hero5 from './heroes/egitto/e_hero5.png'
import g_hero1 from './heroes/gallia/g_hero1.png'
import g_hero2 from './heroes/gallia/g_hero2.png'
import g_hero3 from './heroes/gallia/g_hero3.png'
import g_hero4 from './heroes/gallia/g_hero4.png'
import g_hero5 from './heroes/gallia/g_hero5.png'
import t_hero1 from './heroes/germania/t_hero1.png'
import t_hero2 from './heroes/germania/t_hero2.png'
import t_hero3 from './heroes/germania/t_hero3.png'
import t_hero4 from './heroes/germania/t_hero4.png'
import t_hero5 from './heroes/germania/t_hero5.png'
import i_hero1 from './heroes/iberia/i_hero1.png'
import i_hero2 from './heroes/iberia/i_hero2.png'
import i_hero3 from './heroes/iberia/i_hero3.png'
import i_hero4 from './heroes/iberia/i_hero4.png'
import i_hero5 from './heroes/iberia/i_hero5.png'
import r_hero1 from './heroes/roma/r_hero1.png'
import r_hero2 from './heroes/roma/r_hero2.png'
import r_hero3 from './heroes/roma/r_hero3.png'
import r_hero4 from './heroes/roma/r_hero4.png'
import r_hero5 from './heroes/roma/r_hero5.png'

export const images = {
    b_hero1,
    b_hero2,
    b_hero3,
    b_hero4,
    b_hero5,
    c_hero1,
    c_hero2,
    c_hero3,
    c_hero4,
    c_hero5,
    e_hero1,
    e_hero2,
    e_hero3,
    e_hero4,
    e_hero5,
    g_hero1,
    g_hero2,
    g_hero3,
    g_hero4,
    g_hero5,
    t_hero1,
    t_hero2,
    t_hero3,
    t_hero4,
    t_hero5,
    i_hero1,
    i_hero2,
    i_hero3,
    i_hero4,
    i_hero5,
    r_hero1,
    r_hero2,
    r_hero3,
    r_hero4,
    r_hero5,
}

const unitas = {}
for (const element of csv_file) {
    const { hp, atk, def, nome, img } = element;

    const [civ, name] = nome?.split('#')
    if (!civ) continue

    if (unitas[civ]) {
        unitas[civ].push({ name, id: nome, hp: parseInt(hp), atk: parseInt(atk), def: parseInt(def), civ, energy: conf.MAX_ENERY, maxEnergy: conf.MAX_ENERY, skills: [], maxTroops: getMaxTroops(civ), level: 0, image: img, maxHp: parseInt(hp), isHero: true, recoverTime: conf.RECOVERY_TIME, recoverAmount: conf.RECOVERY_AMOUNT, items: [] })
    } else {
        unitas[civ] = [{ name, id: nome, hp: parseInt(hp), atk: parseInt(atk), def: parseInt(def), civ, energy: conf.MAX_ENERY, maxEnergy: conf.MAX_ENERY, skills: [], maxTroops: getMaxTroops(civ), level: 0, image: img, maxHp: parseInt(hp), isHero: true, recoverTime: conf.RECOVERY_TIME, recoverAmount: conf.RECOVERY_AMOUNT, items: [] }]
    }
}

export default unitas