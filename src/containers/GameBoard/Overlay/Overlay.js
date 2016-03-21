import React from 'react'
// stylization
import classes from './Overlay.scss'
import classnames from 'classnames/bind'

let cx = classnames.bind(classes)

export default class Overlay extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      selectedOption: ''
    }
  }

  selectOption = (option) => (e) => {
    if (option !== this.state.selectedOption) {
      this.setState({selectedOption: option})
    } else {
      this.setState({selectedOption: ''})
    }
  }

  render () {
    const { selectedOption } = this.state
    return (
      <div className={cx('overlay')}>
        <div className={cx('buttons-menu')}>
          <div className='btn btn-default btn-block' onClick={this.selectOption('single')}>
            Play Offline
          </div>
          {selectedOption === 'single' &&
            <div className={cx('submenu')}>
              <div className='btn btn-success btn-block'>
                Play vs Computer
              </div>
              <br/>
              <div className='btn btn-success btn-block'>
                Two Players (Hot Seat)
              </div>
            </div>
          }
          <br/>
          <div className='btn btn-primary btn-block' onClick={this.selectOption('multiplayer')}>
            Multiplayer
          </div>
          {selectedOption === 'multiplayer' &&
            <div className={cx('submenu')}>
              <div className='btn btn-success btn-block'>
                Play vs Friend
              </div>
            </div>
          }
          <br/>
          <br/>
        </div>
      </div>
    )
  }
}
