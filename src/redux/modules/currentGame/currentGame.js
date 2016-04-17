import { createAction, handleActions } from 'redux-actions'
import update from 'react/lib/update'
// actions
import { generateNewField } from 'redux/modules/fieldGenerator'
import { playersInitData, updateDataOnMove, initUnownedTiles } from './currentGameHelper'

// ------------------------------------
// Constants
// ------------------------------------
const START_NEW_GAME = 'game/START_NEW_GAME'
const SELECT_COLOR = 'game/SELECT_COLOR'

const initialState = {
  isStarted: false,
  field: {
    current: null
  },
  players: [
    {score: 0},
    {score: 0}
  ]
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
          unowned: initUnownedTiles(field)
        },
        isStarted: true,
        gameOptions: {
          ...defaultGameOptions,
          ...options
        },
        players: playersInitData(options, field)
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
        updatedData: updateDataOnMove(playerData, field, colorIndex)
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
    const { playerIndex, updatedData } = action.payload
    return update(state, {
      players: {
        [playerIndex]: {$set: updatedData.updatedPlayerData}
      },
      field: {
        unowned: {$set: updatedData.unowned}
      }
    })
  }
}, initialState)
