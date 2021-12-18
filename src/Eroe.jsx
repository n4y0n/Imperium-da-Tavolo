import React, { useState } from 'react'

function Eroe({ eroe }) {
    return (
        <section>
            <h2>{eroe.nome}</h2>
            <p>HP: {eroe.hp}</p>
            <p>ATK: {eroe.atk}</p>
            <p>DEF: {eroe.def}</p>
        </section>
    )
}

export default Eroe
