import HeroComp from './Hero'
import TroopsComp from './Troops'
import TroopSelectComp from './TroopSelectComp'
import HeroSelectComp from './HeroSelectComp'
import { useSelector, useDispatch } from 'react-redux'
import { selectHero, selectCiv, reset } from '../store/game'

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
        <TroopsComp player={player} troops={troops} />
        <hr />
        <TroopSelectComp player={player} hero={hero} />
      </div>
    </div>
  )
}
