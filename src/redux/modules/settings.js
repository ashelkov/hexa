import { createAction, handleActions } from 'redux-actions'
import { PALETTE } from 'redux/constants/const'
// ------------------------------------
// Constants
// ------------------------------------
const SET_PALETTE = 'settings/SET_PALETTE'
const SET_DEBUG_MODE = 'settings/SET_DEBUG_MODE'
const WINDOW_RESIZE = 'settings/WINDOW_RESIZE'

const initialState = {
  palette: PALETTE,
  windowSize: {
    width: window.innerWidth,
    height: window.innerHeight
  },
  debugMode: false
}

// ------------------------------------
// Actions
// ------------------------------------
export const setPalette = createAction(SET_PALETTE)
export const setDebugMode = createAction(SET_DEBUG_MODE)
export const windowResize = createAction(WINDOW_RESIZE)

// ------------------------------------
// Async Actions
// ------------------------------------
export const actions = {
  setPalette,
  setDebugMode,
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
  }),
  [SET_DEBUG_MODE]: (state, action) => ({
    ...state,
    debugMode: action.payload
  })
}, initialState)
