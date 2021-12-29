import { useSelector } from "react-redux"
import TroopComp from './Troop'

export default function({ player }) {
    const troops = useSelector(state => state.game[player].troops)

    return (
        <div className='my-5 flex flex-row justify-center gap-4'>
            {Object.entries(troops).map(([key, troop]) => (
                <div className="text-left" key={troop.name + key}>
                    <TroopComp troop={troop} />
                </div>
            ))}
        </div>
    )
}