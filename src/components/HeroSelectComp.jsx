import { useEffect } from 'react'
import heroes from '../assets/heroes'

function HeroList({ civ, onChange, ...props }) {
    const civHeroes = heroes[civ]
    return (
        <div className="flex flex-col items-center" {...props}>
            <h1 className='text-2xl font-bold mt-2'>Eroi disponibili [{civ}]</h1>
            <ul>
                {civHeroes.map(hero => (
                    <li className='cursor-pointer' key={hero.name + hero.civ} onClick={() => onChange(hero)}>
                        {hero.name.split('_').join(' ')}
                    </li>
                ))}
            </ul>
        </div>
    )
}

function HeroSelectComp({ onChange, civ, onCivChange, ...props }) {
    const defCiv = Object.keys(heroes)?.[0]
    useEffect(() => { onCivChange?.(defCiv) }, [])

    return (
        <div className='bg-gray-300' {...props}>
            <select className='align-bottom' onChange={e => onCivChange(e.target.value)}>
                {Object.keys(heroes).map(civ => <option key={civ} value={civ}>{civ}</option>)}
            </select>
            <HeroList className="p-5" civ={civ} onChange={onChange} />
        </div>
    )
}

export default HeroSelectComp
