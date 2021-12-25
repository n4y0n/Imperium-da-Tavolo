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
        troopPointer: 0,
        troopPointerState: 'auto',
    },
    p2: {
        hero: null,
        troops: {},
        civ: defCiv,
        troopPointer: 0,
        troopPointerState: 'auto',
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
            state[player].hero = hero
        },
        selectCiv: (state, { payload: { player, civ } }) => {
            state[player].civ = civ
        },
        reset: (state, { payload: { player } }) => {
            if (player)
                state[player] = { ...initialState[player] }
            else
                state = { ...initialState }
        },
        resetSimulation: state => {
            state.p1.troops = Object.entries(state.p1.troops).filter(e => e[1].hp > 0).reduce((o, n) => { o[n[0]] = n[1]; return o }, {})
            state.p2.troops = Object.entries(state.p2.troops).filter(e => e[1].hp > 0).reduce((o, n) => { o[n[0]] = n[1]; return o }, {})

            if (state.p1.hero.hp <= 0) state.p1.hero = null
            if (state.p2.hero.hp <= 0) state.p2.hero = null

            state.simulation = { ...initialState.simulation }
        },
        setTroop: (state, { payload: { player, troop } }) => {
            if (state[player].troopPointerState !== "auto") {
                state[player].troops[state[player].troopPointer] = troop
            } else {
                state[player].troops[state[player].troopPointer] = troop
                state[player].troopPointer = (state[player].troopPointer + 1) % getMaxTroops(state[player].civ)
            }
        },
        setTroopPointer: (state, { payload: { pointerChange, player, position } }) => {
            state[player].troopPointer = position;
            state[player].troopPointerState = pointerChange;
        },
        setLevel: (state, { payload: { player, level } }) => {
            state[player].hero.level = level
        },
        setSkills: (state, { payload: { player, skills } }) => {
            state[player].hero.skills = skills
        },
        setItems: (state, { payload: { player, items } }) => {
            state[player].hero.items = items
        },
    },
    extraReducers: builder => {
        builder
            .addCase(simulate.pending, (state, { payload }) => {
                state.simulation.inProgress = true;
                state.simulation.error = null;
            })
            .addCase(simulate.fulfilled, (state, { payload }) => {
                // state.simulation.inProgress = false;
                state.simulation.logs = payload.logs;
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

export const { selectCiv, selectHero, reset, setTroop, resetSimulation, setLevel, setItems, setSkills, setTroopPointer } = slice.actions

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