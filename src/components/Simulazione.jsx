import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { resetSimulation } from '../store/game'

function Simulazione({ logs }) {
    const dispatch = useDispatch()
    const reset = () => {
        dispatch(resetSimulation())
    }
    return (
        <div className='flex flex-col justify-center'>
            <button className="min-w-full bg-red-500 p-4 shadow-md active:shadow-sm active:bg-red-300 my-3" onClick={reset}>Back to Selection</button>
            <div className='flex justify-center text-center'>
                <ul>
                    {logs.map((text, index, array) => {
                        if (index === 2 || index === array.length - 2) {
                            return (
                                <li className='font-extrabold text-3xl'>
                                    {text}
                                </li>
                            )
                        }

                        return (
                            <li>{text}</li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Simulazione
