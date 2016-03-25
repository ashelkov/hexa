import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
// components
import Field from './Field/Field'
import ControlsPanel from './ControlsPanel/ControlsPanel'
import Overlay from './Overlay/Overlay'
import RightPanel from '../RightPanel/RightPanel'
// stylization
import classes from './GameBoard.scss'
import classnames from 'classnames/bind'

let cx = classnames.bind(classes)

@connect((store) => ({
  palette: store.settings.palette,
  isStarted: store.game.isStarted
}), null)
export default class GameBoard extends React.Component {
  static propTypes = {
    palette: PropTypes.array.isRequired,
    isStarted: PropTypes.bool.isRequired
  };

  render () {
    const { palette, isStarted } = this.props
    const showOverlay = !isStarted
    return (
      <div>
        <div className={cx('main')}>
          {showOverlay && <Overlay className='animated fadeIn' />}
          <div className={cx('inner', {'muted': showOverlay})}>
            <Field />
            <ControlsPanel palette={palette} />
          </div>
        </div>
        <div className={cx('right')}>
          <RightPanel/>
        </div>
      </div>
    )
  }
}
