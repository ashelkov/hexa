/* @flow */
import React, { PropTypes } from 'react'
// stylization
import classes from './Controls.scss'
import classnames from 'classnames/bind'

let cx = classnames.bind(classes)
export default class Controls extends React.Component {
  static propTypes = {
    palette: PropTypes.array.isRequired,
    playerIndex: PropTypes.number.isRequired,
    selectColor: PropTypes.func.isRequired,
    style: PropTypes.object
  };

  onColorClick = (playerIndex, colorIndex) => (e) => {
    const { selectColor } = this.props
    selectColor(playerIndex, colorIndex)
  }

  render () {
    const { palette, style, playerIndex } = this.props
    return (
      <div className={cx('container')} style={style}>
        {palette.map((color, index) =>
          <div key={index} className={cx('selection')}>
            <div className={cx('color')}
              style={{backgroundColor: color}}
              onClick={this.onColorClick(playerIndex, index)}>
            </div>
          </div>
        )}
      </div>
    )
  }
}
