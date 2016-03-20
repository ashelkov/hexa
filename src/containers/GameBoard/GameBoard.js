import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
// components
import Field from './Field/Field'
import ControlsPanel from './ControlsPanel/ControlsPanel'
// stylization
import classes from './GameBoard.scss'
import classnames from 'classnames/bind'

let cx = classnames.bind(classes)

@connect((store) => ({palette: store.settings.palette}))
export default class GameBoard extends React.Component {
  static propTypes = {
    palette: PropTypes.array.isRequired
  };

  render () {
    const { palette } = this.props
    return (
      <div>
        <div className={cx('main')}>
          <Field />
          <ControlsPanel palette={palette} />
        </div>
        <div className={cx('left')}>
          <div className='panel panel-default'>
            <div className='panel-body'>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias atque aut autem cumque deserunt
                dolorem ea eaque eos error fugiat magnam molestiae molestias obcaecati placeat provident quaerat,
                quia quis quisquam.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias atque aut autem cumque deserunt
                dolorem ea eaque eos error fugiat magnam molestiae molestias obcaecati placeat provident quaerat,
                quia quis quisquam.
              </p>
            </div>
          </div>
        </div>

      </div>
    )
  }
}
