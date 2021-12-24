import HeroComp from './Hero'
import TroopsComp from './Troops'
import TroopSelectComp from './TroopSelectComp'
import HeroSelectComp from './HeroSelectComp'
import { useSelector, useDispatch } from 'react-redux'
import { selectHero, selectCiv, reset, setTroop } from '../store/game'

export default function PlayerComp({ player }) {
  const dispatch = useDispatch()
  const civ = useSelector(state => state.game[player].civ)
  const hero = useSelector(state => state.game[player].hero)
  const troops = useSelector(state => state.game[player].troops)

  if (!hero) {
    return (
      <div>
        <button className="min-w-full bg-gray-500 p-4 shadow-md active:shadow-sm active:bg-gray-300" onClick={() => dispatch(reset({ player }))}>Reset</button>
        <div>
          <HeroSelectComp onChange={selected => dispatch(selectHero({ player, hero: selected }))} civ={civ} onCivChange={selectedCiv => dispatch(selectCiv({ player, civ: selectedCiv }))} />
        </div>
      </div>
    )
  }

  return (
    <div>
      <button className="min-w-full bg-gray-500 p-4 shadow-md active:shadow-sm active:bg-gray-300" onClick={() => dispatch(reset({ player }))}>Reset</button>
      <div>
        <HeroComp player={player} hero={hero} />
        <hr />
        <TroopsComp troops={troops} />
        <hr />
        <TroopSelectComp onChange={({ position, troop }) => dispatch(setTroop({ player, position, troop }))} hero={hero} />
      </div>
    </div>
  )
}
