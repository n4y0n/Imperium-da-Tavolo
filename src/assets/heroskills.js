import csv_file from './skill_hero.csv'

// SKILL ICONS HERO
import administration from './skill_icon_hero/administration.png'
import assault from './skill_icon_hero/assault.png'
import battlecry from './skill_icon_hero/battlecry.png'
import ceasefire from './skill_icon_hero/ceasefire.png'
import charge from './skill_icon_hero/charge.png'
import defensivecry from './skill_icon_hero/defensivecry.png'
import divinegrace from './skill_icon_hero/divine_grace.png'
// import concealment from './skill_icon_hero/concealment.png'
import concealment from './anonymous.jpg'

import dodge from './skill_icon_hero/dodge.png'
import epicarmor from './skill_icon_hero/epicarmor.png'
import epicattack from './skill_icon_hero/epicattack.png'
import epicendurance from './skill_icon_hero/epicendurance.png'
import euphoria from './skill_icon_hero/euphoria.png'
import frenzy from './skill_icon_hero/frenzy.png'
import healing from './skill_icon_hero/healing.png'
import leadership from './skill_icon_hero/leadership.png'
import quickmarch from './skill_icon_hero/quickmarch.png'
import recovery from './skill_icon_hero/recovery.png'
import scout from './skill_icon_hero/scout.png'
import survival from './skill_icon_hero/survival.png'
import teamattack from './skill_icon_hero/teamattack.png'
import teamdefense from './skill_icon_hero/teamdefence.png'
import vigor from './skill_icon_hero/vigor.png'
import wisdom from './skill_icon_hero/wisdom.png'

export const images = {
    administration,
    concealment,
    assault,
    battlecry,
    ceasefire,
    charge,
    defensivecry,
    divinegrace,
    dodge,
    epicarmor,
    epicattack,
    epicendurance,
    euphoria,
    frenzy,
    healing,
    leadership,
    quickmarch,
    recovery,
    scout,
    survival,
    teamattack,
    teamdefense,
    vigor,
    wisdom
}
const info = {}
for (const { ID, ID_STRING, NOME, EFFETTO, IMG } of csv_file) {
    info[ID_STRING] = {
        name: NOME,
        id: ID_STRING,
        description: EFFETTO,
        image: IMG
    }
}
export default info