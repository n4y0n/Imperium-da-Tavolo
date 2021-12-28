import csv_file from './skill_units.csv'
import not_found from './anonymous.jpg'

// SKILL ICONS UNITS

export const images = {
}

const info = {}
for (const { ID, ID_STRING, NOME, EFFETTO, COSTO_PE, IMG } of csv_file) {
    info[ID_STRING] = {
        name: NOME,
        id: ID_STRING,
        description: EFFETTO,
        cost: COSTO_PE,
        image: IMG
    }

    if (!images[ID_STRING]) {
        images[ID_STRING] = not_found;
    }
}
export default info