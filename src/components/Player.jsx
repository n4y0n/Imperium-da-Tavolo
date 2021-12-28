import HeroComp from './Hero'
import TroopsComp from './Troops'
import TroopSelectComp from './TroopSelection'
import HeroSelectComp from './HeroSelection'
import { useSelector, useDispatch } from 'react-redux'
import { selectHero, selectCiv, reset } from '../store/game'
import HeroSkillPanel from './HeroSkillPanel'
import HeroItemsPanel from './HeroItemsPanel'

function HeroEditComp({ player }) {
  return (
    <div className='flex flex-col m-5 justify-center'>
      <div>
        <h2>Skills</h2>
        <HeroSkillPanel player={player} />
      </div>
      <div>
        <h2>Items</h2>
        <HeroItemsPanel player={player} />
      </div>
    </div>
  )
}

export default function ({ player }) {
  const dispatch = useDispatch()
  const civ = useSelector(state => state.game[player].civ)
  const hero = useSelector(state => state.game[player].hero)

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
        <HeroComp player={player} />
        <hr />
        <TroopsComp player={player} />
        <hr />
        <div>
          <HeroEditComp player={player} />
          <TroopSelectComp player={player} />
        </div>
      </div>
    </div>
  )
}
