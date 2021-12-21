import HeroComp from './components/Hero'
import TroopSelectComp from './components/TroopSelectComp'
import HeroSelectComp from './components/HeroSelectComp'
import { useSelector, useDispatch } from 'react-redux'
import { selectHero, selectCiv, reset, setTroop } from './store/game'


function TroopsComp({ troops, ...props }) {
  return (
    <div className='mt-5' {...props}>
      {Object.entries(troops).map(([key, troop]) => <div key={key + troop.name}>POS: {key} | Troop: {troop.name}</div>)}
    </div>
  )
}

function App() {
  const dispatch = useDispatch()
  const hero1 = useSelector(state => state.game.player1.hero)
  const troops1 = useSelector(state => state.game.player1.troops)
  const hero2 = useSelector(state => state.game.player2.hero)
  const troops2 = useSelector(state => state.game.player2.troops)
  const civ1 = useSelector(state => state.game.player1.civ)
  const civ2 = useSelector(state => state.game.player2.civ)

  return (
    <div>
      <button className="min-w-full bg-green-500 p-4 shadow-md active:shadow-sm active:bg-green-300 my-3">Simula</button>
      <div className='grid grid-cols-2 gap-1'>
        <div className='flex flex-col align-middle text-center'>
          <button className="my-2 min-w-full bg-gray-500 p-4 shadow-md active:shadow-sm active:bg-gray-300" onClick={() => dispatch(reset({ player: 'p1' }))}>Reset</button>
          <div>
            {hero1 ? <HeroComp className="mt-4" hero={hero1} /> : <HeroSelectComp className='bg-gray-300' onChange={hero => dispatch(selectHero({ player: 'p1', hero }))} civ={civ1} onCivChange={civ => dispatch(selectCiv({ player: 'p1', civ }))} />}
            {hero1 ? <TroopsComp troops={troops1} /> : null}
            <hr />
            {hero1 ? <TroopSelectComp className="mt-4" onChange={({ position, troop }) => dispatch(setTroop({ player: 'p1', position, troop }))} hero={hero1} /> : null}
          </div>
        </div>
        <div className='flex flex-col align-middle text-center'>
          <button className="my-2 min-w-full bg-gray-500 p-4 shadow-md active:shadow-sm active:bg-gray-300" onClick={() => dispatch(reset({ player: 'p2' }))}>Reset</button>
          <div>
            {hero2 ? <HeroComp className="mt-4" hero={hero2} /> : <HeroSelectComp className='bg-gray-300' onChange={hero => dispatch(selectHero({ player: 'p2', hero }))} civ={civ2} onCivChange={civ => dispatch(selectCiv({ player: 'p2', civ }))} />}
            {hero1 ? <TroopsComp troops={troops2} /> : null}
            <hr />
            {hero2 ? <TroopSelectComp className="mt-4" onChange={({ position, troop }) => dispatch(setTroop({ player: 'p2', position, troop }))} hero={hero2} /> : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
