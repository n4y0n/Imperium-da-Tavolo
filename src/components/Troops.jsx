function TroopComp({ troop }) {
    return (
        <span>{troop.name.split('_').join(' ')}</span>
    )
}

export default function TroopsComp({ troops }) {
    return (
        <div className='my-5 flex flex-row justify-center gap-4'>
            {Object.entries(troops).map(([key, troop]) => (
                <div className="text-left" key={troop.name+key}>
                    <span>Pos: {key} - </span>
                    <TroopComp key={key + troop.name} troop={troop} />
                </div>
            ))}
        </div>
    )
}