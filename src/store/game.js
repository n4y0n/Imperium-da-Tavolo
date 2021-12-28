import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import heroes from '../assets/heroes'
import { fastSimulate, createSimulation } from '../core/simulazione'
import { getMaxTroops, lossyCopy, firstTroop, rearTroops, flatten } from "../core/utils"
const [defCiv, ...other] = Object.keys(heroes)

let currentSimulation = null

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
        singleUseSkills: true,
        inProgress: false,
        iteration: 1,
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
            currentSimulation = null;
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
        toggleHeroSkill: (state, { payload: { player, skill } }) => {
            const skills = state[player].hero.skills

            if (skills.includes(skill.id)) {
                state[player].hero.skills = skills.filter(sk => sk !== skill.id)
            } else {
                skills.push(skill.id)
            }
        },
        toggleHeroItem: (state, { payload: { player, item } }) => {
            const items = state[player].hero.items
            if (items.includes(item.id)) {
                state[player].hero.items = items.filter(sk => sk !== item.id)
            } else {
                items.push(item.id)
            }
        },
        resetSimulationLogs: state => {
            state.p1.troops = Object.entries(state.p1.troops).filter(e => e[1].hp > 0).reduce((o, n) => { o[n[0]] = n[1]; return o }, {})
            state.p2.troops = Object.entries(state.p2.troops).filter(e => e[1].hp > 0).reduce((o, n) => { o[n[0]] = n[1]; return o }, {})
            if (state.p1.hero.hp <= 0) state.p1.hero = null
            if (state.p2.hero.hp <= 0) state.p2.hero = null
            currentSimulation = null;
            state.simulation.logs = []
        }
    },
    extraReducers: builder => {
        builder
            .addCase(simulate.pending, state => {
                state.simulation.error = null;
                state.simulation.inProgress = true;
            })
            .addCase(simulate.fulfilled, (state, { payload }) => {
                state.p1.hero = payload.p1.hero;
                state.p2.hero = payload.p2.hero;

                state.p1.troops = payload.p1.troops;
                state.p2.troops = payload.p2.troops;

                state.simulation = payload;
                state.simulation.singleUseSkills = payload.singleUseSkills;
                state.simulation.inProgress = false;
            })
            .addCase(simulate.rejected, (state, { error }) => {
                console.error(error)
                state.simulation = { ...initialState.simulation, error }
            })
            .addCase(simulateTick.pending, state => {
                state.simulation.error = null;
            })
            .addCase(simulateTick.fulfilled, (state, { payload }) => {
                state.p1.hero = payload.p1.hero;
                state.p2.hero = payload.p2.hero;

                state.p1.troops = payload.p1.troops;
                state.p2.troops = payload.p2.troops;

                state.simulation = payload;
            })
            .addCase(simulateTick.rejected, (state, { error }) => {
                console.error(error)
                state.simulation = { ...initialState.simulation, error }
                currentSimulation = null;
            })
            .addCase(fastFowardCurrentSimulation.pending, state => {
                state.simulation.error = null;
                state.simulation.inProgress = true;
            })
            .addCase(fastFowardCurrentSimulation.fulfilled, (state, { payload }) => {
                state.p1.hero = payload.p1.hero;
                state.p2.hero = payload.p2.hero;

                state.p1.troops = payload.p1.troops;
                state.p2.troops = payload.p2.troops;
                state.simulation = payload;

                currentSimulation = null;
                state.simulation.inProgress = false;
            })
            .addCase(fastFowardCurrentSimulation.rejected, (state, { error }) => {
                console.error(error)
                state.simulation = { ...initialState.simulation, error }
                currentSimulation = null;
            })
    }
})

export const {
    selectCiv,
    selectHero,
    reset,
    setTroop,
    resetSimulation,
    setLevel,
    setItems,
    setSkills,
    setTroopPointer,
    toggleHeroSkill,
    resetSimulationLogs,
    toggleHeroItem,
} = slice.actions

export const simulate = createAsyncThunk('game/simulate', async (arg, { getState }) => {
    const { game } = getState()

    // setup simulation context
    const context = setupContext(game)

    // Assert context validity
    assertHero(context.p1)
    assertHero(context.p2)

    // setup players
    const alice = setupPlayer('alice', context.p1)
    const bob = setupPlayer('bob', context.p2)

    // start simulation for a battle
    fastSimulate(context, alice, bob)

    // return finished battle context
    return lossyCopy(context)
})

export const simulateTick = createAsyncThunk('game/simulate-tick', async (arg, { getState, dispatch }) => {
    const { game } = getState()

    // setup simulation context
    const context = setupContext(game)

    // Assert context validity
    assertHero(context.p1)
    assertHero(context.p2)

    // setup players
    const alice = setupPlayer('alice', context.p1)
    const bob = setupPlayer('bob', context.p2)

    // if there is a simulation running use that, else create a new one
    currentSimulation = context.inProgress ? currentSimulation : createSimulation(context, alice, bob)

    const tickResult = currentSimulation.next();
    // Return simulation context after one simulation tick
    return lossyCopy(tickResult.value)
})

export const fastFowardCurrentSimulation = createAsyncThunk('game/simulate-tick-ff', async (arg, { getState, dispatch }) => {
    const { game } = getState()

    // setup simulation context
    const context = setupContext(game)

    // Assert context validity
    assertHero(context.p1)
    assertHero(context.p2)

    // setup players
    const alice = setupPlayer('alice', context.p1)
    const bob = setupPlayer('bob', context.p2)

    // if there is a simulation running use that, else create a new one
    currentSimulation = context.inProgress ? currentSimulation : createSimulation(context, alice, bob)

    let lastState = context
    for (let state of currentSimulation) {
        lastState = state
    }
    // Return simulation context after one simulation tick
    return lossyCopy(lastState)
})

function setupContext({ p1, p2, simulation }) {
    const context = lossyCopy(simulation)
    context.p1 = lossyCopy(p1)
    context.p2 = lossyCopy(p2)
    context.logs.push = function (val) {
        console.log(val)
        Array.prototype.push.call(this, val)
    }
    return context;
}

function setupPlayer(name, playerData) {
    return { hero: playerData.hero, troop: firstTroop(playerData), troops: flatten(playerData.troops), rears: rearTroops(playerData), player: name }
}

function assertHero(player) {
    if (player && player.hero) return
    throw new Error("Tutti i giocatori devono aver selezionato un eroe.")
}

export default slice.reducer