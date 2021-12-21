import units from '../assets/units'
import { useEffect, useState } from 'react';
import { getUnitImage } from '../core/assets'

function UnitaDisponibili({ civ, onSelected, ...props }) {
  const unitList = units[civ]
  return (
    <div {...props}>
      {unitList.map(unit => (
        <div onClick={() => onSelected({ ...unit })} className='pl-1 flex gap-2 items-center cursor-pointer border-solid border-2 m-3' key={civ + unit.name}>
          <img width={80} src={getUnitImage(unit.image)} />
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

  useEffect(() => setCiv(hero.civ), [])

  for (let p = 0; p < hero.maxTroops; p++) {
    // posizioni.push(<option key={p} value={p}>{p}</option>)
    posizioni.push(
      (
        <span onClick={() => setPos(p)} key={p}>
          <label htmlFor={p}> P{p} </label>
          <input id={p} name="posizione" key={p} type="radio" /> |
        </span>
      )
    )
  }

  const addTroop = (position, troop) => {
    onChange?.({ position, troop })
  }

  return (
    <div className="flex flex-col items-center" {...props}>
      {/* <select className='align-bottom' onChange={e => setPos(e.target.value)}> */}
      <form action="">
        {posizioni}
      </form>
      {/* </select> */}
      <select className='align-bottom' onChange={e => setCiv(e.target.value)}>
        {Object.keys(units).map(civ => <option selected={civ === hero.civ} key={civ} value={civ}>{civ}</option>)}
      </select>

      <h1 className='text-xl font-bold mt-2'>Truppe disponibili</h1>
      {civ ? <UnitaDisponibili onSelected={unita => addTroop(pos, unita)} className="mt-3" civ={civ} /> : null}
    </div>
  )
}

export default TroopSelectComp
