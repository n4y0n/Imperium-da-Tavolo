import { useState } from 'react'
import './App.css'
import HeroComp from './components/Hero'
import TroopComp from './components/Troop'

import Hero from './core/Hero'
import Troop from './core/Troop'
import { simulazione } from './simulazione'

// function SelezioneCivilta({ setEroe }) {
//   return (
//     <div className='selezione-eroe'>
//       {eroi.map(eroe => (
//         <img onClick={() => setEroe(new Eroe(eroe.nome, eroe.hp, eroe.atk, eroe.def))} src={eroe.image} />
//       ))}
//     </div>
//   )
// }


function App() {
  const [risultati, setRisultati] = useState([])
  const [e2, setE2] = useState(new Hero("R", 12, 1, 1, "roma"))
  const [e1, setE1] = useState(new Hero("B", 12, 1, 1, "britannia"))


  const simulatuttecose = () => {
    setRisultati([])
    if (!e1 || !e2) return
    const ris = simulazione(e1, e2)
    setRisultati(risultati.concat(ris))
  }

  const aggiungiTruppa1 = () => {
    e1.setTroop(0, new Troop("Legionari", 200, 16, 12))
  }

  const aggiungiTruppa2 = () => {
    e2.setTroop(0, new Troop("Guerrieri", 200, 12, 6))
  }

  return (
    <div className="text-center">
      <button onClick={simulatuttecose}>Simula</button>
      <div>
        <div className='riquadro-eroi'>
          <div>
            {e1 ? (
              <>
                <HeroComp hero={e1}></HeroComp>
                <TroopComp hero={e1}></TroopComp>
                <button className='btn-add-truppa' onClick={aggiungiTruppa1}>🤌</button>
              </>
            ) : <SelezioneCivilta setEroe={setE1} />}
          </div>
          <div>
            {e2 ? (
              <>
                <HeroComp hero={e2}></HeroComp>
                <TroopComp hero={e2}></TroopComp>
                <button className='btn-add-truppa' onClick={aggiungiTruppa2}>🤌</button>
              </>
            ) : <SelezioneCivilta setEroe={setE2} />}
          </div>
        </div>
      </div>
      <hr />
      <h1>Risultati</h1>
      <ul>
        {risultati.map((mossa, i) =>
          <li key={"mossa-" + i}>
            {mossa}
          </li>
        )}
      </ul>
    </div>
  )
}

export default App
