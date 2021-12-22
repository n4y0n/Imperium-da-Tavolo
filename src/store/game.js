import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import heroes from '../assets/heroes'
const [defCiv, ...other] = Object.keys(heroes)

const initialState = {
    p1: {
        hero: null,
        troops: {},
        civ: defCiv
    },
    p2: {
        hero: null,
        troops: {},
        civ: defCiv
    },
    simulation: {
        p1: null,
        p2: null
    }
}

const slice = createSlice({
    name: 'game',
    initialState: { ...initialState },
    reducers: {
        selectHero: (state, { payload: { player, hero } }) => {
            switch (player) {
                case 'p1':
                    state.p1.hero = { ...hero }
                    break;
                case 'p2':
                    state.p2.hero = { ...hero }
                    break;
            }
        },
        selectCiv: (state, { payload: { player, civ } }) => {
            switch (player) {
                case 'p1':
                    state.p1.civ = civ
                    break;
                case 'p2':
                    state.p2.civ = civ
                    break;
            }
        },
        reset: (state, { payload: { player } }) => {
            switch (player) {
                case 'p1':
                    state.p1 = { hero: null, civ: defCiv, troops: {} }
                    break;
                case 'p2':
                    state.p2 = { hero: null, civ: defCiv, troops: {} }
                    break;
                default:
                    state = { ...initialState }
                    break;
            }
        },
        resetSimulation: state => {
            state.simulation = { ...initialState.simulation }
        },
        updateSimulation: (state, { payload }) => {
            state.simulation = { ...payload }
        },
        setTroop: (state, { payload: { player, position, troop } }) => {
            switch (player) {
                case 'p1':
                    state.p1.troops = { ...state.p1.troops, [position]: { ...troop } }
                    break;
                case 'p2':
                    state.p2.troops = { ...state.p2.troops, [position]: { ...troop } }
                    break;
            }
        }
    }
})

export const { selectCiv, selectHero, reset, setTroop, updateSimulation } = slice.actions


export const simulate = createAsyncThunk('game/simulate', (arg, { getState, dispatch }) => {
    const { game: { simulation } } = getState()
    dispatch(updateSimulation({ p1: { ...simulation.p1 }, p2: { ...simulation.p2, hp: 100 } }))
})

export default slice.reducer