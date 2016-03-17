/* @flow */
import React, { PropTypes } from 'react'
import { Shape, Path } from 'react-art'

export default class Hexagon extends React.Component {
  static propTypes = {
    size: PropTypes.number.isRequired,
    centre: PropTypes.object.isRequired
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
    const { size, centre } = this.props
    const color = this.state.isSelected ? '#888' : '#111'

    // todo: this could be optimised, don't need to calculate coords for every hex, just one and then offset.
    const path = this.makeHexPath(size, centre)

    return (
      <Shape d={path} fill={color} opacity='0.5' onClick={this.handleClick} />
    )
  }
}
