import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { resetSimulation, simulateTick } from '../store/game'

function Simulazione({ logs }) {
    const dispatch = useDispatch()
    const inProgress = useSelector(state => state.game.simulation.inProgress)
    const reset = () => {
        dispatch(resetSimulation())
    }
    const nextTick = () => {
        dispatch(simulateTick())
    }

    const show = []

    for (let i = logs.length - 1; i >= 0; i--) {
        const element = logs[i];
        if (i === 2) {
            show.push(
                <li className='font-extrabold text-3xl'>
                    {element}
                </li>
            )
        } else {
            if (!inProgress && i === logs.length - 2) {
                show.push(
                    <li className='font-extrabold text-3xl'>
                        {element}
                    </li>
                )
            } else {
                show.push(
                    <li>{element}</li>
                )
            }
        }

    }

    return (
        <div className='flex flex-col justify-center'>
            <div className='flex items-center w-full'>
                <button className="w-full bg-red-500 p-4 shadow-md active:shadow-sm active:bg-red-300 my-3" onClick={reset}>Back to Selection</button>
                <button className="w-full bg-green-500 p-4 shadow-md active:shadow-sm active:bg-green-300 my-3 disabled:bg-green-300" disabled={!inProgress} onClick={nextTick}>Tick</button>
            </div>
            <div className='flex justify-center text-center'>
                <ul>
                    {show}
                </ul>
            </div>
        </div>
    )
}

export default Simulazione
