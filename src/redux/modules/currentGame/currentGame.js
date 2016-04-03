import { createAction, handleActions } from 'redux-actions'
import update from 'react/lib/update'
// actions
import { generateNewField } from 'redux/modules/fieldGenerator'
import { playersInitData, updatePlayerDataOnMove } from './currentGameHelper'

// ------------------------------------
// Constants
// ------------------------------------
const START_NEW_GAME = 'game/START_NEW_GAME'
const SELECT_COLOR = 'game/SELECT_COLOR'

const initialState = {
  isStarted: false,
  field: null
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
        field: field,
        isStarted: true,
        gameOptions: {
          ...defaultGameOptions,
          ...options
        },
        players: playersInitData(options)
      })
    )
  }
}

export function selectColor (playerIndex, colorIndex) {
  return (dispatch, getState) => {
    const action = createAction(SELECT_COLOR)
    const playerData = getState().currentGame.players[playerIndex]
    const field = getState().currentGame.field
    dispatch(
      action({
        playerIndex,
        playerData: updatePlayerDataOnMove(playerData, field, colorIndex)
      })
    )
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
    const { playerIndex, playerData } = action.payload
    return update(state, {
      players: {
        [playerIndex]: {$set: playerData}
      }
    })
  }
}, initialState)
