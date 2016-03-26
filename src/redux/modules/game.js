import { createAction, handleActions } from 'redux-actions'
import generateField from 'redux/helpers/generateNewField'

// ------------------------------------
// Constants
// ------------------------------------
const START_GAME = 'game/START_GAME'
const GENERATE_NEW_FIELD = 'game/GENERATE_NEW_FIELD'

const initialState = {
  isStarted: false,
  field: null
}

// ------------------------------------
// Actions
// ------------------------------------
export const startGame = createAction(START_GAME)

export const generateNewField = createAction(GENERATE_NEW_FIELD, () => {
  return generateField(50, 35, 7)
})

// ------------------------------------
// Async Actions
// ------------------------------------
export const actions = {
  startGame,
  generateNewField
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [START_GAME]: (state, action) => ({
    ...state,
    isStarted: true
  }),
  [GENERATE_NEW_FIELD]: (state, action) => ({
    ...state,
    field: action.payload
  })
}, initialState)
