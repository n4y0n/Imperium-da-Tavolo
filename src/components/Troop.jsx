import { getUnitImage } from "../core/assets";
import Card, { CardText, CardTitle } from "./Card";

export default function ({ troop }) {

    if (troop.hp <= 0) {
        return (
            <Card>
                <div className='flex justify-center items-center p-3 w-20'>
                    <img src={getUnitImage(troop.image)} />
                </div>
                <CardTitle className="flex text-center">
                    <span>{troop.name}</span>
                </CardTitle>
                <CardText className="text-center">
                    <p className="text-red-600">Dead</p>
                </CardText>
            </Card>
        )
    }

    return (
        <Card>
            <div className='flex justify-center items-center p-3 w-20'>
                <img src={getUnitImage(troop.image)} />
            </div>
            <CardTitle className="flex text-center">
                <span>{troop.name}</span>
            </CardTitle>
            <CardText>
                <div className='flex flex-col justify-center'>
                    <p>HP: {troop.hp.toFixed(2)}</p>
                    <p>ATK: {troop.atk.toFixed(2)}</p>
                    <p>DEF: {troop.def.toFixed(2)}</p>
                </div>
            </CardText>
        </Card>
    )
}