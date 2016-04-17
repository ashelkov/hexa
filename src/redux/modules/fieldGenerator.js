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
    const field = normalizeField(rows)
    dispatch(setGeneratedField(field))
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

// ------------------------------------
// Helpers
// ------------------------------------
function normalizeField (rows) {
  // player1 (tile_0_34)
  const indexes_p1 = _.difference(
    [0, 1, 2, 3, 4, 5, 6],
    [rows[33][0].colorIndex, rows[34][1].colorIndex]
  )
  const radnomIndex_p1 = Math.floor(Math.random() * 100) % indexes_p1.length
  rows[34][0].colorIndex = indexes_p1[radnomIndex_p1]

  // player2 (tile_49_0)
  const indexes_p2 = _.difference(
    [0, 1, 2, 3, 4, 5, 6],
    [rows[0][48].colorIndex, rows[1][48].colorIndex, rows[34][0].colorIndex]
  )
  const radnomIndex_p2 = Math.floor(Math.random() * 100) % indexes_p2.length
  rows[0][49].colorIndex = indexes_p2[radnomIndex_p2]

  return rows
}
