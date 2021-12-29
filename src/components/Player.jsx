import HeroComp from './Hero'
import TroopsComp from './Troops'
import TroopSelectComp from './TroopSelection'
import HeroSelectComp from './HeroSelection'
import { useSelector, useDispatch } from 'react-redux'
import { selectHero, selectCiv, reset, setLevel, attack } from '../store/game'
import HeroSkillPanel from './HeroSkillPanel'
import HeroItemsPanel from './HeroItemsPanel'
import Button from './Button'

function HeroEditComp({ player }) {
  const dispatch = useDispatch()
  const hero = useSelector(state => state.game[player].hero)
  const isAttacking = useSelector(state => state.game[player].attacking)

  const addLevel = () => {
    dispatch(setLevel({ player, level: hero.level + 1 }))
  }

  const removeLevel = () => {
    dispatch(setLevel({ player, level: (hero.level - 1) < 0 ? 0 : hero.level - 1 }))
  }

  const setAttack = () => {
    dispatch(attack({ player }))
  }

  return (
    <div className='flex flex-col m-5 justify-center'>
      <div className='p-2'>
        <h2>Skills</h2>
        <HeroSkillPanel player={player} />
      </div>
      <hr />
      <div className='p-2'>
        <h2>Items</h2>
        <HeroItemsPanel player={player} />
      </div>
      <hr />
      <div className='p-2'>
        <h2>Level</h2>
        <div className='flex gap-5'>
          <Button color="success" onClick={addLevel}>+</Button>
          <Button color="success" onClick={removeLevel}>-</Button>
        </div>
      </div>
      <hr />
      <div className='p-2'>
        <Button color={isAttacking ? "danger" : "success"} onClick={setAttack}>Attack</Button>
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
      <div className='flex flex-col justify-center items-center mt-11'>
        <div>
          <HeroComp player={player} />
        </div>
        <hr />
        <div>
          <TroopsComp player={player} />
        </div>
        <hr />
        <div>
          <HeroEditComp player={player} />
          <TroopSelectComp player={player} />
        </div>
      </div>
    </div>
  )
}
