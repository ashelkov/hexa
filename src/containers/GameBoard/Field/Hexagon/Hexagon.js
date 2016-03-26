/* @flow */
import React, { PropTypes } from 'react'
import { Shape, Path } from 'react-art'

export default class Hexagon extends React.Component {
  static propTypes = {
    size: PropTypes.number.isRequired,
    centre: PropTypes.object.isRequired,
    color: PropTypes.string
  };

  constructor (props) {
    super(props)
    this.state = {
      isSelected: false
    }
  }

  makeHexPath = (size, centre) => {
    let path = new Path()
    let point = 0
    let angle = null
    let x = null
    let y = null

    while (point < 6) {
      angle = 2 * Math.PI / 6 * (point + 0.5)
      x = centre.x + size * Math.cos(angle)
      y = centre.y + size * Math.sin(angle)
      if (point === 0) {
        path.moveTo(x, y)
      } else {
        path.lineTo(x, y)
      }
      point = point + 1
    }
    return path
  }

  handleClick = () => {
    this.setState({
      isSelected: !this.state.isSelected
    })
  }

  render () {
    const { size, centre, color } = this.props
    const tileColor = color || '#111'
    const opacity = this.state.isSelected ? 1 : 0.85

    // todo: this could be optimised, don't need to calculate coords for every hex, just one and then offset.
    const path = this.makeHexPath(size, centre)

    return (
      <Shape d={path} fill={tileColor} opacity={opacity} onClick={this.handleClick} />
    )
  }
}
