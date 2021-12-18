import React, { useState } from 'react'

function TroopComp({ hero }) {
    return (
        <div>Truppe [MAX:{hero.maxTroops}]:
            {hero.troops.map((t, index) =>
                t ?
                    (<div key={index}>
                        <span>Posizione: {index}</span>
                        <span> | {t.nome} HP: {t.hp}, ATK: {t.atk}, DIF: {t.def}</span>
                    </div>)
                : null
            )}
        </div>
    )
}

export default TroopComp
