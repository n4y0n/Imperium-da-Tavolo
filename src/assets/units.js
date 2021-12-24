import csv_file from './imperivm_stats.csv'

import b_arciere from './units/britannia/b_arciere.png'
import b_caledone from './units/britannia/b_caledone.png'
import b_caponormanno from './units/britannia/b_caponormanno.png'
import b_druid from './units/britannia/b_druid.png'
import b_guerriero from './units/britannia/b_guerriero.png'
import b_highlander from './units/britannia/b_highlander.png'
import b_javellotti from './units/britannia/b_javellotti.png'
import b_lanciere from './units/britannia/b_lanciere.png'
import c_berberassassin from './units/cartagine/c_berberassassin.png'
import c_elephant from './units/cartagine/c_elephant.png'
import c_javelin from './units/cartagine/c_javelin.png'
import c_libyan from './units/cartagine/c_libyan.png'
import c_maceman from './units/cartagine/c_maceman.png'
import c_noble from './units/cartagine/c_noble.png'
import c_shaman from './units/cartagine/c_shaman.png'
import c_tuareg from './units/cartagine/c_tuareg.png'
import e_anubis from './units/egitto/e_anubis.png'
import e_arciere from './units/egitto/e_arciere.png'
import e_axethrower from './units/egitto/e_axethrower.png'
import e_carro from './units/egitto/e_carro.png'
import e_guardian from './units/egitto/e_guardian.png'
import e_guerriero from './units/egitto/e_guerriero.png'
import e_horus from './units/egitto/e_horus.png'
import e_prete from './units/egitto/e_prete.png'
import g_arcere from './units/gallia/g_arcere.png'
import g_cavaliere from './units/gallia/g_cavaliere.png'
import g_druido from './units/gallia/g_druido.png'
import g_fand from './units/gallia/g_fand.png'
import g_guerriera from './units/gallia/g_guerriera.png'
import g_guerriero from './units/gallia/g_guerriero.png'
import g_guerriero_ascia from './units/gallia/g_guerriero_ascia.png'
import g_lancere from './units/gallia/g_lancere.png'
import t_arciere from './units/germania/t_arciere.png'
import t_axeman from './units/germania/t_axeman.png'
import t_huntress from './units/germania/t_huntress.png'
import t_maceman from './units/germania/t_maceman.png'
import t_priestess from './units/germania/t_priestess.png'
import t_teuton_archer from './units/germania/t_teuton_archer.png'
import t_teuton_knight from './units/germania/t_teuton_knight.png'
import t_teuton_rider from './units/germania/t_teuton_rider.png'
import t_valkyre from './units/germania/t_valkyre.png'
import t_warrior from './units/germania/t_warrior.png'
import i_arciere from './units/iberia/i_arciere.png'
import i_cavalry from './units/iberia/i_cavalry.png'
import i_defender from './units/iberia/i_defender.png'
import i_druid from './units/iberia/i_druid.png'
import i_eliteguard from './units/iberia/i_eliteguard.png'
import i_guerrigliero from './units/iberia/i_guerrigliero.png'
import i_lanciasassi from './units/iberia/i_lanciasassi.png'
import i_warrior from './units/iberia/i_warrior.png'
import r_arcere from './units/roma/r_arcere.png'
import r_carro from './units/roma/r_carro.png'
import r_equites from './units/roma/r_equites.png'
import r_gladiatore from './units/roma/r_gladiatore.png'
import r_legionario from './units/roma/r_legionario.png'
import r_liberatus from './units/roma/r_liberatus.png'
import r_prete from './units/roma/r_prete.png'
import r_pretoriano from './units/roma/r_pretoriano.png'
import r_princep from './units/roma/r_princep.png'
import tribuni from './units/roma/tribuni.png'
import velite from './units/roma/velite.png'


export const images = {
    b_arciere,
    b_caledone,
    b_caponormanno,
    b_druid,
    b_guerriero,
    b_highlander,
    b_javellotti,
    b_lanciere,
    c_berberassassin,
    c_elephant,
    c_javelin,
    c_libyan,
    c_maceman,
    c_noble,
    c_shaman,
    c_tuareg,
    e_anubis,
    e_arciere,
    e_axethrower,
    e_carro,
    e_guardian,
    e_guerriero,
    e_horus,
    e_prete,
    g_arcere,
    g_cavaliere,
    g_druido,
    g_fand,
    g_guerriera,
    g_guerriero,
    g_guerriero_ascia,
    g_lancere,
    t_arciere,
    t_axeman,
    t_huntress,
    t_maceman,
    t_priestess,
    t_teuton_archer,
    t_teuton_knight,
    t_teuton_rider,
    t_valkyre,
    t_warrior,
    i_arciere,
    i_cavalry,
    i_defender,
    i_druid,
    i_eliteguard,
    i_guerrigliero,
    i_lanciasassi,
    i_warrior,
    r_arcere,
    r_carro,
    r_equites,
    r_gladiatore,
    r_legionario,
    r_liberatus,
    r_prete,
    r_pretoriano,
    r_princep,
    tribuni,
    velite
}

const unitas = {}
for (const { nome, hp, atk, def, image, ability1, ability2 } of csv_file) {
    const [civ, name] = nome?.split('#')
    if (!civ) continue

    if (unitas[civ]) {
        unitas[civ].push({ name: name.split('_').join(' '), id: nome, isHero: false, maxHp: parseInt(hp), hp: parseInt(hp), atk: parseInt(atk), def: parseInt(def), civ, energy: 10, maxEnergy: 10, skills: [ability1.toLowerCase(), ability2.toLowerCase()], image })
    } else {
        unitas[civ] = [{ name: name.split('_').join(' '), id: nome, isHero: false, maxHp: parseInt(hp), hp: parseInt(hp), atk: parseInt(atk), def: parseInt(def), civ, energy: 10, maxEnergy: 10, skills: [ability1.toLowerCase(), ability2.toLowerCase()], image }]
    }
}
export default unitas