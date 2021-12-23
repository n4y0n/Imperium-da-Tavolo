import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import heroes from '../assets/heroes'
import { scontro, firstTroop } from '../core/simulazione'
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
        p2: null,
        inProgress: false,
        error: null,
        results: [],
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
            state.p1.troops = Object.entries(state.p1.troops).filter(e => e[1].hp > 0).reduce((o, n) => { o[n[0]] = n[1]; return o }, {})
            state.p2.troops = Object.entries(state.p2.troops).filter(e => e[1].hp > 0).reduce((o, n) => { o[n[0]] = n[1]; return o }, {})

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
        },
        setLevel: (state, { payload: { player, level } }) => {
            switch (player) {
                case 'p1':
                    state.p1.hero.level = level
                    break;
                case 'p2':
                    state.p2.hero.level = level
                    break;
            }
        }
    },
    extraReducers: builder => {
        builder
            .addCase(simulate.pending, (state, { payload }) => {
                state.simulation.inProgress = true;
                state.simulation.error = null;
            })
            .addCase(simulate.fulfilled, (state, { payload }) => {
                state.simulation.inProgress = false;
                state.simulation.results = payload.logs;
                state.p1.hero = payload.p1.hero;
                state.p2.hero = payload.p2.hero;

                state.p1.troops = payload.p1.troops;
                state.p2.troops = payload.p2.troops;
            })
            .addCase(simulate.rejected, (state, { error }) => {
                state.simulation = { ...initialState.simulation, error }
            })
    }
})

export const { selectCiv, selectHero, reset, setTroop, updateSimulation, resetSimulation, setLevel } = slice.actions

export const simulate = createAsyncThunk('game/simulate', async (arg, { getState, dispatch }) => {
    const { game: { p1, p2, simulation } } = getState()
    // Deepcopy players
    const context = JSON.parse(JSON.stringify(simulation))
    context["p1"] = JSON.parse(JSON.stringify(p1))
    context["p2"] = JSON.parse(JSON.stringify(p2))
    context["logs"] = []
    context.logs.push = function (val) {
        console.log(val)
        Array.prototype.push.call(this, val)
    }

    if (!p1?.hero || !p2?.hero) {
        throw new Error("Tutti i giocatori devono aver selezionato un eroe.")
    }

    await scontro({ alice: { hero: context.p1.hero, troop: firstTroop(context.p1) }, bob: { hero: context.p2.hero, troop: firstTroop(context.p2) }, context })

    context.logs = Array.from(context.logs)
    return context
})

export default slice.reducer