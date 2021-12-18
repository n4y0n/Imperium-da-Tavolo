import units from '../assets/units'
import { useState } from 'react';

function UnitaDisponibili({ civ, ...props }) {
  const unitList = units[civ]
  return (
    <div {...props}>
      {unitList.map(unit => (
        <div key={civ+unit.name}>
          {unit.name.split('_').join(' ')}
        </div>
      ))}
    </div>
  )
}

function TroopComp({ hero, ...props }) {
    const [civ, setCiv] = useState(hero.civ)

    return (
        <div className="flex flex-col items-center" {...props}>
            <select className='align-bottom' onChange={e => setCiv(e.target.value)}>
                {Object.keys(units).map(civ => <option key={civ} value={civ}>{civ}</option>)}
            </select>

            <h1 className='text-xl font-bold mt-2'>Truppe disponibili</h1>
            {civ ? <UnitaDisponibili className="mt-3" civ={civ} /> : null}
        </div>
    )
}

export default TroopComp
