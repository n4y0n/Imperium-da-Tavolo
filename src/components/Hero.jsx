import React from 'react'

function HeroComp({ hero, ...props }) {
    return (
        <section className='flex flex-col items-center my-4'>
            <h2 className='font-bold text-xl'>{hero.name}</h2>
            <p>HP: {hero.hp}</p>
            <p>ATK: {hero.atk}</p>
            <p>DEF: {hero.def}</p>
        </section>
    )
}

export default HeroComp
