import { createAction, handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
const SET_PALETTE = 'settings/SET_PALETTE'

const initialState = {
  palette: ['#F75C5C', '#5CF7F7', '#F75CF2', '#5CF761', '#EFF75C', '#645CF7', '#FF9F21']
}

// ------------------------------------
// Actions
// ------------------------------------
export const setPalette = createAction(SET_PALETTE)

// ------------------------------------
// Async Actions
// ------------------------------------
export const actions = {
  setPalette
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [SET_PALETTE]: (state, action) => ({
    palette: action.payload
  })
}, initialState)
