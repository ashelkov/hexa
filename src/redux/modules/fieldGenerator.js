import { createAction, handleActions } from 'redux-actions'
import { BOARD_SIZE, PALETTE_SIZE } from 'redux/constants/const'
import moment from 'moment'
import _ from 'lodash'

// ------------------------------------
// Constants
// ------------------------------------
const GENERATE_NEW_FIELD = 'generator/GENERATE_NEW_FIELD'
const SET_OPTIONS = 'generator/SET_OPTIONS'

const initialState = {
  options: {
    countHorizontal: BOARD_SIZE.horizontal,
    countVertical: BOARD_SIZE.vertical,
    paletteSize: PALETTE_SIZE
  },
  result: null,
  generated_at: null
}

// ------------------------------------
// Actions
// ------------------------------------
export const setGeneratedField = createAction(GENERATE_NEW_FIELD)

export const setOptions = createAction(SET_OPTIONS)

// ------------------------------------
// Async Actions
// ------------------------------------
export function generateNewField () {
  return (dispatch, getState) => {
    const { countHorizontal, countVertical, paletteSize } = getState().fieldGenerator.options
    const rows = []
    _.times(countVertical, (indexVertical) => {
      let axialYCoord = indexVertical
      let adjustedCountHorizontal = countHorizontal - (indexVertical % 2)
      const row = []
      _.times(adjustedCountHorizontal, (indexHorizontal) => {
        let axialXCoord = indexHorizontal
        row.push({
          label: 'tile_' + axialXCoord + '_' + axialYCoord,
          coordinates: {x: axialXCoord, y: axialYCoord},
          colorIndex: Math.floor(Math.random() * 100) % paletteSize
        })
      })
      rows.push(row)
    })
    dispatch(setGeneratedField(rows))
    return rows
  }
}

export const actions = {
  setGeneratedField,
  setOptions
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [GENERATE_NEW_FIELD]: (state, action) => ({
    ...state,
    result: action.payload,
    generated_at: moment(Date.now()).format()
  }),
  [SET_OPTIONS]: (state, action) => ({
    ...state,
    options: action.payload
  })
}, initialState)
