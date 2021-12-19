import React, { useState } from 'react'

function Game({ ...props }) {
    const [gameOver, setGameOver] = useState(true)
    const [winner, setWinnner] = useState('')

    return (
        <div {...props}>
        </div>
    )
}

export default Game
