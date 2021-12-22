import React, { useEffect, useState } from 'react'

function HeroComp({ hero, onChange }) {
    const [level, setLevel] = useState(hero.level)

    useEffect(() => onChange?.(level), [level])

    return (
        <section className='flex flex-col items-center my-4'>
            <h2 className='font-bold text-xl'>{hero.name} [LV{level}]</h2>
            <div className='grid grid-cols-2 gap-2'>
                <div className='min-w-max'>
                    <button onClick={() => setLevel(level > 0 ? level - 1 : 0)} className='bg-zinc-500 active:bg-zinc-400 font-black text-md w-16 rounded-md'>LV -</button>
                </div>
                <div className='min-w-max'>
                    <button onClick={() => setLevel(level + 1)} className='bg-zinc-500 active:bg-zinc-400 font-black text-md w-16 rounded-md'>LV +</button>
                </div>
            </div>
            <p>HP: {hero.hp}</p>
            <p>ATK: {hero.atk}</p>
            <p>DEF: {hero.def}</p>
        </section>
    )
}

export default HeroComp
