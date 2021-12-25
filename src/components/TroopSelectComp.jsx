import units from '../assets/units'
import { useEffect, useState } from 'react';
import { getUnitImage } from '../core/assets'
import { useSelector, useDispatch } from 'react-redux';
import { setTroop, setTroopPointer } from '../store/game'

function UnitaDisponibili({ civ, onSelected }) {
  if (!civ) return null
  const unitList = units[civ]
  if (!unitList) return null
  return (
    <div className='mt-3'>
      {unitList.map(unit => (
        <div onClick={() => onSelected({ ...unit })} className='pl-1 grid grid-cols-2 gap-2 cursor-pointer border-solid border-2 m-3 shadow-md hover:shadow-sm' key={civ + unit.name}>
          <div className='flex gap-2 border-r border-r-green-800'>
            <div>
              <div className='flex items-center min-h-full'>
                <img width={80} src={getUnitImage(unit.image)} />
              </div>
            </div>
            <div className='flex flex-col gap-1'>
              <div className='font-bold'>
                Name: {unit.name.split('_').join(' ')}
              </div>
              <span>Hp: {unit.hp}</span>
              <span>Atk: {unit.atk}</span>
              <span>Def: {unit.def}</span>
            </div>
          </div>
          <div className='flex flex-col gap-1'>
            <div className='font-bold'>Skills</div>
            {unit.skills.map(skill => <span key={civ + unit.name + skill}>{skill.split('_').join(' ')}</span>)}
          </div>
        </div>
      ))}
    </div>
  )
}

function TroopSelectComp({ player }) {
  const dispatch = useDispatch()
  const hero = useSelector(state => state.game[player].hero)
  const selectedTroop = useSelector(state => state.game[player].troopPointer)
  const selectedTroopPoiner = useSelector(state => state.game[player].troopPointerState)
  const [civ, setCiv] = useState(hero.civ)

  const posizioni = []

  useEffect(() => setCiv(hero.civ), [])

  for (let p = 0; p < hero.maxTroops; p++) {
    posizioni.push(
      (
        <span key={"posizione" + hero.name + p} className={(selectedTroop === p ? "debug" : "")}>
          <span className='align-baseline'>{p}: </span>
          <input className='align-baseline' onChange={() => dispatch(setTroopPointer({ player, position: p, pointerChange: 'manual' }))} id={"posizione" + hero.name + p} checked={selectedTroopPoiner === 'manual' && selectedTroop === p} name={"posizione" + hero.name} type="radio" /> |
        </span>
      )
    )
  }

  posizioni.push((
    <span key={"posizione" + hero.name + "4000" + player}>
      <span className='align-baseline'>AUTO: </span>
      <input className='align-baseline' onChange={() => dispatch(setTroopPointer({ player, position: 0, pointerChange: 'auto' }))} checked={selectedTroopPoiner === 'auto'} id={"posizione" + hero.name + "4000" + player} name={"posizione" + hero.name} type="radio" /> |
    </span>
  ))

  const addTroop = troop => {
    dispatch(setTroop({ player, troop }))
  }

  return (
    <div className='mt-4'>
      <form className='flex justify-center gap-2'>
        <select defaultValue={hero.civ} className='align-bottom' onChange={e => setCiv(e.target.value)}>
          {Object.keys(units).map(civ => <option key={civ + hero.name} value={civ}>{civ}</option>)}
        </select>
        {posizioni}
      </form>
      <h1 className='text-xl font-bold mt-2 text-center'>Truppe disponibili</h1>
      <UnitaDisponibili onSelected={unita => addTroop(unita)} civ={civ} />
    </div>
  )
}

export default TroopSelectComp
