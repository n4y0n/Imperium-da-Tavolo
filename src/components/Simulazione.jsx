import React, { useState } from 'react'

function Simulazione({ results }) {
    return (
        <div>
            <ul>
                {results.map(text => <li>{text}</li>)}
            </ul>
        </div>
    )
}

export default Simulazione
