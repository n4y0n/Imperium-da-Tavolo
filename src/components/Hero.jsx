import React, { useState } from 'react'

function HeroesTroops({ troop, ...props }) {
    return (
        <div {...props}>{troop.name}</div>
    )
}

function HeroComp({ hero, ...props }) {
    return (
        <section {...props}>
            <h2 className='font-bold text-xl'>{hero.name}</h2>
            <p>HP: {hero.hp}</p>
            <p>ATK: {hero.atk}</p>
            <p>DEF: {hero.def}</p>

            <div className='mt-5'>
                {hero.troops.map(troop => <HeroesTroops key={troop.name} troop={troop}/>)}
            </div>

        </section>
    )
}

export default HeroComp
