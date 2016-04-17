import _ from 'lodash'

// ------------------------------------
// startNewGame
// ------------------------------------
export function initUnownedTiles (field) {
  const unowned = _.map(_.flatten(field), 'label')
  return _.difference(unowned, ['tile_0_34', 'tile_49_0'])
}

export function playersInitData (options, field) {
  const player1 = {
    type: 'human',
    captured: ['tile_0_34'],
    borderline: ['tile_0_33', 'tile_1_34'],
    score: 1,
    color: field[34][0].colorIndex
  }
  const player2 = {
    type: 'computer',
    captured: ['tile_49_0'],
    borderline: ['tile_48_0', 'tile_48_1'],
    score: 1,
    color: field[0][49].colorIndex
  }
  return [player1, player2]
}

// ------------------------------------
// selectColor
// ------------------------------------

export function updateDataOnMove (playerData, currentField, selectedColor) {
  let { captured, borderline } = playerData
  let { current, unowned } = currentField

  let newCaptured = []
  let toInspect = [...borderline]
  borderline = []

  do {
    // inspect borderline
    newCaptured = []
    _.each(toInspect, (tileKey) => {
      const tileColor = getTileColor(tileKey, current)
      if (tileColor === selectedColor) {
        captured.push(tileKey)
        newCaptured.push(tileKey)
        _.pull(unowned, tileKey)
      } else {
        borderline.push(tileKey)
      }
    })

    // update borderline
    toInspect = []
    _.each(newCaptured, (tileKey) => {
      let nextTiles = getNearbyTiles(tileKey, current)
      toInspect = [...toInspect, ...nextTiles]
    })
    toInspect = _.uniq(toInspect)
    toInspect = _.intersection(toInspect, unowned)
    toInspect = _.difference(toInspect, borderline)
  } while (toInspect.length > 0)

  // return updated data
  const updatedPlayerData = {
    ...playerData,
    captured: captured,
    borderline: borderline,
    score: captured.length,
    color: selectedColor
  }
  return {
    updatedPlayerData,
    unowned
  }
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

function getTileColor (tileKey, field) {
  const X = parseInt(tileKey.split('_')[1])
  const Y = parseInt(tileKey.split('_')[2])
  return field[Y][X].colorIndex
}
