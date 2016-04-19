import React, { PropTypes } from 'react'
// stylization
import classes from './Controls.scss'
import classnames from 'classnames/bind'
import _ from 'lodash'

let cx = classnames.bind(classes)

export default class Controls extends React.Component {
  static propTypes = {
    palette: PropTypes.array.isRequired,
    playerIndex: PropTypes.number.isRequired,
    activePlayer: PropTypes.number,
    players: PropTypes.array.isRequired,
    selectColor: PropTypes.func.isRequired,
    style: PropTypes.object
  };

  onColorClick = (playerIndex, colorIndex, preventAction) => (e) => {
    const { selectColor } = this.props
    preventAction || selectColor(playerIndex, colorIndex)
  }

  render () {
    const { palette, style, playerIndex, players, activePlayer } = this.props
    const selectedColors = _.map(players, 'color')
    const inactive = activePlayer !== playerIndex
    return (
      <div className={cx('container', {'muted': inactive})} style={style}>
        {palette.map((color, index) =>
          <div key={index} className={cx('selection')}>
            <div className={cx('color', {'selected': _.includes(selectedColors, index)})}
              style={{backgroundColor: color}}
              onClick={this.onColorClick(playerIndex, index, _.includes(selectedColors, index))}>
            </div>
          </div>
        )}
        {inactive &&
          <div className={cx('overlay')}></div>
        }
      </div>
    )
  }
}
