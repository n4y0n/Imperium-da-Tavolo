import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { resetSimulation } from '../store/game'

function Simulazione({ results }) {
    const dispatch = useDispatch()
    const reset = () => {
        dispatch(resetSimulation())
    }
    return (
        <div className='flex flex-col justify-center text-center'>
            <button className="min-w-full bg-red-500 p-4 shadow-md active:shadow-sm active:bg-red-300 my-3" onClick={reset}>Reset</button>
            <ul>
                {results.map(text => <li>{text}</li>)}
            </ul>
        </div>
    )
}

export default Simulazione
