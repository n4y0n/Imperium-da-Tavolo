import { useSelector, useDispatch } from 'react-redux'
import { simulate, simulateTick } from './store/game'

import Button from './components/Button'
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
      <div className='flex justify-center gap-20 w-full mt-6'>
        <Button color="success" size="lg" onClick={() => dispatch(simulate())}>FastSimula</Button>
        <Button color="success" size="lg" onClick={() => dispatch(simulateTick())}>Simula</Button>
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
