import { useState } from 'react'
import './App.css'
import EroeComp from './Eroe'
import TruppeComp from './Truppe'
import eroi from './assets/eroi'

import { Eroe, Truppa, simulazione, stato } from './simulazione'

function SelezioneCivilta({ setEroe }) {
  return (
    <div className='selezione-eroe'>
      {eroi.map(eroe => (
        <img onClick={() => setEroe(new Eroe(eroe.nome, eroe.hp, eroe.atk, eroe.def))} src={eroe.image} />
      ))}
    </div>
  )
}


function App() {
  const [risultati, setRisultati] = useState([])
  const [e1, setE1] = useState(null)
  const [e2, setE2] = useState(null)


  const simulatuttecose = () => {
    setRisultati([])
    if (!e1 || !e2) return
    const ris = simulazione(e1, e2)
    setE1({ ...e1, truppe: e1.truppe })
    setE2({ ...e2, truppe: e2.truppe })
    setRisultati(risultati.concat(ris))
    console.log(e1.truppe);
    console.log(e2.truppe);
  }

  const aggiungiTruppa1 = () => {
    e1.setTruppa(0, new Truppa("Legionari", 200, 16, 12))
    setE1({ ...e1, truppe: e1.truppe })
    console.log(e1.nome, e1);
    console.log(e2.nome, e2);
  }

  const aggiungiTruppa2 = () => {
    e2.setTruppa(0, new Truppa("Guerrieri", 200, 12, 6))
    setE2({ ...e2, truppe: e2.truppe })
    console.log(e1.nome, e1);
    console.log(e2.nome, e2);
  }

  return (
    <div className="App">
      <button onClick={simulatuttecose}>Simula</button>
      <div>
        <div className='riquadro-eroi'>
          <div>
            {e1 ? (
              <>
                <EroeComp eroe={e1}></EroeComp>
                <TruppeComp truppe={e1.truppe}></TruppeComp>
                <button className='btn-add-truppa' onClick={aggiungiTruppa1}>🤌</button>
              </>
            ) : <SelezioneCivilta setEroe={setE1} />}
          </div>
          <div>
            {e2 ? (
              <>
                <EroeComp eroe={e2}></EroeComp>
                <TruppeComp truppe={e2.truppe}></TruppeComp>
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
