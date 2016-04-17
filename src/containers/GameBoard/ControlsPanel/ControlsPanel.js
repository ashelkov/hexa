import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
// components
import Controls from './Controls/Controls'
// actions
import { selectColor } from 'redux/modules/currentGame/currentGame'
// stylization
import classes from './ControlsPanel.scss'
import classnames from 'classnames/bind'

let cx = classnames.bind(classes)

@connect(
  (store) => ({players: store.currentGame.players}),
  {selectColor}
)
export default class ControlsPanel extends React.Component {
  static propTypes = {
    palette: PropTypes.array.isRequired,
    selectColor: PropTypes.func.isRequired,
    players: PropTypes.array
  };

  render () {
    const { palette, selectColor, players } = this.props
    return (
      <div className={cx('controls')}>
        <div className={cx('left')}>
          <Controls
            palette={palette}
            playerIndex={0}
            selectColor={selectColor}
          />
        </div>
        <div className={cx('center')}>
          <span>{players[0].score} : {players[1].score}</span>
        </div>
        <div className={cx('right')}>
          <Controls
            palette={palette}
            playerIndex={1}
            selectColor={selectColor}
            style={{marginRight: '7px'}}
          />
        </div>
      </div>
    )
  }
}
