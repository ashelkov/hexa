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
    hexCountVertical: PropTypes.number.isRequired
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
      x: baseVector.x + (hexSize * Math.sqrt(3) * (axialXCoord + axialYCoord / 2)),
      y: baseVector.y + (hexSize * 3 / 2 * axialYCoord)
    }
  }

  setupHexPositionsRadial = (widthPixels, heightPixels, countHorizontal, countVertical) => {
    const size = this.getOptimalSize(widthPixels, heightPixels, countHorizontal, countVertical)
    const gridRadiusVertical = (countVertical - 1) / 2
    const centreVector = {x: Math.floor(widthPixels / 2), y: Math.floor(heightPixels / 2)}
    const hexSize = parseFloat(size)
    const widthOffset = (countHorizontal - countVertical) / 2

    var rows = []
    _.times(countVertical, (indexVertical) => {
      let axialYCoord = indexVertical - gridRadiusVertical
      let distanceFromCentreVertical = Math.abs(axialYCoord)
      let adjustedCountHorizontal = countHorizontal - distanceFromCentreVertical
      let row = []
      _.times(adjustedCountHorizontal, (indexHorizontal) => {
        let axialXCoord = indexHorizontal - Math.min(indexVertical, gridRadiusVertical) - widthOffset
        row.push({
          keyName: 'tile_' + axialXCoord + '_' + axialYCoord,
          axialCoordinates: {x: axialXCoord, y: axialYCoord},
          cubeCoordinates: {x: axialXCoord, y: (-axialXCoord) - axialYCoord, z: axialYCoord},
          size: hexSize - 0.4,
          pixelCoordinates: this.calculatePixelCoordinates(centreVector, hexSize, axialXCoord, axialYCoord)
        })
      })
      rows.push(row)
    })
    return rows
  }

  render () {
    const { width, height, hexCountHorizontal, hexCountVertical } = this.props
    const hexPositions = this.setupHexPositionsRadial(width, height, hexCountHorizontal, hexCountVertical)
    const hexGrid = _.map(hexPositions, (hexRow, index) => {
      let rowElements = _.map(hexRow, (hexData) =>
        <Hexagon key={hexData.keyName} size={hexData.size} centre={hexData.pixelCoordinates} />
      )
      return <Group key={'row_' + index}>{rowElements}</Group>
    })

    return (
      <Group>{hexGrid}</Group>
    )
  }
}
