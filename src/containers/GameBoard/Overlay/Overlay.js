import React from 'react'
import { connect } from 'react-redux'
// stylization
import classes from './Overlay.scss'
import classnames from 'classnames/bind'
// actions
import { startGame } from 'redux/modules/game'

let cx = classnames.bind(classes)

@connect(null, {startGame})
export default class Overlay extends React.Component {
  static propTypes = {
    startGame: React.PropTypes.func.isRequired,
    className: React.PropTypes.string
  };

  startGame = () => {
    const { startGame } = this.props
    startGame()
  }

  render () {
    return (
      <div className={cx('overlay') + ' ' + this.props.className}>
        <div className='well well-lg animated flipInY'>
          <div className='buttons-menu '>
            <div className='btn btn-success btn btn-block' onClick={this.startGame}>
              Single Player
            </div>
            <div className='btn btn-primary btn btn-block' disabled>
              Invite Friend
            </div>
          </div>
        </div>

        <br/>
        <br/>
      </div>
    )
  }
}
