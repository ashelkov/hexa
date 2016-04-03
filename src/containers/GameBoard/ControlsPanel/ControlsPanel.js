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
  null,
  {selectColor}
)
export default class ControlsPanel extends React.Component {
  static propTypes = {
    palette: PropTypes.array.isRequired,
    selectColor: PropTypes.func.isRequired
  };

  render () {
    const { palette, selectColor } = this.props
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
          <span>297 : 324</span>
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
