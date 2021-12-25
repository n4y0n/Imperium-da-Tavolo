import { useSelector, useDispatch } from 'react-redux'
import { simulate, simulateTick } from './store/game'
import PlayerComp from './components/Player'
import Simulazione from './components/Simulazione'

function App() {
  const dispatch = useDispatch()
  const inProgress = useSelector(state => state.game.simulation.inProgress)
  const logs = useSelector(state => state.game.simulation.logs)
  const error = useSelector(state => state.game.simulation.error)
  if (inProgress || logs.length > 0) {
    return <Simulazione logs={logs} />
  }

  return (
    <div>
      <div className='flex items-center w-full'>
        <button className="w-full bg-green-500 p-4 shadow-md active:shadow-sm active:bg-green-300 my-3" onClick={() => dispatch(simulate())}>FastSimula</button>
        <button className="w-full bg-green-500 p-4 shadow-md active:shadow-sm active:bg-green-300 my-3" onClick={() => dispatch(simulateTick())}>Simula</button>
      </div>
      <div className='my-7 text-center'>
        {error?.message}
      </div>
      <div className='grid grid-cols-2 gap-1'>
        <div className='border-r border-r-gray-400 shadow-xl shadow-stone-600'>
          <PlayerComp player="p1" />
        </div>
        <div className='border-l border-l-gray-400 shadow-xl shadow-stone-600'>
          <PlayerComp player="p2" />
        </div>
      </div>
    </div>
  )
}

export default App
