/* @flow */
import React, { PropTypes } from 'react'
import { Group } from 'react-art'
import Hexagon from '../Hexagon/Hexagon'
import _ from 'lodash'

const SIZE_TO_PACKED_WIDTH = 1.7320508075688772
const SIZE_TO_PACKED_HEIGHT = 1.5

export default class Grid extends React.Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    hexCountHorizontal: PropTypes.number.isRequired,
    hexCountVertical: PropTypes.number.isRequired,
    currentField: React.PropTypes.array,
    players: React.PropTypes.array,
    palette: React.PropTypes.array,
    debugMode: React.PropTypes.bool
  };

  getOptimalSize = (widthPixels, heightPixels, countHorizontal, countVertical) => {
    // add extra amounts for offset rows and bottom points of hexes on last row
    const packedhexWidth = widthPixels / (parseInt(countHorizontal, 10) + 0.5)
    const adjustedGridHeight = (heightPixels * SIZE_TO_PACKED_HEIGHT) / (parseInt(countVertical, 10) + 0.5)
    const packedHexHeight = adjustedGridHeight / SIZE_TO_PACKED_HEIGHT
    let size = null
    if ((packedhexWidth / SIZE_TO_PACKED_WIDTH) < (packedHexHeight / SIZE_TO_PACKED_HEIGHT)) {
      size = packedhexWidth / SIZE_TO_PACKED_WIDTH
    } else {
      size = packedHexHeight / SIZE_TO_PACKED_HEIGHT
    }
    return size.toFixed(8)
  }

  calculatePixelCoordinates = (baseVector, hexSize, axialXCoord, axialYCoord) => {
    return {
      x: baseVector.x + (hexSize * Math.sqrt(3) * (axialXCoord + (axialYCoord % 2) / 2)),
      y: baseVector.y + (hexSize * 3 / 2 * axialYCoord)
    }
  }

  getColor (X, Y) {
    const { currentField, palette, players, debugMode } = this.props
    if (currentField) {
      const tileKey = `tile_${X}_${Y}`
      if (_.includes(players[0].captured, tileKey)) {
        return palette[players[0].color]
      }
      if (_.includes(players[1].captured, tileKey)) {
        return palette[players[1].color]
      }
      if (debugMode) {
        if (_.includes(players[0].borderline, tileKey)) {
          return '#000'
        }
        if (_.includes(players[1].borderline, tileKey)) {
          return '#000'
        }
      }
      return palette[currentField[Y][X].colorIndex]
    }
  }

  setupHexPositionsRadial = (widthPixels, heightPixels, countHorizontal, countVertical) => {
    const size = this.getOptimalSize(widthPixels, heightPixels, countHorizontal, countVertical)
    const baseVector = {x: Math.floor(size), y: Math.floor(size)}
    const hexSize = parseFloat(size)

    const rows = []
    _.times(countVertical, (indexVertical) => {
      let axialYCoord = indexVertical
      let adjustedCountHorizontal = countHorizontal - (indexVertical % 2)
      const row = []
      _.times(adjustedCountHorizontal, (indexHorizontal) => {
        let axialXCoord = indexHorizontal
        row.push({
          keyName: 'tile_' + axialXCoord + '_' + axialYCoord,
          axialCoordinates: {x: axialXCoord, y: axialYCoord},
          size: hexSize - 0.4,
          pixelCoordinates: this.calculatePixelCoordinates(baseVector, hexSize, axialXCoord, axialYCoord),
          color: this.getColor(axialXCoord, axialYCoord)
        })
      })
      rows.push(row)
    })
    return rows
  }

  render () {
    const { width, height, hexCountHorizontal, hexCountVertical } = this.props
    const hexPositions = this.setupHexPositionsRadial(width, height, hexCountHorizontal, hexCountVertical)
    const hexGrid = _.map(hexPositions, (hexRow, rowIndex) => {
      let rowElements = _.map(hexRow, (hexData) =>
        <Hexagon
          key={hexData.keyName}
          size={hexData.size}
          centre={hexData.pixelCoordinates}
          color={hexData.color}
          _key={hexData.keyName}
        />
      )
      return <Group key={'row_' + rowIndex}>{rowElements}</Group>
    })

    return (
      <Group>{hexGrid}</Group>
    )
  }
}
