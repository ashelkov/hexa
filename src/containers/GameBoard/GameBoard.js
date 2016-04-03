import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
// components
import Field from './Field/Field'
import ControlsPanel from './ControlsPanel/ControlsPanel'
import Overlay from './Overlay/Overlay'
// stylization
import classes from './GameBoard.scss'
import classnames from 'classnames/bind'

let cx = classnames.bind(classes)

@connect((store) => ({
  palette: store.settings.palette,
  windowSize: store.settings.windowSize,
  isStarted: store.currentGame.isStarted
}), null)
export default class GameBoard extends React.Component {
  static propTypes = {
    palette: PropTypes.array.isRequired,
    windowSize: PropTypes.object.isRequired,
    isStarted: PropTypes.bool.isRequired
  };

  render () {
    const { palette, isStarted } = this.props
    const showOverlay = !isStarted
    return (
      <div className={cx('board')}>
        <div className={cx('inner', {'muted': showOverlay})}>
          <Field />
          <ControlsPanel palette={palette} />
        </div>
        {showOverlay && <Overlay className='animated fadeIn' />}
      </div>
    )
  }
}
