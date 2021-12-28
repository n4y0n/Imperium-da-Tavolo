import csv_file from './items.csv'
import not_found from './anonymous.jpg'

// ITEM ICONS
import bear_teeth from './item_icon/bear_teeth.png'
import boar_teeth from './item_icon/boar_teeth.png'
import boots from './item_icon/boots.png'
import charm_of_isis from './item_icon/charm_of_isis.png'
import charm_of_ra from './item_icon/charm_of_ra.png'
import charm_of_seth from './item_icon/charm_of_seth.png'
import charm_of_thot from './item_icon/charm_of_thot.png'
import divine_dex from './item_icon/divine_dex.png'
import divine_luck from './item_icon/divine_luck.png'
import eagle_feather from './item_icon/eagle_feather.png'
import elephant_thoot from './item_icon/elephant_thoot.png'
import fire_stone from './item_icon/fire_stone.png'
import fur_gloves from './item_icon/fur_gloves.png'
import gold from './item_icon/gold.png'
import golden_ank from './item_icon/golden_ank.png'
import noble_defence from './item_icon/noble_defence.png'
import silver_ank from './item_icon/silver_ank.png'
import triumph_amulet from './item_icon/triumph_amulet.png'
import veteran_defender from './item_icon/veteran_defender.png'
import veteran_offence from './item_icon/veteran_offence.png'
import war_drums from './item_icon/war_drums.png'

export const images = {
    bear_teeth,
    boar_teeth,
    boots,
    charm_of_isis,
    charm_of_ra,
    charm_of_seth,
    charm_of_thot,
    divine_dex,
    divine_luck,
    eagle_feather,
    elephant_thoot,
    fire_stone,
    fur_gloves,
    gold,
    golden_ank,
    noble_defence,
    silver_ank,
    triumph_amulet,
    veteran_defender,
    veteran_offence,
    war_drums
}

const info = {}
for (const { id, name, text, img } of csv_file) {
    info[id] = {
        name: name,
        id: id,
        description: text,
        image: img
    }

    if (!images[id]) {
        images[id] = not_found;
    }
}
export default info