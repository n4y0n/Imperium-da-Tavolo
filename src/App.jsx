import { useState } from 'react'
import HeroComp from './components/Hero'
import TroopComp from './components/Troop'
import heroes from './assets/heroes'

function HeroSelectComp({ civ, hero, onChange, ...props }) {
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

function App() {
  const [hero1, setHero1] = useState(null)
  const [hero2, setHero2] = useState(null)

  const defCiv = Object.keys(heroes)?.[0]
  const [civ1, setCiv1] = useState(defCiv)
  const [civ2, setCiv2] = useState(defCiv)

  return (
    <div>
      <div className='grid grid-cols-2 text-center justify-center gap-1'>
        <div className='bg-gray-300'>
          {!hero1 ?
            <select className='align-bottom' onChange={e => setCiv1(e.target.value)}>
              {Object.keys(heroes).map(civ => <option key={civ} value={civ}>{civ}</option>)}
            </select> : null
          }
          {hero1 ? <HeroComp className='p-5' hero={hero1} /> : <HeroSelectComp className="p-5" civ={civ1} hero={hero1} onChange={setHero1} />}
          <hr />
          {hero1 ? <TroopComp className="mt-4" hero={hero1} /> : null}
        </div>
        <div className='bg-gray-300'>
          {!hero2 ?
            <select className='align-bottom' onChange={e => setCiv2(e.target.value)}>
              {Object.keys(heroes).map(civ => <option key={civ} value={civ}>{civ}</option>)}
            </select> : null
          }
          {hero2 ? <HeroComp className='p-5' hero={hero2} /> : <HeroSelectComp className="p-5" civ={civ2} hero={hero2} onChange={setHero2} />}
          <hr />
          {hero2 ? <TroopComp className="mt-4" hero={hero2} /> : null}
        </div>
      </div>
    </div>
  )
}

export default App
