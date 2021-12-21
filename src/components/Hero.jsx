import React from 'react'

function HeroComp({ hero, ...props }) {
    return (
        <section {...props}>
            <h2 className='font-bold text-xl'>{hero.name}</h2>
            <p>HP: {hero.hp}</p>
            <p>ATK: {hero.atk}</p>
            <p>DEF: {hero.def}</p>
        </section>
    )
}

export default HeroComp
