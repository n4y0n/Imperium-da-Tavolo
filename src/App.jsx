import { useState } from 'react'
import HeroComp from './components/Hero'
import TroopSelectComp from './components/TroopSelectComp'
import HeroSelectComp from './components/HeroSelectComp'
import heroes from './assets/heroes'

function App() {
  const [hero1, setHero1] = useState(null)
  const [hero2, setHero2] = useState(null)

  const defCiv = Object.keys(heroes)?.[0]
  const [civ1, setCiv1] = useState(defCiv)
  const [civ2, setCiv2] = useState(defCiv)

  return (
    <div className='grid grid-cols-2 gap-1'>
      <div className='text-center justify-center'>
        {hero1 ? <HeroComp className="mt-4" hero={hero1} /> : <HeroSelectComp className='bg-gray-300' onChange={setHero1} civ={civ1} setCiv={setCiv1} />}
        <hr />
        {hero1 ? <TroopSelectComp className="mt-4" onChange={setHero1} hero={hero1} /> : null}
      </div>
      <div className='text-center justify-center'>
        {hero2 ? <HeroComp className="mt-4" hero={hero2} /> : <HeroSelectComp className='bg-gray-300' onChange={setHero2} civ={civ2} setCiv={setCiv2} />}
        <hr />
        {hero2 ? <TroopSelectComp className="mt-4" onChange={setHero2} hero={hero2} /> : null}
      </div>
    </div>
  )
}

export default App
