import { createSlice } from "@reduxjs/toolkit"
import heroes from '../assets/heroes'
const [defCiv, ...other] = Object.keys(heroes)

const initialState = {
    player1: {
        hero: null,
        troops: {},
        civ: defCiv
    },
    player2: {
        hero: null,
        troops: {},
        civ: defCiv
    }
}

const slice = createSlice({
    name: 'game',
    initialState: { ...initialState },
    reducers: {
        selectHero: (state, { payload: { player, hero } }) => {
            switch (player) {
                case 'p1':
                    state.player1.hero = { ...hero }
                    break;
                case 'p2':
                    state.player2.hero = { ...hero }
                    break;
            }
        },
        selectCiv: (state, { payload: { player, civ } }) => {
            switch (player) {
                case 'p1':
                    state.player1.civ = civ
                    break;
                case 'p2':
                    state.player2.civ = civ
                    break;
            }
        },
        reset: (state, { payload: { player } }) => {
            switch (player) {
                case 'p1':
                    state.player1 = { hero: null, civ: defCiv, troops: {} }
                    break;
                case 'p2':
                    state.player2 = { hero: null, civ: defCiv, troops: {} }
                    break;
                default:
                    state = { ...initialState }
                    break;
            }
        },
        setTroop: (state, { payload: { player, position, troop } }) => {
            switch (player) {
                case 'p1':
                    state.player1.troops = { ...state.player1.troops, [position]: { ...troop } }
                    break;
                case 'p2':
                    state.player2.troops = { ...state.player2.troops, [position]: { ...troop } }
                    break;
            }
        }
    }
})

export const { selectCiv, selectHero, reset, setTroop } = slice.actions

export default slice.reducer