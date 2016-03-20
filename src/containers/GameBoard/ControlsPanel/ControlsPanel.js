import React, { PropTypes } from 'react'
// components
import Controls from './Controls/Controls'
// stylization
import classes from './ControlsPanel.scss'
import classnames from 'classnames/bind'

let cx = classnames.bind(classes)

export default class ControlsPanel extends React.Component {
  static propTypes = {
    palette: PropTypes.array.isRequired
  };

  render () {
    const { palette } = this.props
    return (
      <div className={cx('controls')}>
        <div className={cx('left')}>
          <Controls palette={palette} player={0} />
        </div>
        <div className={cx('center')}>
          <span>297 : 324</span>
        </div>
        <div className={cx('right')}>
          <Controls palette={palette} player={1} style={{marginRight: '7px'}} />
        </div>
      </div>
    )
  }
}
