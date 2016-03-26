import _ from 'lodash'

export default function generateNewField (countHorizontal, countVertical, paletteSize) {
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
  return rows
}
