import React, { PropTypes } from 'react'
// stylization
import classes from './Controls.scss'
import classnames from 'classnames/bind'
import _ from 'lodash'

let cx = classnames.bind(classes)

const clickFX = new Audio('/sfx/color_click.mp3')

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
    if (!preventAction) {
      selectColor(playerIndex, colorIndex)
      clickFX.play()
    }
  }

  render () {
    const { palette, style, playerIndex, players, activePlayer } = this.props
    const selectedColors = _.map(players, 'color')
    const inactive = activePlayer !== playerIndex
    return (
      <div className={cx('container', {'muted': inactive})} style={style}>
        {inactive && <div className={cx('overlay')}></div>}
        {palette.map((color, index) =>
          <div key={index} className={cx('selection')}>
            <div className={cx('color', {'selected': _.includes(selectedColors, index)})}
              style={{backgroundColor: color}}
              onClick={this.onColorClick(playerIndex, index, _.includes(selectedColors, index))}>
            </div>
          </div>
        )}
      </div>
    )
  }
}
