import { createAction, handleActions } from 'redux-actions'
import update from 'react/lib/update'
// actions
import { generateNewField } from 'redux/modules/fieldGenerator'
import { playersInitData, updateDataOnMove, initUnowned, getComputerMove } from './currentGameHelper'

// ------------------------------------
// Constants
// ------------------------------------
const START_NEW_GAME = 'game/START_NEW_GAME'
const SELECT_COLOR = 'game/SELECT_COLOR'
const POSTMOVE_UPDATES = 'game/POSTMOVE_UPDATES'

const initialState = {
  isStarted: false,
  field: {
    current: null
  },
  players: [
    {score: 0},
    {score: 0}
  ],
  activePlayer: null
}

const defaultGameOptions = {
  mode: 'classic',
  type: 'vs_computer'
}

// ------------------------------------
// Actions
// ------------------------------------

// ------------------------------------
// Action creators
// ------------------------------------
export function startNewGame (options) {
  return (dispatch, getState) => {
    const field = dispatch(generateNewField())
    const action = createAction(START_NEW_GAME)
    dispatch(
      action({
        field: {
          current: field,
          unowned: initUnowned(field)
        },
        isStarted: true,
        options: {
          ...defaultGameOptions,
          ...options
        },
        players: playersInitData(options, field),
        activePlayer: 0
      })
    )
  }
}

export function selectColor (playerIndex, colorIndex) {
  return (dispatch, getState) => {
    const move = createAction(SELECT_COLOR)
    const playerData = getState().currentGame.players[playerIndex]
    const field = getState().currentGame.field
    dispatch(
      move({
        playerIndex,
        updatedData: updateDataOnMove(playerData, field, colorIndex)
      })
    )
    dispatch(postMoveUpdates(playerIndex))
  }
}

export function postMoveUpdates (playerIndex) {
  return (dispatch, getState) => {
    const postMove = createAction(POSTMOVE_UPDATES)
    const players = getState().currentGame.players
    const nextPlayerIndex = (playerIndex + 1) % 2
    dispatch(
      postMove({
        activePlayer: nextPlayerIndex
      })
    )
    // make computer move
    if (players[nextPlayerIndex].type === 'computer') {
      const nextColor = getComputerMove(nextPlayerIndex, players)
      setTimeout(() => {
        dispatch(selectColor(nextPlayerIndex, nextColor))
      }, 500)
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [START_NEW_GAME]: (state, action) => ({
    ...state,
    ...action.payload
  }),
  [SELECT_COLOR]: (state, action) => {
    const { playerIndex, updatedData } = action.payload
    return update(state, {
      players: {
        [playerIndex]: {$set: updatedData.updatedPlayerData}
      },
      field: {
        unowned: {$set: updatedData.unowned}
      }
    })
  },
  [POSTMOVE_UPDATES]: (state, action) => ({
    ...state,
    ...action.payload
  })
}, initialState)
