import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { resetSimulation, simulateTick, fastFowardCurrentSimulation } from '../store/game'
import HeroComp from './Hero'
import TroopsComp from './Troops'

function LogsPanel({ logs }) {
    const inProgress = useSelector(state => state.game.simulation.inProgress)
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
        <div className='flex justify-center overflow-y-scroll max-h-screen'>
            <ul className="text-center">
                {show}
            </ul>
        </div>
    )
}

function HeroStats({ player }) {
    return (
        <div>
            Put stats here
        </div>
    )
}


function Simulazione({ logs }) {
    const dispatch = useDispatch()
    const inProgress = useSelector(state => state.game.simulation.inProgress)

    const reset = () => {
        dispatch(resetSimulation())
    }
    const nextTick = () => {
        dispatch(simulateTick())
    }
    const fastFWSimulation = () => {
        dispatch(fastFowardCurrentSimulation())
    }
    const nextBattle = () => {
        dispatch(resetSimulation())
        dispatch(simulateTick())
    }

    return (
        <div className='flex'>
            <div className='flex flex-col flex-shrink-0'>
                <div className='flex items-center w-full'>
                    <button className="w-full bg-red-500 p-4 shadow-md active:shadow-sm active:bg-red-300" onClick={reset}>Back to Selection</button>
                    <div className='flex items-center w-full'>
                        <button className="w-full bg-green-500 p-4 shadow-md active:shadow-sm active:bg-green-300 disabled:bg-green-300" disabled={!inProgress} onClick={nextTick}>Tick</button>
                        <button className="w-full bg-gray-500 p-4 shadow-md active:shadow-sm active:bg-gray-300 disabled:bg-gray-300" disabled={!inProgress} onClick={fastFWSimulation}>FastFW</button>
                    </div>
                    <button className="w-full bg-green-500 p-4 shadow-md active:shadow-sm active:bg-green-300 disabled:bg-green-300" disabled={inProgress} onClick={nextBattle}>Next</button>
                </div>
                <div className='grid grid-cols-2'>
                    <HeroComp player="p1">
                        <HeroStats player="p1" />
                    </HeroComp>
                    <HeroComp player="p2">
                        <HeroStats player="p2" />
                    </HeroComp>
                </div>
                <div>
                    <TroopsComp player="p1" />
                    <TroopsComp player="p2" />
                </div>
            </div>
            <div className='border-l m-0 p-0 w-full'>
                <LogsPanel logs={logs} />
            </div>
        </div>
    )
}

export default Simulazione
