import React from 'react'
import { connect } from 'react-redux'
// stylization
import classes from './Overlay.scss'
import classnames from 'classnames/bind'
// actions
import { startNewGame } from 'redux/modules/currentGame/currentGame'

let cx = classnames.bind(classes)

@connect(null, {startNewGame})
export default class Overlay extends React.Component {
  static propTypes = {
    startNewGame: React.PropTypes.func.isRequired
  };

  startGame = (type) => (e) => {
    const { startNewGame } = this.props
    startNewGame({type})
  }

  render () {
    return (
      <div className={cx('overlay')}>
        <div className='well well-lg animated flipInY'>
          <div className='buttons-menu '>
            <div className='btn btn-success btn btn-block' onClick={this.startGame('vs_computer')}>
              Играть с Компьютером
            </div>
            <div className='btn btn-primary btn btn-block' disabled>
              Пригласить Друга
            </div>
          </div>
        </div>

        <br/>
        <br/>
      </div>
    )
  }
}
