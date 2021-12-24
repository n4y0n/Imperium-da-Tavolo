import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import heroes from '../assets/heroes'
import { scontro, firstTroop, rearTroops } from '../core/simulazione'
import { getMaxTroops, lossyCopy } from "../core/utils"
const [defCiv, ...other] = Object.keys(heroes)

const initialState = {
    p1: {
        hero: null,
        troops: {},
        civ: defCiv,
        troopPointer: 0
    },
    p2: {
        hero: null,
        troops: {},
        civ: defCiv,
        troopPointer: 0,
    },
    simulation: {
        p1: null,
        p2: null,
        inProgress: false,
        error: null,
        logs: [],
    },
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

            if (state.p1.hero.hp <= 0) state.p1.hero = null
            if (state.p2.hero.hp <= 0) state.p2.hero = null

            state.simulation = { ...initialState.simulation }
        },
        setTroop: (state, { payload: { player, position, troop } }) => {
            if (position !== "auto") {
                switch (player) {
                    case 'p1':
                        state.p1.troops[position] = troop
                        break;
                    case 'p2':
                        state.p2.troops[state] = troop
                        break;
                }
            } else {
                switch (player) {
                    case 'p1':
                        state.p1.troops[state.p1.troopPointer] = troop
                        state.p1.troopPointer = (state.p1.troopPointer + 1) % getMaxTroops(state.p1.civ)
                        break;
                    case 'p2':
                        state.p2.troops[state.p2.troopPointer] = troop
                        state.p2.troopPointer = (state.p2.troopPointer + 1) % getMaxTroops(state.p2.civ)
                        break;
                }
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
        },
        setSkills: (state, { payload: { player, skills } }) => {
            switch (player) {
                case 'p1':
                    state.p1.hero.skills = skills
                    break;
                case 'p2':
                    state.p2.hero.skills = skills
                    break;
            }
        },
        setItems: (state, { payload: { player, items } }) => {
            switch (player) {
                case 'p1':
                    state.p1.hero.items = items
                    break;
                case 'p2':
                    state.p2.hero.items = items
                    break;
            }
        },
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
                console.error(error)
                state.simulation = { ...initialState.simulation, error }
            })
    }
})

export const { selectCiv, selectHero, reset, setTroop, resetSimulation, setLevel, setItems, setSkills } = slice.actions

export const simulate = createAsyncThunk('game/simulate', async (arg, { getState, dispatch }) => {
    // Player1 = alice
    // Player2 = bob
    const { game: { p1, p2, simulation } } = getState()

    // Deepcopy players
    const context = lossyCopy(simulation)
    context.p1 = lossyCopy(p1)
    context.p2 = lossyCopy(p2)
    context["logs"] = []
    context.logs.push = function (val) {
        console.log(val)
        Array.prototype.push.call(this, val)
    }

    if (!p1?.hero || !p2?.hero) {
        throw new Error("Tutti i giocatori devono aver selezionato un eroe.")
    }

    await scontro.call(context, { player: 'p1', hero: context.p1.hero, troop: firstTroop(context.p1), rears: rearTroops(context.p1) }, { player: 'p2', hero: context.p2.hero, troop: firstTroop(context.p2), rears: rearTroops(context.p2) })

    context.logs = Array.from(context.logs)
    return context
})

export default slice.reducer