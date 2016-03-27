import { createAction, handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
const SET_PALETTE = 'settings/SET_PALETTE'
const WINDOW_RESIZE = 'settings/WINDOW_RESIZE'

const initialState = {
  palette: ['#F75C5C', '#5CF7F7', '#F75CF2', '#5CF761', '#EFF75C', '#645CF7', '#FF9F21'],
  windowSize: {
    width: window.innerWidth,
    height: window.innerHeight
  }
}

// ------------------------------------
// Actions
// ------------------------------------
export const setPalette = createAction(SET_PALETTE)
export const windowResize = createAction(WINDOW_RESIZE)

// ------------------------------------
// Async Actions
// ------------------------------------
export const actions = {
  setPalette,
  windowResize
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [SET_PALETTE]: (state, action) => ({
    ...state,
    palette: action.payload
  }),
  [WINDOW_RESIZE]: (state, action) => ({
    ...state,
    windowSize: action.payload
  })
}, initialState)
