import { createAction, handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
const START_GAME = 'game/START_GAME'

const initialState = {
  isStarted: false
}

// ------------------------------------
// Actions
// ------------------------------------
export const startGame = createAction(START_GAME)

// ------------------------------------
// Async Actions
// ------------------------------------
export const actions = {
  startGame
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [START_GAME]: (state, action) => ({
    isStarted: true
  })
}, initialState)
