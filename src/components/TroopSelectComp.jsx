import units from '../assets/units'
import { useState } from 'react';
import img from '../assets/anonymous.jpg'

function UnitaDisponibili({ civ, onSelected, ...props }) {
  const unitList = units[civ]
  return (
    <div {...props}>
      {unitList.map(unit => (
        <div onClick={() => onSelected(unit)} className='pl-1 flex gap-2 items-center cursor-pointer border-solid border-2 m-3' key={civ + unit.name}>
          <img width={80} src={img} />
          {unit.name.split('_').join(' ')}
        </div>
      ))}
    </div>
  )
}

function TroopSelectComp({ hero, onChange, ...props }) {
  const [civ, setCiv] = useState(hero.civ)
  const [pos, setPos] = useState(0)
  const posizioni = []

  for (let p = 0; p < hero.maxTroops; p++) {
    posizioni.push(<option key={p} value={p}>{p}</option>)
  }

  const addTroop = (position, troop) => {
    hero.setTroop(position, troop)
    onChange?.(hero)
  }

  return (
    <div className="flex flex-col items-center" {...props}>
      <select className='align-bottom' onChange={e => setPos(e.target.value)}>
        {posizioni}
      </select>
      <select className='align-bottom' onChange={e => setCiv(e.target.value)}>
        {Object.keys(units).map(civ => <option key={civ} value={civ}>{civ}</option>)}
      </select>

      <h1 className='text-xl font-bold mt-2'>Truppe disponibili</h1>
      {civ ? <UnitaDisponibili onSelected={unita => addTroop(pos, unita)} className="mt-3" civ={civ} /> : null}
    </div>
  )
}

export default TroopSelectComp
