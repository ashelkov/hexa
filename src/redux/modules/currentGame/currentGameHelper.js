import _ from 'lodash'

// ------------------------------------
// startNewGame
// ------------------------------------

export function playersInitData (options) {
  const player1 = {
    type: 'human',
    captured: ['tile_0_34'],
    borderline: ['tile_0_33', 'tile_1_34'],
    score: 1,
    color: null
  }
  const player2 = {
    type: 'computer',
    captured: ['tile_49_0'],
    borderline: ['tile_48_0', 'tile_48_1'],
    score: 1,
    color: null
  }
  return [player1, player2]
}

// ------------------------------------
// selectColor
// ------------------------------------

export function updatePlayerDataOnMove (playerData, currentField, selectedColor) {
  const { captured, borderline } = playerData

  _.each(borderline, (tileKey) => {
    const X = parseInt(tileKey.split('_')[1])
    const Y = parseInt(tileKey.split('_')[2])
    if (selectedColor === currentField[Y][X].colorIndex) {
      captured.push(tileKey)
    }
  })
  const updatedPlayerData = {
    ...playerData,
    captured: captured,
    borderline: borderline,
    score: captured.length,
    color: selectedColor
  }
  return updatedPlayerData
}

function getNearbyTiles (tileKey, field) {
  const tile_x = parseInt(tileKey.split('_')[1])
  const tile_y = parseInt(tileKey.split('_')[2])
  const rowFix = tile_y % 2

  const toExamine = [
    `tile_${tile_x - 1 + rowFix}_${tile_y - 1}`,  // top left
    `tile_${tile_x + rowFix}_${tile_y - 1}`,      // top right
    `tile_${tile_x - 1}_${tile_y}`,               // left
    `tile_${tile_x + 1}_${tile_y}`,               // right
    `tile_${tile_x - 1 + rowFix}_${tile_y + 1}`,  // bottom left
    `tile_${tile_x + rowFix}_${tile_y + 1}`       // bottom right
  ]

  const result = []
  const flatten = _.flatten(field)
  _.map(toExamine, (label) => {
    if (_.find(flatten, {label: label})) {
      result.push(label)
    }
  })
  return result
}
