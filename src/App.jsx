import HeroComp from './components/Hero'
import TroopsComp from './components/Troops'
import TroopSelectComp from './components/TroopSelectComp'
import HeroSelectComp from './components/HeroSelectComp'
import { useSelector, useDispatch } from 'react-redux'
import { selectHero, selectCiv, reset, setTroop, simulate } from './store/game'

function PlayerComp({ player }) {
  const dispatch = useDispatch()
  const civ = useSelector(state => state.game[player].civ)
  const hero = useSelector(state => state.game[player].hero)
  const troops = useSelector(state => state.game[player].troops)

  if (!hero) {
    return (
      <div>
        <button className="my-2 min-w-full bg-gray-500 p-4 shadow-md active:shadow-sm active:bg-gray-300" onClick={() => dispatch(reset({ player }))}>Reset</button>
        <div>
          <HeroSelectComp onChange={selected => dispatch(selectHero({ player, hero: selected }))} civ={civ} onCivChange={selectedCiv => dispatch(selectCiv({ player, civ: selectedCiv }))} />
        </div>
      </div>
    )
  }

  return (
    <div>
      <button className="my-2 min-w-full bg-gray-500 p-4 shadow-md active:shadow-sm active:bg-gray-300" onClick={() => dispatch(reset({ player }))}>Reset</button>
      <div>
        <HeroComp hero={hero} />
        <hr />
        <TroopsComp troops={troops} />
        <hr />
        <TroopSelectComp onChange={({ position, troop }) => dispatch(setTroop({ player, position, troop }))} hero={hero} />
      </div>
    </div>
  )
}

function App() {
  const dispatch = useDispatch()
  const { p1, p2 } = useSelector(state => state.game.simulation)

  const startSimulation = () => { dispatch(simulate()) }

  return (
    <div>
      <button className="min-w-full bg-green-500 p-4 shadow-md active:shadow-sm active:bg-green-300 my-3" onClick={startSimulation}>Simula</button>
      <div className='grid grid-cols-2 gap-1'>
        <div className='border-r border-r-gray-400'>
          <PlayerComp player="p1" />
        </div>
        <div className='border-l border-l-gray-400'>
          <PlayerComp player="p2" />
        </div>
      </div>
    </div>
  )
}

export default App
